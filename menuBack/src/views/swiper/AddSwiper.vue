<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 40px 0px 30px 50px;font-size:large">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/main/swiperMain' }">轮播图管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{ pageTitle }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form ref="form" :model="form" label-width="80px">
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
                    <el-form-item label="图片">
                        <el-upload class="avatar-uploader" action="http://127.0.0.1:3000/api/uploadImg"
                            :on-success="imgUploadSuccess" :show-file-list="false">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <!-- <el-input v-model="form.headImg"></el-input> -->
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item>
                <el-button type="primary" @click="doSave">保存</el-button>
                <!-- <el-button  @click="goSwiperMain">返回轮播图管理</el-button> -->
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imageUrl: '',
            _id: '',
            form: {
                open_type: '',
                navigator_url: '',
                image_url: ''
            },
            pageTitle: ""
        }
    },
    mounted() {


        this.pageTitle = "新增轮播图";

    },
    methods: {
        imgUploadSuccess(res, file) {
            this.imageUrl = res.imgUrl;
            this.form.image_url = res.imgUrl;
        },
        doSave() {

            //新增用户
            this.$apis.swiper.addSwiper(this.form).then((msg) => {
                if (msg.code == '200') {
                    this.$message.success('添加成功');
                    this.$router.push("/main/swiperMain")
                }
                else {
                    this.$message.error('添加失败'); 
                }
            })
        }

    },
    goSwiperMain() {
        this.$router.push("/main/swiperMain")
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