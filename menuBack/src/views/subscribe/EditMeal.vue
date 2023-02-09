<template>
    <div class="container">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 40px 0px 0px 50px;font-size:large">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/main/mealMain' }">套餐管理</el-breadcrumb-item>
            <el-breadcrumb-item>修改套餐</el-breadcrumb-item>
        </el-breadcrumb>

        <el-form ref="form" :model="form" label-width="80px" style="width: 600px;margin:100px 0px 0px 300px">
            <el-form-item label="套餐编号">
                <el-input v-model="form._id"></el-input>
            </el-form-item>
            <el-form-item label="套餐月数">
                <el-input v-model="form.mouth"></el-input>
            </el-form-item>
            <el-form-item label="打折价格">
                <el-input v-model="form.salePrice"></el-input>
            </el-form-item>
            <el-form-item label="原价">
                <el-input v-model="form.normalPrice"></el-input>
            </el-form-item>

            <el-form-item label="是否推荐">
                <el-input v-model="form.type"></el-input>
            </el-form-item>
            <el-form-item label="套餐名">
                <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="update">修改套餐</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {}
        }
    },
    methods: {

        update() {

            // console.log("this.form==>" + JSON.stringify(this.form));
            this.$apis.meal.updateMeal(this.form).then((msg) => {
                console.log("addmeal==>" + JSON.stringify(msg));
                if (msg.meta.status == '200') {
                    this.$message.success('修改成功');
                    // location.reload();
                    this.$router.push('/main/MealMain')
                }
                else {
                    this.$message.error('修改失败');
                    // location.reload();
                }
            })
        }
    },
    created() {
        //route传值
        console.log("==>" + JSON.stringify(this.$route.query));
        if (this.$route.query) {
            this.form = this.$route.query;
        } else {
            console.log("xxxerr");
        }
    },
}
</script>

<style lang="scss" scoped>
.container {
    background-color: #fff;
    height: 100vh;
    border: 1px solid transparent;
}
</style>