<template>
    <div class="app">
        <div class="title">Search Engine</div>

        <div class="input">
            <input v-model="searchText" type="text" placeholder="输入电影名称" id="search-input">
            <button id="search-button" @click="sendRequest()">Search</button>
        </div>
    </div>
</template>

<script>
import { get_m_id_byname } from '@/api/common';
export default {
    data: function () {
        return {
            searchText: '',
            aim_id: ''
        }
    },
    methods: {
        sendRequest() {
            // if (this.searchText == '') {
            //     alert('搜索内容不能为空！');
            //     return;
            // }
            get_m_id_byname(this.searchText).then(response => {
                this.aim_id = Number(response.data);
                window.location.href = "http://localhost:9528/#/movie/index?id=" + encodeURIComponent(this.aim_id);
            });

        }
    }
}
</script>

<style lang="less" scoped>
body {
    background:
        linear-gradient(to right,
            rgb(113, 65, 168),
            rgb(44, 114, 251));
}

.app {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 98%;
    /* height: 650px; */
    background: #ffffff;
    box-sizing: border-box;
    margin-top: 40px;
    margin-left: 1%;
    padding-top: 30px;
    border-radius: 5px;
    padding-bottom: 300px;
}

.title {
    color: rgb(80, 90, 200);
    /* background: red; */
    text-align: center;
    font-size: 70px;
    font-weight: 700;
    margin-top: 100px;
}

.input {
    display: flex;
    margin-top: 30px;
    margin-left: 150px;
    width: 50%;
}

input {
    border-radius: 25px 0 0 25px;
    width: 500px;
    height: 50px;
    padding-left: 10px;
}

button {
    background:
        linear-gradient(to right,
            rgb(113, 65, 168),
            rgb(44, 114, 251));
    color: aliceblue;
    border-radius: 0 25px 25px 0;
    cursor: pointer;
}
</style>