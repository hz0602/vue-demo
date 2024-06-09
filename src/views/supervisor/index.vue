<template>
    <div id="app">
        <button class="zhuxiao-button" @click="logout">注销</button>

        <div class="head">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input v-model="userInfo.id" placeholder="请输入用户ID"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-input v-model="userInfo.permission" placeholder="请输入权限"></el-input>
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
                <el-table-column prop="id" label="管理员ID" width="180"></el-table-column>
                <el-table-column prop="permission" label="权限"></el-table-column>
                <el-table-column prop="birthday" label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="editUser(scope.row, scope.$index)"
                            circle></el-button>
                        <el-button type="danger" icon="el-icon-delete" @click="delUser(scope.$index)"
                            circle></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="query-container" style="position: fixed; bottom: 20px; left: 20px;">
            <el-input v-model="searchId" placeholder="请输入管理员ID进行查询" style="width: 200px;"></el-input>
            <el-button type="success" @click="searchUser" plain style="margin-left: 10px;">查询</el-button>
        </div>

        <!-- 修改框 -->
        <el-dialog title="修改管理员信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <div>
                <el-form ref="form" :model="editObj" label-width="80px">
                    <el-form-item label="用户ID"><el-input v-model="editObj.id"></el-input></el-form-item>
                    <el-form-item label="权限"><el-input v-model="editObj.permission"></el-input></el-form-item>
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
export default {
    data: function () {
        return {
            userInfo: {
                id: '',
                permission: '',
            },
            tableData: [{
                id: '001',
                permission: '管理员',
            }, {
                id: '002',
                permission: '管理员',
            }],
            dialogVisible: false,
            editObj: {
                id: '',
                permission: '',
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

        //增加
        addUser() {
            if (!this.userInfo.id) {
                this.$message({
                    message: '请输入用户的ID！',

                });
                return;
            }
            if (!this.userInfo.permission) {
                this.$message({
                    message: '请输入权限！',
                    type: 'warning'
                });
                return;
            }

            this.tableData.push(this.userInfo);
            this.userInfo = {
                id: '',
                permission: '',
            };
        },

        //删除
        delUser(idx) {
            this.$confirm('确认删除此管理员信息？')
                .then(_ => {
                    this.tableData.splice(idx, 1);
                })
                .catch(_ => { });
        },
        //修改
        editUser(item, idx) {
            this.userIndex = idx;
            this.editObj = {
                id: item.id,
                permission: item.permission,
            };
            this.dialogVisible = true;
        },

        searchUser() {
            const searchId = this.searchId.trim(); // 去除前后空格
            if (!searchId) {
                this.$message({
                    message: '请输入管理员ID进行查询！',
                    type: 'warning'
                });
                return;
            }

            let found = false;
            for (let i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].id === searchId) {
                    this.$message({
                        message: `找到管理员: ID-${this.tableData[i].id}, 权限-${this.tableData[i].permission}`,
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
            this.dialogVisible = false;
            Vue.set(this.tableData, this.userIndex, this.editObj);
        }
    },
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