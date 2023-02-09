<template>
    <div style="background-color: #fff;border:1px solid transparent">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 40px 0px 0px 50px;font-size:large">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>轮播图管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索/添加组件 -->
        <div class="title">
            <input type="text" v-model="searchVal" placeholder="请输入搜索关键字" @keydown="search">
            <button class="addButton" @click="addSwiper"> <i class="el-icon-circle-plus-outline"></i> 添加</button>
        </div>
        <!-- 表单组件 -->
        <el-table :data="tempList" style="width: 100%" :header-cell-class-name="headerStyle">
            <el-table-column label="编号" prop="_id">
            </el-table-column>
            <el-table-column  label="图片" width="280" prop="image_src">
                    <template slot-scope="scope">
                        <el-image :preview-src-list="[scope.row.image_src]" style="width: 200px; height: 100px"
                            :src="scope.row.image_src"></el-image>
                    </template>
                </el-table-column>
            <el-table-column label="导航地址" prop="navigator_url">
            </el-table-column>
            <el-table-column label="打开方式" prop="open_type">
            </el-table-column>
            
            <el-table-column align="right" style="text-align: center">
                <template slot="header" slot-scope="scope">
                    <h3>操作</h3>
                </template>
                <template slot-scope="scope" style="text-align:center">
                    <el-button size="mini" type="blue" @click="goEdit(scope.row)">
                        修改
                    </el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[4, 8, 10]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="pages">
        </el-pagination>
    </div>
</template>

<script>
import axios from 'axios'
import mx from '../../mixins/CommonMixin'
export default {
    mixins: [mx],
    data() {
        return {
            tableData: [],
            searchVal: '',
            //总页数
            pages: 0,
            currentPage: 1,
            tempList: [],
            pageSize: 4,
        }
    },
    headStyle({ row, rowIndex }) {
        return 'tableStyle'
    },
    methods: {
        //编辑
        goEdit(row) {
            console.log("row", row);
            this.$router.push({
                path: "/main/editSwiper",
                query: {
                    id: row._id,
                    navigator_url:row.navigator_url,
                    open_type:row.open_type,
                    image_src:row.image_src
                }
            })
        },
        headerStyle({ row, column, rowIndex, columnIndex }) {
            return 'tableStyle'
        },
        //添加管理员
        addSwiper() {
            this.$router.push('/main/addSwiper')
        },
        //删除函数
        handleDelete(a, id) {
            this.$apis.swiper.deleteSwiper(id).then((msg) => {
                if (msg.code == '200') {
                    this.$message.success('删除成功');
                    location.reload();
                }
                else {
                    this.$message.error('删除失败');
                    location.reload();
                }
            })

        },
        //搜索函数
        search(ev) {
            if (ev.key == 'Enter') {
                let temp = this.searchVal;
                if(!temp){
                    this.tempList = this.tableData
                }
                console.log(this.tempList[0]);
                this.tempList= this.tempList.filter((items) => {
                    return items._id.indexOf(temp) != -1 || items.navigator_url.indexOf(temp) != -1 || items.open_type.indexOf(temp) != -1
                })
            }
        },
        //分页函数
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
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
            //每页末尾的数据
            let end = this.pageSize * this.currentPage;
            console.log(end);
            this.tempList = [];
            for (let i = end - this.pageSize; i <= end; i++) {
                console.log(i);
                if (this.tableData[i]) {
                    this.tempList.push(this.tableData[i])
                }

            }
            console.log(this.tempList);
        }
    },
    //创建时赋予面包屑数据
    created() {
        //获得表格数据
        this.$apis.swiper.getAllSwiper().then(msg => {
            console.log(msg);
            if (msg.meta.status == '200') {
                
                this.tableData = msg.message;
                console.log(this.tableData);
                this.pages = this.tableData.length;
                //默认显示第一页 每页四条数据
                for (let i = 0; i <= 3; i++) {
                    this.tempList.push(this.tableData[i])
                }
            }
        })

    }
}
</script>

<style lang="scss" scoped>
.title {
    display: flex;
    margin: 40px 0px 40px 40px;

    input {
        width: 200px;
        height: 40px;
        border: 1px solid #eee;
        box-sizing: border-box;
        padding-left: 20px;

        ::-webkit-input-placeholder {
            color: #eee;
            font-size: 18px;
        }
    }

    button {
        background-color: rgb(135, 148, 235);
        border: 1px solid transparent;
        color: #fff;
        width: 80px;

        :hover {
            cursor: pointer;
        }
    }

    .tableStyle {
        background-color: skyblue !important;
    }
}
</style>