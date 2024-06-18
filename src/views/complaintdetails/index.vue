<template>
    <div id="app">
        <button class="zhuxiao-button" @click="backtoList">返回投诉列表</button>

        <body>
            <div class="centered-text">
                <p>{{ complaint.c_content }}</p>
            </div>
            <div class="input-button-container">
                <textarea v-model="reply" class="large-textarea" placeholder="请输入内容..."></textarea>
                <button class="button" type="button" @click="submitReply">反馈</button>
            </div>
        </body>
    </div>

</template>


<script>

import { getComplaintText, submitComplaintReply } from '@/api/common';
import store from '@/store';
export default {
    data: function () {
        return {
            reply: '',
            id: '',
            complaint: {
                // content: '我是一位忠实的用户，长期以来一直访问并喜爱着贵网站提供的内容。然而，近期我遇到了一个让我非常困扰的问题——图片加载速度实在太慢了。这不仅严重影响了我的浏览体验，也让我感到非常失望。每次当我点击进入一个包含图片的页面时，我都要花费大量时间等待图片的加载。有时候，我甚至只能看到模糊的缩略图或者空白的加载框，真正的高清图片需要等待数秒甚至更久才能显示出来。尤其是在我使用移动网络的时候，加载速度更是慢得让人无法忍受。我理解，网络环境的复杂性和服务器负载等因素可能会影响图片的加载速度。但是，作为用户，我期望的是能够享受到流畅、高效的浏览体验。我相信，这也是贵网站一直致力于提供的服务标准。因此，我恳请贵网站管理员能够重视这个问题，并尽快采取措施进行改进'
            }
        }
    },
    methods: {
        async logout() {
            await this.$store.dispatch('user/logout')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        },
        fetchText(c_id) {
            getComplaintText(c_id).then(response => {
                this.complaint = response.data;
            })
        },
        submitReply() {
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
            var r_data =
            {
                c_id: this.id,
                u_id: this.u_id,
                a_id: store.getters.id,
                f_time: formattedDate,
                f_content: this.reply,

            }
            submitComplaintReply(r_data).then(response => {
                this.reply = '';
            })

        },
        backtoList() {
            //window.location.href = "http://localhost:9528/#/administrator";
            this.$router.push('/administrator')
        }

    }
    ,
    created() {
        const hash = window.location.hash;
        // 检查哈希中是否包含查询参数
        if (hash.indexOf('?') !== -1) {
            // 提取哈希中的查询字符串部分
            const hashSearch = hash.slice(hash.indexOf('?') + 1);
            // 使用URLSearchParams解析哈希中的查询字符串
            const params = new URLSearchParams(hashSearch);
            // 获取id参数
            this.id = params.get('id');
            this.u_id = params.get('u_id');
            this.fetchText(this.id);
        }



    }
}
</script>

<style lang="scss" scoped>
#app {
    margin: 0px 400px;
    display: flex;
    align-items: center;
    justify-content: center;
}

body {
    margin-top: 50px;
    width: 50%;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100vh;
    font-family: Arial, sans-serif;
}

p {

    text-indent: 2em
}

.centered-text {
    align-self: self-start;
    margin-top: 20px;
    text-align: left;
}

.input-button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.large-textarea {
    width: 350px;
    height: 100px;
    padding: 10px;
    font-size: 16px;
    text-align: left;
}

.button {
    margin-left: 10px;
    /* 与输入框的间距 */
    padding: 10px 20px;
    font-size: 16px;
    /* 可选，与输入框字体大小相匹配 */
}

.zhuxiao-button {
    position: absolute;
    top: 50px;
    right: 200px;
    padding: 10px 15px;
    background-color: #2a443cd7;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    z-index: 1;
}
</style>