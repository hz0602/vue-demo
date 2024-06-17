<template>
    <div class="Movie">
        <div style="display: flex; justify-content: center;">
            <el-button round id="refreshBtn" class="el-icon-refresh" @click="changemovies"></el-button>
        </div>
        <ul class="movie-list" v-loading="moviesLoading">
            <li v-for="(movie) in movieList" :key="movie.id" class="movie-item">
                <div class="content">
                    <div class="left">
                        <a :href="'http://localhost:9528/#/form/index?id=' + encodeURIComponent(movie.m_id)">
                            <img :src="movie.m_img" :alt="movie.m_name" class="movie-img">
                        </a>
                        <div class="name">{{ movie.m_name }}</div>
                        <div class="score">{{ movie.m_score }}</div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { getMovieInfo } from "@/api/common";

export default {
    name: "Movie",
    data() {
        return {
            movielist: [],
            moviesLoading: false,
        };
    },
    created() {
        this.fetchMovieInfo()
    },
    methods: {
        fetchMovieInfo() {
            this.moviesLoading = true
            getMovieInfo().then(response => {
                this.movieList = response.data
                this.moviesLoading = false
            })
        }
    }
};
</script>

<style lang="less" scoped>
.Movie {
    width: 100%;

    .type {
        display: flex;

        justify-content: space-between;
        margin-top: 60px;

        span {
            font-size: 36px;
        }
    }

    .movie-list {
        list-style: none;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
    }

    .movie-item {
        width: calc(33.33% - 230px); // 减去一些间距，保持图片间有间隙
        margin-right: 5px;
        margin-bottom: 20px;

        &:nth-child(3n) {
            margin-right: 0; // 每行最后一个元素取消右侧外边距，以保持对齐
        }
    }

    .movie-img {
        max-width: 150px;
        height: 200px;
        margin-top: 10px;
        margin-left: 150px;
    }

    .name {
        margin-top: 10px;
        margin-left: 150px;
        width: 85%; // 确保名称宽度适应容器
    }

    .score {
        font-size: 12px;
        margin-top: 10px;
        margin-left: 150px;
        width: 85%; // 确保名称宽度适应容器
    }

    .btn {
        margin: 20px;

        textarea {
            width: 88%;
            resize: vertical;
            margin-left: 133px;
        }

        button {
            margin-top: 10px;
            margin-bottom: 10px;
            margin-left: 1105px;
        }

    }

    .switch-btn {
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 1000;
        padding: 10px 20px;
        border-radius: 50%;
        background-color: #007bff;
        color: white;
        cursor: pointer;
    }
}
</style>