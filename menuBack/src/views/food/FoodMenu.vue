<template>
  <div style="background-color: #fff; border: 1px solid transparent">
    <!-- 面包屑导航 -->
    <!-- <el-image src="https://st-cn.meishij.net/rs/41/203/113291/n113291_154760436725227.jpg"></el-image> -->
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="margin: 40px 0px 0px 50px; font-size: large"
    >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜谱管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索/添加组件 -->
    <div class="title">
      <input
        type="text"
        v-model="searchVal"
        placeholder="请输入搜索关键字"
        @keydown="Several"
      />
    </div>
    <!-- 表单组件 -->
    <el-table
      :data="tempList"
      style="width: 100%"
      :header-cell-class-name="headerStyle"
    >
      <el-table-column label="菜谱编号" prop="_id"> </el-table-column>
      <el-table-column label="名称" prop="name"> </el-table-column>
      <el-table-column label="缩略图" prop="coverpic">
        <!-- <img :src="coverpic" alt=""> -->
        <template slot-scope="scope">
          <el-image :src="scope.row.coverpic"> </el-image>
          <!-- <img :src="scope.coverpic" alt=""> -->
        </template>
      </el-table-column>
      <el-table-column label="浏览量" prop="grade"> </el-table-column>
      <el-table-column label="收藏量" prop="collections"> </el-table-column>
      <el-table-column label="是否免费" prop="isFree">
        <template slot-scope="scope">{{ scope.row.isFree | YN }}</template>
      </el-table-column>
      <el-table-column label="是否热点" prop="isHot">
        <template slot-scope="scope">{{ scope.row.isHot | YN }}</template>
      </el-table-column>
      <el-table-column label="原料" prop="ingredient">
        <template slot-scope="scope">
          <el-popover placement="right" width="400" trigger="click">
            <el-table :data="scope.row.ingredient">
              <el-table-column property="name" label="名称"></el-table-column>
              <el-table-column property="number" label="数量"></el-table-column>
            </el-table>
            <el-button slot="reference">查看</el-button>
          </el-popover>
          <!-- <el-button style="border: 0" @click="showIngredient(scope.row)"
            >查看</el-button
          > -->
        </template>
      </el-table-column>
      <el-table-column label="制作步骤" prop="method">
        <template slot-scope="scope">
          <el-popover placement="right" width="600" trigger="click">
            <el-table :data="scope.row.method">
              <el-table-column property="img" label="图片">
                <template slot-scope="scop">
                  <el-image :src="scop.row.img"></el-image>
                </template>
              </el-table-column>
              <el-table-column
                property="describe"
                label="描述"
              ></el-table-column>
            </el-table>
            <el-button slot="reference">查看</el-button>
          </el-popover>
          <!-- <el-button style="border: 0" @click="showIngredient(scope.row)"
              >查看</el-button
            > -->
        </template>
      </el-table-column>
      <el-table-column align="right" style="text-align: center">
        <template slot="header" slot-scope="scope">
          <h3>操作</h3>
        </template>
        <template slot-scope="scope" style="text-align: center">
          <el-button size="mini" type="danger" @click="showFood(scope.row)">
            修改
          </el-button>
    
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import mx from "../../mixins/CommonMixin";
export default {
  mixins: [mx],
  data() {
    return {
      // tableData: [],
      total: 0,
      searchVal: "",
      //总页数
      pages: 0,
      currentPage: 1,
      tempList: [],
      pageSize: 2,
    };
  },
  headStyle({ row, rowIndex }) {
    return "tableStyle";
  },
  methods: {
    showIngredient(data) {
      console.log(data);
    },
    headerStyle({ row, column, rowIndex, columnIndex }) {
      return "tableStyle";
    },
    //添加管理员
    addAdmin() {
      this.$router.push("/main/addAdmin");
    },
    //删除函数
    handleDelete(a, id) {
      this.$apis.food.delAdmins(id).then((msg) => {
        if (msg.code == "200") {
          this.$message.success("删除成功");
          location.reload();
        } else {
          this.$message.error("删除失败");
          location.reload();
        }
      });
    },
    showFood(data) {
      console.log(data);
      // this.$router.push('/main/addAdmin')
      this.$router.push({
        path: "/main/alterFood",
        query: {
          id: data._id,
        },
      });
    },
    //搜索
    Several(ev) {
      if (ev.key == "Enter") {
        let temp = this.searchVal;
        if (!temp) {
          this.search();
        } else {
          this.$apis.food
            .searchMenu({
              val: temp,
              pageSize: this.pageSize,
            })
            .then((res) => {
              this.tempList = res.menus;
              this.total = res.total;
              this.searchVal = "";
            });
        }
      }
    },

    //渲染函数
    search() {
      this.$apis.food
        .findAllMenu({
          pageSize: this.pageSize,
          currentPage: this.currentPage,
        })
        .then((res) => {
          console.log(res);
          console.log(1);
          this.tempList = res.menus;
          this.total = res.total;
        });
    },
    //分页函数
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(this.pageSize, "页");
      this.search();
      // //每页末尾的数据
      // let end = this.pageSize * this.currentPage;
      // this.tempList = [];
      // for (let i = end - this.pageSize; i <= end; i++) {
      //     if (this.tableData[i - 1]) {
      //         this.tempList.push(this.tableData[i - 1])
      //     }
    },

    // },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.search();
    },
  },
  filters: {
    YN(val) {
      if (val == "Y") {
        return "是";
      } else {
        return "否";
      }
    },
  },
  //创建时赋予面包屑数据
  created() {
    this.search();
  },
};
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