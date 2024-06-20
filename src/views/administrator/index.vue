<template>
    <div id="app">
        <div class="name">
            <br>
            <span>欢迎，管理员：{{ a_name }}</span>
        </div>
        <button class="zhuxiao-button" @click="logout">注销</button>
        <div class="body">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="序号" width="180"><template slot-scope="scope"> {{ scope.$index + 1 }}
                    </template></el-table-column>
                <el-table-column prop="c_id" label="投诉ID" width="180"></el-table-column>
                <el-table-column prop="u_id" label="用户id"></el-table-column>
                <el-table-column prop="u_name" label="用户名"></el-table-column>
                <el-table-column prop="c_time" label="投诉时间"></el-table-column>
                <el-table-column label="处理">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="solve(scope.row, scope.$index)"
                            circle></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>


    </div>

</template>


<script>

import { getComplaints } from '@/api/common'
import store from '@/store';

export default {
    data: function () {
        return {
            tableData: [
                {
                    // c_id: 1,
                    // u_id: 1,
                    // u_name: '张三',
                    // c_time: '2021-01-01 12:00:00',
                }
            ],
            complaint_id: '', // 投诉ID
            a_name: store.getters.name,
        }
    },
    methods: {
        async logout() {
            await this.$store.dispatch('user/logout')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        },
        solve(row, index) {
            window.location.href = "http://localhost:9528/#/complaintdetails/index" + "?id=" + encodeURIComponent(row.c_id) + "&u_id=" + encodeURIComponent(row.u_id);
        },
        //增加

        fetchComplaints() {

            getComplaints().then(response => {
                this.tableData = response.data
                this.tableData.forEach(item => {
                    item.c_time = item.c_time.slice(0, -2); // 去掉后两位  
                });
            })
        }
    },
    created() {
        this.fetchComplaints()
    }
}
</script>


<style lang="scss" scoped>
#app {
    width: 1024px;
    margin: 0 auto;
}

.add-btn {
    margin-top: 20px;
    width: 100%;
}

.head {
    margin-top: 40px;
}

.body {
    margin-top: 30px;
}

.query-container {
    position: fixed;
    bottom: 20px;
    left: 20px;
}

.query-input {
    width: 200px;
}

.query-button {
    margin-left: 10px;
}

.zhuxiao-button {
    position: absolute;
    top: 50px;
    right: 200px;
    padding: 10px 15px;
    background-color: #dc4a4a;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    z-index: 1;
}
</style>