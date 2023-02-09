<template>
    <div class="container">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 40px 0px 0px 50px;font-size:large">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/main/adminMain' }">管理员管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加管理员</el-breadcrumb-item>
        </el-breadcrumb>

        <el-form ref="form" :model="form" label-width="80px" style="width: 600px;margin:100px 0px 0px 300px">
            <el-form-item label="登录名称">
                <el-input v-model="form.account"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名">
                <el-input v-model="form.realname"></el-input>
            </el-form-item>

            <el-form-item label="电话号码">
                <el-input v-model="form.telephone"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="add">添加管理员</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                account: '',
                password: '',
                realname: '',
                telephone: ''
            }
        }
    },
    methods: {
        
        add() {
            this.$apis.admin.addAdmins(this.form).then((msg) => {
                if (msg.code == '200') {
                    this.$message.success('添加成功');
                    location.reload();
                }
                else {
                    this.$message.error('添加失败');
                    location.reload();
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