<template>
    <div class="container">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 40px 0px 0px 50px;font-size:large">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/main/foodMenu' }">菜谱管理</el-breadcrumb-item>
            <el-breadcrumb-item>修改菜谱</el-breadcrumb-item>
        </el-breadcrumb>

        <el-form ref="form" :model="form" label-width="80px" style="width: 600px;margin:100px 0px 0px 300px">
            <el-form-item label="是否免费">
                <el-radio v-model="form.isFree" label="Y">是</el-radio>
                <el-radio v-model="form.isFree" label="N">否</el-radio>
            </el-form-item>
            <el-form-item label="是否热点">
                <el-radio v-model="form.isHot" label="Y">是</el-radio>
                <el-radio v-model="form.isHot" label="N">否</el-radio>
            </el-form-item>
            <el-form-item label="菜品名字">
                <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="菜品时间">
                <el-input v-model="form.needtime"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="add">修改菜谱</el-button>
                <el-button  @click="ret">返回菜谱管理</el-button>
            </el-form-item>
        </el-form>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            id:this.$route.query.id,
            // id:'',
            form: {}
        }
    },
    methods: {
        ret(){
            this.$router.push('/main/foodMenu')
        },
        
        add() {
            this.$apis.food.updateMenu({
                _id:this.id,
                isFree:this.form.isFree,
                isHot:this.form.isHot,
                name:this.form.name,
                needtime:this.form.needtime,

            }).then((msg) => {
                console.log(msg);
                if (msg.meta.status == 200) {
                    this.$message.success('修改成功');
                    // location.reload();
                }
                else {
                    this.$message.error('修改失败');
                    // location.reload();
                }
            })
        }
    },
    created(){
        // console.log('修改食物');
        this.id= this.$route.query.id
        // console.log(this);
        this.$apis.food.menuDetail({
            _id:this.$route.query.id
        }).then(res=>{
            console.log(res);
            this.form = res.message[0]
            console.log(this.form);
        })
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