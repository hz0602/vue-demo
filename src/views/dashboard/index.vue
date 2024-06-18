<template>
    <div class="Movie">
        <div class="button">
            <el-button round id="refreshBtn" class="el-icon-refresh" @click="changemovies"
                style="margin-top: 5px; margin-right: 75px;"></el-button>
        </div>
        <div class="content" v-loading="moviesLoading">
            <div class="movie-item" v-for="(movie) in movieList" :key="movie.m_id">
                <a :href="'http://localhost:9528/#/movie/index?id=' + encodeURIComponent(movie.m_id)">
                    <img :src="movie.m_img" />
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
        },
        changemovies() {
            this.fetchMovieInfo()
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
    display: flex;
    flex-wrap: wrap;
}

.movie-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;

    width: 17%;
    max-height: 30%;
    margin: 5px 15px;
}

a {
    width: 50%;
    height: 75%;
}

img {
    // border: solid;
    width: 100%;
    height: 100%;
}
</style>