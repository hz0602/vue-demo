<template>
  <div class="body">
    <ul>
      <li>
        <div class="title">电影详情</div>
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

        <div class="comment_container" v-for="comment in movie.comments">
          <div>
            <span class="user-name">{{ comment.username }}</span>
            <span class="user-time">评分：{{ comment.score }}</span>
          </div>
          <p class="comment_text">
            {{ comment.comment }}
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
      movie: {
        m_name: '环大西洋',
        m_img: 'https://ts1.cn.mm.bing.net/th/id/R-C.0ca250a867943fcb710771eab74582de?rik=YmGOZ1otcvUxqQ&riu=http%3a%2f%2fvorcdn.xiaodutv.com%2f16640007c22755a60c22797d45d9446a&ehk=QrbkY3JjEp0GwsbZymsX3toy8ucMFLPIRMrYeJx8HzQ%3d&risl=&pid=ImgRaw&r=0',
        m_director: '贾瑞德·科恩',
        m_actor: ' 格雷厄姆·格林 / 大卫·乔卡奇 ',
        m_time: '2013-07-09',
        m_score: '2.9',
        m_numratings: '4886',
        m_encapsulate: '山寨之王The Asylum公司出品的山寨版《环太平洋》',
        comments: [
          { username: '蒙古上单', comment: '带你入坑地球online的女玩家退坑了!', score: 5 },
          { username: '原神玩家', comment: '你爸在庭院种枇杷树', score: 3 }
        ]
      }
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
      const id = params.get('id');

      getMovieDetails(id).then(response => {
        this.movie = {};
        this.movie = response.data;
      })

    }
  },
  methods: {
    submitComment() {
      addComment(store.getters.id, this.movie.id, this.commentText).then(response => {

        getMovieDetails(id).then(response => {
          this.movie = {};
          this.movie = response.data;
        })

        this.commentText = "";
      }
      )
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
    background-color: #5c47a8;
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
  }

  .user-name {
    color: rgba(27, 76, 168, 0.644);
  }

  .user-time {
    margin-top: 10px;
    margin-left: 10px;
    font-size: 14px;
    color: rgb(122, 120, 120);
  }

  .comment_text {
    margin-top: 10px;
    font-size: 14px;
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