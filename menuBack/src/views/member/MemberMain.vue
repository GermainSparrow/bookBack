<template>
    <div class="pageBody">
        <!-- 面包屑导航 -->
        <el-row>
            <el-breadcrumb class="nav-bar">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>会员管理</el-breadcrumb-item>
            </el-breadcrumb>
        </el-row>
        <!-- 搜索/添加组件 -->
        <el-row class="search-box">
            <el-col :span="5">
                <el-input v-model="input" placeholder="请输入搜索关键字"></el-input>
            </el-col>
            <el-col :span="1">
                <el-button type="primary" @click="doSearch">搜索</el-button>
            </el-col>
        </el-row>
        <!-- 表格 -->
        <div class="table-box">
            <el-table :data="tempList" style="width: 100%" max-height="450">
                <el-table-column fixed prop="_id" label="用户编号">
                </el-table-column>
                <el-table-column prop="nickName" label="用户名">
                </el-table-column>
                <el-table-column prop="gender" label="性别">
                    <template slot-scope="Scope">
                        {{ Scope.row.gender | formatGender }}
                    </template>
                </el-table-column>
                <el-table-column prop="avatarUrl" label="头像">
                    <template slot-scope="imgScope">
                        <el-image :preview-src-list="[imgScope.row.avatarUrl]" style=" height: 80px"
                            :src="imgScope.row.avatarUrl"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="vipdate" label="vip截止日期">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button @click="doRecharge(scope.row)" type="primary" size="small">
                            充值会员
                        </el-button>
                        <el-button @click="doCancel(scope.row)" type="danger" size="small">
                            取消会员
                        </el-button>
                        <el-button @click="doDelete(scope.row)" type="danger" size="small">
                            删除会员
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <div class="paging-box">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="[1, 2]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <!-- 嵌套表单弹框 -->
        <el-dialog title="充值会员" :visible.sync="dialogFormVisible" width="30%">
            充值日期：
            <el-date-picker v-model="dateVal" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
            </el-date-picker>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="doDefine">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    filters: {
        formatGender(val) {
            if (val == '1') {
                return '男'
            } else {
                return '女'
            }
        }
    },
    created() {
        this.getAllSearch();
    },
    data() {
        return {
            input: "",
            currentPage: 1,
            pageSize: 2,
            total: 0,
            tableData: [],
            dialogFormVisible: false,
            dateVal: '',
            vipId: '',
            tempList: [],
        }
    },
    methods: {
        // 改变每页条数
        handleSizeChange(val) {
            this.pageSize = val;
            //每页末尾的数据
            let end = this.pageSize * this.currentPage;
            this.tempList = [];
            for (let i = end - this.pageSize; i <= end; i++) {
                if (this.tableData[i - 1]) {
                    this.tempList.push(this.tableData[i - 1])
                }

            }
        },
        // 改变当前页
        handleCurrentChange(val) {
            this.currentPage = val;
            //每页末尾的数据
            let end = this.pageSize * this.currentPage;
            this.tempList = [];
            for (let i = end - this.pageSize; i <= end; i++) {
                if (this.tableData[i]) {
                    this.tempList.push(this.tableData[i])
                }

            }
        },
        // 关键字查询
        doSearch() {
            if (this.input) {
                let re = this.tableData.filter(item => {
                    return item._id.indexOf(this.input) != -1 || item.nickName.indexOf(this.input) != -1 || item.province.indexOf(this.input) != -1 || item.vipdate.indexOf(this.input) != -1 || item.gender.indexOf(this.input) != -1
                })
                this.tempList = re
                if (re) {
                    this.tempList = re
                } else {
                    this.tempList = []
                }
            } else {
                this.getAllSearch();
            }

        },
        // 确认充值会员
        doDefine() {
            console.log(this.vipId, this.dateVal,'111111111111111111');
            this.$apis.member.updateMemberToVip({
                _id: this.vipId,
                date: this.dateVal
            }).then(res => {
                if (res.meta.status == 200) {
                    this.$message.success(`${res.meta.msg}`)
                    this.getAllSearch();
                    this.dialogFormVisible = false
                } else {
                    this.$message.error(`${res.meta.msg}`)
                }
            }).catch(err => {
                this.$message.error('当前网络环境不佳，请稍后再试！')
            })
        },
        // 显示充值对话框
        doRecharge(row) {
            const { _id, vipdate } = row
            // console.log(_id, vipdate)
            this.dialogFormVisible = true
            this.dateVal = vipdate
            this.vipId = _id
        },
        // 取消会员
        doCancel(row) {
            const { _id } = row
            this.$confirm('此操作将取消该会员资格, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$apis.member.cancleMember(_id).then(res => {
                    console.log(res)
                    if (res.meta.status == 200) {
                        this.$message.success('取消会员资格成功!')
                    } else {
                        this.$message.error('取消会员资格失败!')
                    }
                }).catch(err => {
                    this.$message.error('当前网络环境不佳，请稍后再试！')
                    console.log(err)
                })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        // 删除会员
        doDelete(row) {
            const { _id } = row
            this.$confirm('此操作将永久删除该会员, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$apis.member.delMember(_id).then(res => {
                    if (res.meta.status == 200) {
                        this.$message.success('删除成功!')
                    } else {
                        this.$message.error('删除失败!')
                    }
                }).catch(err => {
                    this.$message.error('当前网络环境不佳，请稍后再试！')
                })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 查询全部
        getAllSearch() {
            this.tempList = []
            this.$apis.member.getAllMembers().then(res => {
                // console.log(res)
                if (res.meta.status == 200) {
                    this.tableData = res.data
                    this.total = res.data.length
                    //默认显示第一页 每页四条数据
                    for (let i = 0; i <= 4; i++) {
                        if(this.tableData[i]){
                            this.tempList.push(this.tableData[i])
                        }
                    };
                    console.log(this.tempList,'000000000000');
                } else {
                    this.$message.error(`${res.meta.msg}`)
                }
            }).catch(err => {
                this.$message.error('当前网络环境不佳，请稍后再试！')
            })
        }

    }
}
</script>

<style lang="scss" scoped>
.pageBody {
    height: 100vh;
    background-color: #fff;

    .nav-bar {
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        padding: 30px 0;
        margin: 0 50px;
    }

    .search-box {
        margin-top: 50px;
        margin-left: 50px;
        line-height: 60px;
    }

    .table-box {
        width: 90%;
        margin-left: 50px;
    }

    .paging-box {
        width: 400px;
        margin-right: 80px;
        float: right;
    }

    .el-dialog {
        line-height: 0px !important;
    }
}
</style>