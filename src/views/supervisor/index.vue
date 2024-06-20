<template>
    <div id="app">
        <button class="zhuxiao-button" @click="logout">注销</button>
        <div class="name">
            <br>
            <span>欢迎，总管：{{ s_name }}</span>
        </div>
        <div class="head">
            <el-row :gutter="20">
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
            </el-row>
        </div>
        <!-- 主体内容 -->
        <div class="body">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="序号" width="180"><template slot-scope="scope"> {{ scope.$index + 1 }}
                    </template></el-table-column>
                <el-table-column prop="a_id" label="管理员ID" width="180"></el-table-column>
                <el-table-column prop="a_name" label="姓名"></el-table-column>
                <el-table-column prop="a_password" label="密码"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="editUser(scope.row, scope.$index)"
                            circle></el-button>
                        <el-button type="danger" icon="el-icon-delete" @click="delUser(scope.row, scope.$index)"
                            circle></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="query-container" style="position: fixed; bottom: 20px; left: 20px;">
            <el-input v-model="searchId" placeholder="请输入管理员ID或者姓名进行查询" style="width: 300px;"></el-input>
            <el-button type="success" @click="searchUser" plain style="margin-left: 10px;">查询</el-button>
        </div>

        <!-- 修改框 -->
        <el-dialog title="修改管理员信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
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
        </el-dialog>
    </div>

</template>


<script>

import { getAdministratorInfo, addAdministrator, deleteAdministrator, updateAdministrator } from '@/api/common'
import store from '@/store';

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
            s_name: store.getters.name, // 总管名
        }
    },
    methods: {
        async logout() {
            await this.$store.dispatch('user/logout')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        },

        //增加
        addUser() {
            if (!this.userInfo.a_id) {
                this.$message({
                    message: '请输入管理员ID！',
                    type: 'warning'
                });
                return;
            }
            if (!this.userInfo.a_name) {
                this.$message({
                    message: '请输入姓名！',
                    type: 'warning'
                });
                return;
            }
            if (!this.userInfo.a_password) {
                this.$message({
                    message: '请输入密码！',
                    type: 'warning'
                });
                return;
            }
            // this.tableData.push(this.userInfo);
            addAdministrator(this.userInfo).then(response => {
                this.$message({
                    message: '增加成功！',
                    type: 'info'
                });
                this.fetchAdministratorInfo()
            }).catch(error => {
                this.$message({
                    message: '增加失败！',
                    type: 'error'
                });
            })
            this.userInfo = {
                a_id: '',
                a_name: '',
                a_password: '',
            };
            this.fetchAdministratorInfo()
        },



        //删除
        delUser(item, idx) {
            let datainfo = {
                'a_id': String(item.a_id),
                'a_name': item.a_name,
                'a_password': item.a_password,
            }
            this.$confirm('确认删除此管理员信息？')
                .then(_ => {
                    deleteAdministrator(datainfo).then(response => {
                        this.$message({
                            message: '删除成功！',
                            type: 'info'
                        })
                        this.fetchAdministratorInfo()
                    });
                }).catch(error => {
                    this.$message({
                        message: '删除失败！',
                        type: 'error'
                    });
                })
            this.fetchAdministratorInfo()
        },
        //修改
        editUser(item, idx) {
            this.dialogVisible = true;
            this.newinfo = {
                'a_id': String(item.a_id),
                'a_name': item.a_name,
                'a_password': item.a_password,
            };
        },

        searchUser() {
            const searchId = this.searchId.trim(); // 去除前后空格
            if (!searchId) {
                this.$message({
                    message: '请输入管理员ID或者姓名进行查询！',
                    type: 'warning'
                });
                return;
            }

            let found = false;
            for (let i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].a_id == searchId || this.tableData[i].a_name == searchId) {
                    this.$message({
                        message: `找到管理员: ID-${this.tableData[i].a_id}    姓名-${this.tableData[i].a_name}`,
                        type: 'success'
                    });
                    found = true;
                    break;
                }
            }
            if (!found) {
                this.$message({
                    message: '未找到该管理员ID！',
                    type: 'info'
                });
            }
        },

        handleClose() {
            this.dialogVisible = false;
        },

        confirm() {
            this.newinfo = {
                'a_id': this.newinfo.a_id,
                'a_name': this.newinfo.a_name,
                'a_password': this.newinfo.a_password,
                'new_id': String(this.editObj.a_id),
                'new_name': this.editObj.a_name,
                'new_password': this.editObj.a_password,
            }
            updateAdministrator(this.newinfo).then(response => {
                this.$message({
                    message: '修改成功！',
                    type: 'info'
                });
                this.fetchAdministratorInfo()
            }).catch(error => {
                this.$message({
                    message: '修改失败！',
                    type: 'error'
                });
            })
            this.fetchAdministratorInfo()
            this.dialogVisible = false;
            // Vue.set(this.tableData, this.userIndex, this.editObj);
        },

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
    top: 10px;
    right: 20px;
    padding: 10px 15px;
    background-color: #dc4a4a;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    z-index: 1;
}
</style>