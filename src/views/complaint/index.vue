<template>
    <div id="app">
        <div class="head">
            <div class="input-button-container">
                <textarea v-model="new_complaint" class="large-textarea" placeholder="请输入内容..."></textarea>
                <button class="button" type="button" @click="addcomplaint()">投诉</button>
            </div>
        </div>
        <!-- 主体内容 -->
        <div class="body">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="序号" width="180"><template slot-scope="scope"> {{ scope.$index + 1 }}
                    </template></el-table-column>
                <el-table-column prop="c_id" label="投诉ID" width="200"></el-table-column>
                <el-table-column prop="c_time" label="投诉时间" width="200"></el-table-column>
                <el-table-column label="投诉详情">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-zoom-in" @click="seeDetail(scope.row, scope.$index)"
                            circle></el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="is_solved" label="是否反馈">
                    <template v-slot:default="scope">
                        <span>{{ scope.row.is_solved == 1 ? '已反馈' : '未反馈' }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="查看反馈">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-question" @click="seeFeedback(scope.row, scope.$index)"
                            circle></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="投诉详情" :visible.sync="dialogVisible1" width="40%">
            <div>
                <p>{{ complaint }}</p>
            </div>
        </el-dialog>
        <el-dialog title="反馈详情" :visible.sync="dialogVisible2" width="40%">
            <div>
                <p>{{ feedback.f_content }}</p>
            </div>
        </el-dialog>
    </div>

</template>


<script>

import { getMyComplaints, getFeedbacks, submitComplaint } from '@/api/common'
import store from '@/store'

export default {
    data: function () {
        return {
            tableData: [
                {
                    c_id: 1,
                    c_time: 1,
                }
            ],
            complaint: '', // 投诉
            feedback: {
                f_content: ''
            }, // 反馈
            new_complaint: '', // 新增投诉内容
            dialogVisible1: false,
            dialogVisible2: false
        }
    },
    methods: {
        async logout() {
            await this.$store.dispatch('user/logout')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        },
        seeDetail(row, index) {
            this.complaint = this.tableData[index].c_content;
            this.dialogVisible1 = true;

        },
        seeFeedback(row, index) {
            this.dialogVisible2 = true;

            if (row.is_solved == 0) {
                this.feedback.f_content = "暂无反馈信息，请等待管理员反馈";
            }
            else {
                getFeedbacks(row.c_id).then(response => {
                    this.feedback = response.data;
                })
            }


        },

        fetchComplaints() {
            getMyComplaints(store.getters.id).then(response => {
                this.tableData = response.data
                this.tableData.forEach(item => {
                    item.c_time = item.c_time.slice(0, -2); // 去掉后两位  
                });
            })
        },
        addcomplaint() {
            if (this.new_complaint == '') {
                alert('投诉内容不能为空！');
                return;
            }
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
            let data = {
                u_id: store.getters.id,
                c_time: formattedDate,
                c_content: this.new_complaint,
            }
            submitComplaint(data).then(response => {
                this.fetchComplaints()
                this.new_complaint = ''
            })
        }
    },
    created() {
        this.fetchComplaints()
    }
}
</script>


<style lang="scss" scoped>
.input-button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.large-textarea {
    width: 450px;
    height: 100px;
    padding: 10px;
    font-size: 16px;
    text-align: left;
}


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

.button {
    margin-left: 10px;
    /* 与输入框的间距 */
    padding: 10px 20px;
    font-size: 16px;
    /* 可选，与输入框字体大小相匹配 */
}

.body {
    margin-top: 30px;
}
</style>