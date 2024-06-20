<template>
  <div class="body">
    <ul>
      <li>
        <div class="title"></div>
        <h2 class="nm">{{ movie.m_name }}</h2>
        <div class="content">
          <img class="pic" :src="movie.m_img" />

          <div class="list">
            <p>导演: {{ movie.m_director }}</p>
            <p>主演: {{ movie.m_actor }}</p>
            <p>上映日期: {{ movie.m_time }}</p>
            <a :href="urlink">
              <p style="  color: #116afad6 ;font-size: 18px;margin-top: 10px;">点击观看</p>
            </a>
          </div>

          <div class="pingfen">
            <!-- <p>评分</p> -->
            <p class="score">评分 {{ movie.m_score }}</p>
            <p>评分人次: {{ movie.m_numratings }}</p>
          </div>
          <div class="collect">
            <p v-if="!is_collected" class="el-icon-star-off"
              style="font-size: 40px;margin-top: 20px;margin-left: 15px;color: #ffA500;cursor: pointer;"
              @click="collect(true)"></p>
            <p v-else class="el-icon-star-on"
              style="font-size: 40px;margin-top: 20px;margin-left: 15px;color: #ffA500;cursor: pointer"
              @click="collect(false)">
            </p>
          </div>
        </div>
        <div class="detail">
          <div class="jianjie">{{ movie.m_name }}的剧情简介······</div>
          <div class="text" style="line-height: 1.5;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ movie.m_encapsulate
            }}</div>
        </div>

        <div class="detail">
          <div class="jianjie">{{ movie.m_name }}的短评······<br>
          </div>
          <div class="giveScore">
            <span v-for="index in 5" :key="index" @click="toggleStar(index)" class="star">
              <i v-if="index <= score" class="el-icon-star-off" style="font-size: 40px;"></i>
              <i v-else class="el-icon-star-on" style="font-size: 40px;"></i>
            </span>
          </div>
        </div>
        <div>
          <textarea v-model="commentText" placeholder="写下你的评论..." rows="3" class="com"></textarea>
          <button @click="submitComment" class="btn">提交评论</button>
        </div>
        <div class="comment_container" v-for="comment in comments">
          <div>
            <span class="user-name">{{ comment.u_name }}</span>
            <span class="user-time"> {{ comment.r_time }}</span>
            <span style="margin-left: 10px;color: #008b00"> 评分：{{ comment.r_score }}</span>
          </div>
          <p class="comment_text">
            {{ comment.r_content }}
          </p>
          <br>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
import { getMovieDetails, addComment, collectMovie, initc_status, updateHistory } from '@/api/common';
import store from '@/store';
export default {
  data() {
    return {
      commentText: "",
      comments: [],
      movie: {
      },
      id: '',
      score: 0,
      urlink: '',
      is_collected: false
    };
  },
  created() {

    // 获取哈希部分
    const hash = window.location.hash;
    // 检查哈希中是否包含查询参数
    if (hash.indexOf('?') !== -1) {
      // 提取哈希中的查询字符串部分
      const hashSearch = hash.slice(hash.indexOf('?') + 1);
      // 使用URLSearchParams解析哈希中的查询字符串
      const params = new URLSearchParams(hashSearch);
      // 获取id参数
      this.id = params.get('id');

      getMovieDetails(this.id).then(response => {

        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        // month = month < 10 ? '0' + month : month; // 如果月份小于10，则在前面添加一个'0'  
        let date = now.getDate();
        let hour = now.getHours();
        let minute = now.getMinutes();
        let second = now.getSeconds();
        // date = date < 10 ? '0' + date : date; // 如果日期小于10，则在前面添加一个'0'  
        let formattedDate = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
        let data = {
          u_id: store.getters.id,
          m_id: this.id,
          h_time: formattedDate
        }
        updateHistory(data).then(response => { })
        this.movie = response.data.movie;
        this.urlink = response.data.movie.m_link;
        // console.log(this.urlink);
        this.comments = response.data.reviews;
        this.comments.forEach(item => {
          item.r_time = item.r_time.slice(0, -2);
        });
        this.initcollect();
      })




    }
  },
  methods: {
    toggleStar(index) {
      this.score = index;
    },
    collect(flag) {
      let data = {
        u_id: store.getters.id,
        m_id: this.movie.m_id,
        is_collect: flag
      }
      collectMovie(data).then(response => {
        this.initcollect();
      })
    },
    initcollect() {
      let data = {
        u_id: store.getters.id,
        m_id: this.movie.m_id,
      }
      initc_status(data).then(response => {
        this.is_collected = response.data;
      })

    },
    submitComment() {
      if (this.commentText.trim() == "") {
        this.$message({
          message: '评论内容不能为空！',
          type: 'warning'
        });
        return;
      }
      if (this.score == 0) {
        this.$message({
          message: '请给电影评分！',
          type: 'warning'
        });
        return;
      }
      let now = new Date();
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      // month = month < 10 ? '0' + month : month; // 如果月份小于10，则在前面添加一个'0'  
      let date = now.getDate();
      let hour = now.getHours();
      let minute = now.getMinutes();
      let second = now.getSeconds();
      // date = date < 10 ? '0' + date : date; // 如果日期小于10，则在前面添加一个'0'  
      let formattedDate = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
      let data = {
        u_id: store.getters.id,
        m_id: this.movie.m_id,
        r_time: formattedDate,
        r_content: this.commentText,
        r_score: this.score * 2
      }
      this.commentText = "";
      addComment(data).then(response => {
        getMovieDetails(this.id).then(response => {


          this.movie = response.data.movie;
          this.comments = response.data.reviews;
          this.urlink = response.data.movie.m_link;
          this.comments.forEach(item => {
            item.r_time = item.r_time.slice(0, -2);
          });
        })
      })

    }
  }
}
</script>

<style scoped>
.star:hover {
  cursor: pointer;
  /* 悬停时的光标形状，使用自定义图片 */
  /* 或者使用标准的光标形状，如 'grab'、'grabbing'、'crosshair' 等 */
  /* cursor: grab; */
}

.body {
  width: 100%;

  .content {
    display: flex;
    align-items: flex-start;
  }

  .title {
    background-color: #ffffff;
    font-size: 25px;
    width: 100%;
    text-align: center;
  }

  .nm {
    margin-top: 80px;
    margin-left: 200px;
    color: #2c2a2ad6;
    ;
  }

  .pic {
    margin-top: 10px;
    margin-left: 200px;
    height: 200px;
  }

  .list {
    width: 250px;
    margin-top: 10px;
    margin-left: 15px;
  }

  .pingfen {
    margin-top: 10px;
    margin-left: 80px;
  }

  .score {
    margin-top: 15px;
    margin-bottom: 5px;
    font-size: 25px;
  }

  .detail {
    margin-top: 20px;
    margin-left: 200px;
  }

  .com {
    margin-top: 10px;
    margin-left: 200px;
    width: 70%;
  }

  .btn {
    margin-top: 10px;
    margin-left: 995px;
  }

  .comment_container {
    margin-top: 10px;
    margin-left: 200px;
    font-size: 18px
  }

  .user-name {
    color: rgba(27, 76, 168, 0.644);
  }

  .user-time {
    margin-top: 10px;
    margin-left: 10px;
    color: rgb(122, 120, 120);
  }

  .comment_text {
    margin-top: 10px;
    margin-right: 150px;
  }

  .jianjie {
    color: green;
  }

  .text {
    margin-top: 5px;
    font-size: 15px;
    margin-right: 150px;
  }
}
</style>