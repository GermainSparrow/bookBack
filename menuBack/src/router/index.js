// import ElementUI from 'element-ui'
import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/admin/Login.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/admin/Login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: 'adminMain',
        name: 'adminMain',
        component: () => import('../views/admin/AdminMain.vue'),
      },
      {
        path: 'addAdmin',
        name: 'addAdmin',
        component: () => import('../views/admin/AddAdmin.vue')
      },
      {
        path: 'swiperMain',
        name: 'swiperMain',
        component: () => import('../views/swiper/SwiperMain.vue')
      },
      {
        path: 'addSwiper',
        name: 'addSwiper',
        component: () => import('../views/swiper/AddSwiper.vue')
      },
      {
        path: 'editSwiper',
        name: 'editSwiper',
        component: () => import('../views/swiper/EditSwiper.vue')
      },
      {
        path: 'foodMenu',
        name: 'foodMenu',
        component: () => import('../views/food/FoodMenu.vue')
      },
      {
        path: 'alterFood',
        name: 'alterFood',
        component: () => import('../views/food/AlterFood.vue')
      },
      {
        path: 'MealMain',
        name: 'MealMain',
        component: () => import('../views/subscribe/MealMain.vue')
      },
      {
        path: 'addMeal',
        name: 'addMeal',
        component: () => import('../views/subscribe/AddMeal.vue')
      },
      {
        path: 'EditMeal',
        name: 'EditMeal',
        component: () => import('../views/subscribe/EditMeal.vue')
      },
      {
        path: 'memberMain',
        name: 'memberMain',
        component: () => import('../views/member/MemberMain.vue'),
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

// 配置前置守卫
router.beforeEach((to, from, next) => {
  //如果已登录或跳转到login-->正常跳转

  if (sessionStorage.getItem('user') || to.path == '/login') {
    next()
  }
  // else 报错并跳转到login
  else {
    Message({
      type: 'error',
      message: '您还未登录 请登录'
    });
    next('/login')
  }
})


export default router
