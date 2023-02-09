<template>
    <div class="container">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 40px 0px 0px 50px;font-size:large">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/main/mealMain' }">套餐管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加套餐</el-breadcrumb-item>
        </el-breadcrumb>

        <el-form ref="form" :model="form" label-width="80px" style="width: 600px;margin:100px 0px 0px 300px">
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
                <el-button type="primary" @click="add">添加套餐</el-button>
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

        add() {
            // console.log("this.form==>" + JSON.stringify(this.form));
            this.$apis.meal.addMeal(this.form).then((msg) => {
                console.log("addmeal==>" + JSON.stringify(msg));
                if (msg.meta.status == '200') {
                    this.$message.success('添加成功');
                    // location.reload();
                    this.$router.push('/main/MealMain')
                }
                else {
                    this.$message.error('添加失败');
                    // location.reload();
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    background-color: #fff;
    height: 100vh;
    border: 1px solid transparent;
}
</style>