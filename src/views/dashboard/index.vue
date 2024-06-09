<template>
    <div class="dashboard-container">
        <div class="dashboard-text">name: {{ name }}</div>
        <div class="dashboard-text">avatar: {{ avatar }}</div>
        <div class="dashboard-text">role: {{ role }}</div>
        <div class="moviesList" v-loading="moviesLoading" v-bind="movies">
            <div class="movie" v-for="movie in movies">
                <img :src="movie.m_img" :alt="movie.m_img" />
                <h2>{{ movie.m_name }}</h2>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getMovieInfo } from '@/api/common'

export default {
    name: 'Dashboard',
    computed: {
        ...mapGetters([
            'name',
            'avatar',
            'role'
        ])
    },
    data() {
        return {
            movies: null,
            moviesLoading: true
        }
    },
    created() {
        this.fetchMovieInfo()
    },
    methods: {
        fetchMovieInfo() {
            this.moviesLoading = true
            getMovieInfo().then(response => {
                this.movies = response.data
                this.moviesLoading = false
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.dashboard {
    &-container {
        margin: 30px;
    }

    &-text {
        font-size: 30px;
        line-height: 46px;
    }
}

.moviesList {
    display: flex;
    flex-wrap: wrap;
}

.movie {
    flex: 1 0 10%;
    /* 调整这个值以改变每行显示的电影数量 */
    margin: 10px;
    text-align: center;
}

.movie img {
    height: 200px;
    /* 设置一个固定的高度值 */
    width: 350px;
    /* 让宽度自动调整以保持宽高比（如果可能的话）*/
    object-fit: cover;
    /* 如果需要保持图片覆盖整个容器，并且可能裁剪部分图片 */
}
</style>


<!-- <template>
    <div class="dashboard-container" v-bind="movies">
        <div class="dashboard-text" v-for="(movie, index) in movies">
            <img :src="movie.image" :alt="movie.image" />
            <h2>{{ movie.title }}</h2>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            movies: [
                { title: '热辣滚烫', image: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.YKoZzgmubNBxQ8j-mmoTKAHaEK?rs=1&pid=ImgDetMain' },
                { title: '周处除三害', image: 'https://www.huohutv.net/upload/vod/20240301-1/2aee8799762a212f2442617c8c28e8b9.jpg' },
                { title: '浩哥闹县衙', image: 'https://www.huohutv.net/upload/vod/20240322-1/e054807282cadf515e969231cada3601.jpg' },
                { title: '追风者', image: 'https://www.huohutv.net/upload/vod/20240324-1/1572090a758f7041d16be2728fe6440d.jpg' },
                { title: '烈焰 2024', image: 'https://www.huohutv.net/upload/vod/20240324-1/2761152b7b451701890c0ec2c54c7039.jpg' },
                { title: '欢乐颂第五季', image: 'https://www.huohutv.net/upload/vod/20240322-1/b9cc0472a2851e7c22d352670f8c586e.jpg' },
                { title: '坂本龙一：杰作', image: 'https://www.huohutv.net/upload/vod/20240517-1/73e657b4437b73ebbd0f3924ffc98539.jpg' },
                { title: '传奇故事 2024', image: 'https://www.huohutv.net/upload/vod/20240418-1/83c91686ae623108b12087a366717c9e.jpg' },
                { title: '暗黑天使', image: 'https://www.huohutv.net/upload/vod/20230804-36/e500c737fb8ca6bff9549b5e7b43ca36.jpg' },
                { title: '复仇保姆', image: 'https://www.huohutv.net/upload/vod/20240517-1/e40c0279a6e6bc1aa134741f27d54a5e.jpg' },
                { title: '遥远的爱', image: 'https://www.huohutv.net/upload/vod/20230804-1/017726fa5c32b067c2e268aed55bbf65.jpg' },
                { title: '小酸村', image: 'https://www.huohutv.net/upload/vod/20240424-1/4c2ce8dfddbd309158dd55941b1692fa.jpg' }
            ]
        }
    }
}
</script>

<style scoped>
.dashboard-container {
    display: flex;
    flex-wrap: wrap;
}

.dashboard-text {
    flex: 1 0 10%;
    /* 调整这个值以改变每行显示的电影数量 */
    margin: 10px;
    text-align: center;
}

.dashboard-text img {
    height: 200px;
    /* 设置一个固定的高度值 */
    width: 350px;
    /* 让宽度自动调整以保持宽高比（如果可能的话）*/
    object-fit: cover;
    /* 如果需要保持图片覆盖整个容器，并且可能裁剪部分图片 */
}
</style> -->