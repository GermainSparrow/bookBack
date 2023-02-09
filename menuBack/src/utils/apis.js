//引入封装好的方法们
//注释测试
import request from "./request";
export default {
    //管理员模块
    admin: {
        //管理员登录
        login(obj) {
            console.log(1111111111);
            return request.post('/admin/login', obj)
        },
        //管理员列表
        getAllAdmins() {
            return request.get('/admin/getAllAdmins')
        },
        //添加管理员
        addAdmins(obj) {
            return request.post('/admin/addAdmins', obj)
        },
        //删除管理员
        delAdmins(id) {
            return request.post('/admin/delAdmins', { _id: id })
        }
    },
    //轮播图管理
    swiper: {
        //轮播图列表
        getAllSwiper() {
            return request.get('/admin/getAllSwiper')
        },
        //添加轮播图
        addSwiper(obj) {
            return request.post('/admin/addSwiper', obj)
        },
        //删除轮播图
        deleteSwiper(id) {
            return request.get('/admin/deleteSwiper', { _id: id })
        },
        //修改轮播图
        updateSwiper(obj) {
            return request.post('/admin/updateSwiper', obj)
        },
    },
    //菜谱管理
    food: {
        //菜品展示
        findAllMenu(obj) {
            return request.post('/admin/findAllMenu', obj)
        },
        //菜品搜索
        searchMenu(obj) {
            return request.post('/admin/searchMenu', obj)
        },
        //菜品详情
        menuDetail(obj) {
            return request.post('/admin/menuDetail', obj)
        },
        //修改菜品
        updateMenu(obj) {
            return request.post('/admin/updateMenu', obj)
        },
    },
    //会员管理
    member: {
        //获取所有会员
        getAllMembers() {
            return request.get('/member/getAllMembers')
        },
        //删除会员
        delMember(id) {
            return request.post('/member/delMember', { _id: id })
        },
        //后端充值会员
        updateMemberToVip(obj) {
            return request.post('/member/updateMemberToVip', obj)
        },
        //取消会员
        cancleMember(id) {
            return request.post('/member/cancleMember', { _id: id })
        }
    },
    meal: {
        //获取所有套餐
        getAllMeal() {
            return request.get('/meal/getAllMeal')
        },
        //修改套餐
        updateMeal(obj) {
            return request.post('/meal/updateMeal', obj)
        },
        //添加套餐
        addMeal(obj) {
            return request.post('/meal/addMeal', obj)
        },
        //删除套餐
        delMeal(id) {
            return request.post('/meal/delMeal', { _id: id })
        },
    }
}