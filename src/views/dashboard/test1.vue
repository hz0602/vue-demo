<template>
    <div class="Movie">
        <div class="button">
            <el-button round id="refreshBtn" class="el-icon-refresh" @click="changemovies"></el-button>
        </div>
        <div class="content">
            <div class="movie-item" v-for="(movie) in movieList">
                <a class="movie-link">
                    <img src="movie.m_img" />
                </a>
                <div class="name" style="margin:2px;font-size: 16px;">{{ movie.m_name }}</div>
                <div class="score" style="margin:2px;font-size: 16px;">{{ movie.m_score }}</div>
            </div>
        </div>
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
    display: flex;
    flex-direction: column;
    height: 93vh;
}

.button {
    display: flex;
    justify-content: center;
    height: 6%;
}

.content {
    height: 94%;
    border: solid;
    display: flex;
    flex-wrap: wrap;
}

.movie-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;

    // border: solid;
    width: 20%;
    max-height: 30%;
    margin: 5px;
}

a {
    // border: solid;
    width: 50%;
    height: 75%;
}

img {
    // border: solid;
    width: 100%;
    height: 100%;

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