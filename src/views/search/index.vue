<template>
    <div class="app">
        <div class="title">Search</div>

        <div class="input">
            <input v-model="searchText" type="text" placeholder="输入电影名称" id="search-input " @input="findResults">
            <button id=" search-button" @click="sendRequest">Search</button>
        </div>

        <div class="results-dropdown">
            <div v-for="(result, index) in searchResults" :key="index" style="margin: 15px 0px; cursor: pointer;"
                @click="sendRequest1(searchResults[index])">
                {{ result }}
            </div>
        </div>
    </div>
</template>

<script>
import { get_m_id_byname, get_m_name_byname } from '@/api/common';
export default {
    data: function () {
        return {
            showResults: true,
            searchResults: [
            ],
            searchText: '',
            aim_id: ''
        }
    },
    methods: {
        sendRequest() {
            if (this.searchText == '') {
                return;
            }
            get_m_id_byname(this.searchText).then(response => {
                this.aim_id = Number(response.data);
                window.location.href = "http://localhost:9528/#/movie/index?id=" + encodeURIComponent(this.aim_id);
            });

        },
        sendRequest1(s_text) {
            get_m_id_byname(s_text).then(response => {
                this.aim_id = Number(response.data);
                window.location.href = "http://localhost:9528/#/movie/index?id=" + encodeURIComponent(this.aim_id);
            });

        },
        findResults() {
            // alert(this.searchText);
            if (this.searchText.trim() == '') {

                this.searchResults = [];
                return;
            }

            get_m_name_byname(this.searchText).then(response => {
                this.searchResults = response.data;
                if (this.searchText.trim() == '') {
                    this.searchResults = [];
                }
                console.log(this.searchResults);
            });
        }
    }
}
</script>

<style lang="less" scoped>
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

.results-dropdown {
    width: 38%;
}
</style>