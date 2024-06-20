<template>
    <div class="Movie">
        <div class="button" style="font-size: 20px;">
            <p style="margin-right: 71px;">我的收藏</p>
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
import { getCollectionInfo } from "@/api/common";
import store from "@/store";

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
            getCollectionInfo(store.getters.id).then(response => {
                this.movieList = response.data
                this.moviesLoading = false
            })
        },
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