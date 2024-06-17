<template>
    <div id="app">
        <button class="zhuxiao-button" @click="logout">注销</button>

        <div class="head">
            <!-- <el-row :gutter="20">
                <el-col :span="6">
                    <el-input v-model="userInfo.a_id" placeholder="请输入管理员ID"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-input v-model="userInfo.a_name" placeholder="请输入姓名"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-input v-model="userInfo.a_password" placeholder="请输入密码"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="addUser" plain>增加</el-button>
                </el-col>
            </el-row> -->
        </div>
        <!-- 主体内容 -->
        <div class="body">
            <el-table :data="tableData" style="width: 90%">
                <el-table-column label="投诉序号" width="180"><template slot-scope="scope"> {{ scope.$index + 1 }}
                    </template></el-table-column>
                <el-table-column prop="a_id" label="用户ID" width="180"></el-table-column>
                <el-table-column prop="a_name" label="用户名"></el-table-column>
                <el-table-column prop="a_password" label="投诉时间"></el-table-column>
                <el-table-column label="处理">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="solve(scope.row, scope.$index)"
                            circle></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- <div class="query-container" style="position: fixed; bottom: 20px; left: 20px;">
            <el-input v-model="searchId" placeholder="请输入管理员ID或者姓名进行查询" style="width: 300px;"></el-input>
            <el-button type="success" @click="searchUser" plain style="margin-left: 10px;">查询</el-button>
        </div> -->

        <!-- 修改框 -->
        <!-- <el-dialog title="修改管理员信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <div>
                <el-form ref="form" :model="editObj" label-width="80px">
                    <el-form-item label="用户ID"><el-input v-model="editObj.a_id"></el-input></el-form-item>
                    <el-form-item label="姓名"><el-input v-model="editObj.a_name"></el-input></el-form-item>
                    <el-form-item label="密码"><el-input v-model="editObj.a_password"></el-input></el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </span>
        </el-dialog> -->
    </div>

</template>


<script>

import { getAdministratorInfo, addAdministrator, deleteAdministrator, updateAdministrator } from '@/api/common'

export default {
    data: function () {
        return {
            userInfo: {
                a_id: '',
                a_name: '',
                a_password: '',
            },
            tableData: [],
            dialogVisible: false,
            editObj: {
                a_id: '',
                a_name: '',
                a_password: '',
            },
            newinfo: {
                'a_id': '',
                'a_name': '',
                'a_password': '',
                'new_id': '',
                'new_name': '',
                'new_password': '',
            },
            searchId: '', // 查询用的ID
            userIndex: 0,
        }
    },
    methods: {
        async logout() {
            await this.$store.dispatch('user/logout')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        },
        solve(row, index) {
            this.userIndex = index
            this.editObj = row
            this.dialogVisible = true
        },
        //增加

        fetchAdministratorInfo() {
            getAdministratorInfo().then(response => {
                this.tableData = response.data
            })
        }
    },
    created() {
        this.fetchAdministratorInfo()
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