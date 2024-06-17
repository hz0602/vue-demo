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
          </div>

          <div class="pingfen">
            <!-- <p>评分</p> -->
            <p class="score">评分 {{ movie.m_score }}</p>
            <p>评分人次: {{ movie.m_numratings }}</p>
          </div>
        </div>

        <div class="detail">
          <div class="jianjie">{{ movie.m_name }}的剧情简介······</div>
          <div class="text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ movie.m_encapsulate }}</div>
        </div>

        <div class="detail">
          <div class="jianjie">{{ movie.m_name }}的短评······<br>
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
import { getMovieDetails, addComment } from '@/api/common';
import store from '@/store';
export default {
  data() {
    return {
      commentText: "",
      comments: [],
      movie: {
      },
      id: ''
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
        this.movie = response.data.movie;
        this.comments = response.data.reviews;
      })



    }
  },
  methods: {
    submitComment() {
      if (this.commentText.trim() == "") {
        alert("评论内容不能为空！");
        return;
      }
      let now = new Date();
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      // month = month < 10 ? '0' + month : month; // 如果月份小于10，则在前面添加一个'0'  
      let date = now.getDate();
      // date = date < 10 ? '0' + date : date; // 如果日期小于10，则在前面添加一个'0'  
      let formattedDate = year + '-' + month + '-' + date;
      let data = {
        u_id: store.getters.id,
        m_id: this.movie.m_id,
        r_time: formattedDate,
        r_content: this.commentText
      }
      this.commentText = "";
      addComment(data).then(response => {
        getMovieDetails(this.id).then(response => {
          this.movie = response.data.movie;
          this.comments = response.data.reviews;
        })
      })

    }
  }
}
</script>

<style scoped>
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