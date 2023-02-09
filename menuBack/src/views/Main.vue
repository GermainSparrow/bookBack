<template>
    <el-container>
        <el-header style="background-color: #eee">奇趣美食后台管理系统</el-header>
        <el-container>
            <el-aside width="200px" style="height: 100vh">
                <!-- 表格组件 -->
                <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
                    active-text-color="#ffd04b" @select="changeMenu">

                    <el-menu-item v-for="items in menuList" :index="items.path"
                        style="height: 100px;backgroundColor:skyblue">
                        <i class="el-icon-user-solid" style="height: 100px;line-height:100px;font-size:18px"></i>
                        <span slot="title">{{ items.name }}</span>
                    </el-menu-item>

                </el-menu>



            </el-aside>

            <el-main>
                <!-- 二级路由 -->
                <router-view></router-view>

            </el-main>

        </el-container>
    </el-container>
</template>

<script>
export default {

    data() {
        return {
            menuList: [
                {
                    name: '管理员管理',
                    path: '/main/adminMain'
                },
                {
                    name: '轮播图管理',
                    path: '/main/swiperMain'
                },
                {
                    name: '菜谱管理',
                    path: '/main/foodMenu'
                },
                {
                    name: '会员管理',
                    path: '/main/memberMain'
                },
                {
                    name: '套餐管理',
                    path: '/main/MealMain'
                },

            ]

        }
    },
    methods: {
        changeMenu(path) {
            console.log(path);
            this.$router.push(path)
        }
    }
}
</script>

<style lang="scss" scoped>
el-menu-item {
    text-align: right;
}

.el-header,
.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
    padding-top: 0;
}

body>.el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}

body {
    margin: 0;
}

el-menu-item {
    height: 100px;

}
</style>