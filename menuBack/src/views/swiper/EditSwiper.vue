<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 40px 0px 30px 50px;font-size:large">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/main/swiperMain' }">轮播图管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{ pageTitle }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form ref="form" :model="form" label-width="80px" >
            <el-form-item label="打开方式">
                <el-input v-model="form.open_type"></el-input>
            </el-form-item>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="导航地址">
                        <el-input v-model="form.navigator_url"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="图片(地址)">
                        <el-input v-model="form.image_src"></el-input>
                    </el-form-item>
                </el-col> 
            </el-row>
            <el-form-item>
                <el-button type="primary" @click="doSave">保存</el-button>
                <el-button @click="goSwiperMain">返回轮播图管理</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                _id:'',
                open_type: '',
                navigator_url: '',
                image_url:''
            },
            pageTitle: ""
        }
    },
    mounted() {

            this.pageTitle = "编辑轮播图";
            this.form._id=this.$route.query.id
           this.form.image_src=this.$route.query.image_src;
           this.form.open_type=this.$route.query.open_type;
           this.form.navigator_url=this.$route.query.navigator_url
        
    },
    methods: {
        doSave() {
            
                //修改用户
                this.$apis.swiper.updateSwiper(this.form).then(res => {
                    if (res.code == 200) {
                        this.$message.success("修改成功");
                    } else {
                        console.log(this.form);
                        this.$message.error("修改失败");
                    }
                }).catch(err => {
                    this.$message.error("修改失败");
                })
             
        },
        goSwiperMain() {
            this.$router.push("/main/swiperMain")
        }
    }
}
</script>

<style lang="scss" scoped>
::v-deep .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

::v-deep .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>