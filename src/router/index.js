import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from "@/layout/Layout.vue"

const routes = [{
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: '登录',
    meta: {
      title: "登录",
      requireAuth: false
    },
    component: () => import('@/views/Login/index.vue')
  },
  {
    path: '/main',
    component: Layout,
    icon: "el-icon-s-home",
    meta: {
      title: "首页",
      requireAuth: true
    },
    redirect: '/home',
    children: [{
      path: "/home",
      name: "首页",
      icon: "el-icon-s-home",
      meta: {
        title: "首页",
        requireAuth: true
      },
      component: () => import('@/views/Home/index.vue')
    }]
  },
  {
    path: "/order",
    name: "订单管理",
    component: Layout,
    icon: "el-icon-s-order",
    meta: {
      title: "订单管理",
      requireAuth: true
    },
    children: [{
        path: "/order-list",
        name: "订单列表",
        icon: "el-icon-s-data",
        meta: {
          title: "订单列表",
          requireAuth: true
        },
        component: () => import("../views/Order/OrderList/index.vue")
      },
      {
        path: "/order-goods-list",
        name: "商品订单列表",
        icon: "el-icon-document-copy",
        meta: {
          title: "商品订单列表",
          requireAuth: true
        },
        component: () => import("../views/Order/GoodsList/index.vue")
      },
      {
        path: "/order-detail",
        name: "账单详情",
        icon: "el-icon-tickets",
        meta: {
          title: "账单详情",
          requireAuth: true
        },
        component: () => import("../views/Order/OrderDetail/index.vue")
      }
    ]
  },
  // {
  //   path: '/404',
  //   name: '404',
  //   meta: {
  //     title: "404",
  //     requireAuth: false
  //   },
  //   component: () => import('@/views/404.vue')
  // },
  // {
  //   path: '/500',
  //   name: '500',
  //   meta: {
  //     title: "500",
  //     requireAuth: false
  //   },
  //   component: () => import('@/views/500.vue')
  // },
]

// createRouter 创建路由实例
const router = createRouter({
  /**
   * hash模式：createWebHashHistory，
   * history模式：createWebHistory
   */
  history: createWebHashHistory(),
  routes
})

NProgress.inc(0.2)
NProgress.configure({
  easing: 'ease',
  speed: 600,
  showSpinner: false
})

// 设置title
router.beforeEach((to, from, next) => {
  // 启动进度条
  NProgress.start()

  // 设置头部
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = "后台管理系统"
  }
  next()
})

router.afterEach(() => {
  // 关闭进度条
  NProgress.done()
})

// 抛出路由实例, 在 main.js 中引用
export default router