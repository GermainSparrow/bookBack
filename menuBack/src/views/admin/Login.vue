<template>
    <div class="main">
        <main>
            <h2>奇趣美食</h2>
            <el-input v-model="accountNumber" style="  width: 300px;display:block" placeholder="请输入内容"></el-input>
            <el-input placeholder="请输入密码" style="  width: 300px;display:block" v-model="password" show-password>
            </el-input>
            <el-button type="primary" round style="margin-left:250px;height:40px" @click="login">点击登录</el-button>
        </main>
    </div>
</template>

<script>

export default {

    data() {
        return {
            accountNumber: '',
            password: ''
        }
    },
    methods: {
        login() {
            let p = this.$apis.admin.login({
                account: this.accountNumber,
                password: this.password
            })
            p.then(msg => {
                console.log(msg);
                if (msg.code == 200) {
                    sessionStorage.setItem('user', JSON.stringify(msg));
                    // sessionStorage.setItem('buttonPermission',JSON.stringify(['edit','delete']))
                    this.$message.success('登录成功');
                    //设置面包屑导航的数组
                    // localStorage.setItem('breads',JSON.stringify([{name:'主页',path:'/'},{name:'管理员主页',path:'/adminMain'}]))
                    this.$router.push('/main')
                }
                else {
                    this.$message.error('登录失败');
                    //清空输入框
                    this.accountNumber='';
                    this.password = ''
                }
            })
        }
    },
    props: {
        userList: {
            type: Array,
            default: () => [{ account: 200113, password: 200113 }]
        }
    },
    created() {

    }
}
</script>

<style lang="scss" scoped>
.main {
    height: 100vh;
    width: 100vw;
    background-image: url('../../assets/img/bg2.png');
    border: 1px solid transparent;
}

main {
    width: 600px;
    height: 400px;
    margin: 250px auto;
    background-color: rgba($color: #eee, $alpha: 0.3);
    border: 1px solid transparent;
    border-radius: 10px;

    h2 {
        margin: 50px auto;
        margin-left: 260px;
    }

    ::v-deep input {

        margin: 30px auto;
        margin-left: 150px;
    }
}
</style>