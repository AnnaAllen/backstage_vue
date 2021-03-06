import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: 'register',
    component: resolve => require(['../views/index.vue'],resolve),
    children: [
      // 菜单列表
      {
        path: 'menuManage/menuList',
        name: 'menuList',
        component: resolve => require(['../views/menuManage/menuList.vue'], resolve)
      },
      // 添加编辑菜单
      {
        path: 'menuManage/addMenu',
        name: 'addMenu',
        component: resolve => require(['../views/menuManage/addMenu.vue'], resolve)
      },
      // 添加编辑分类
      {
        path: 'classifyManage/editClassify',
        name: 'editClassify',
        component: resolve => require(['../views/classifyManage/editClassify.vue'], resolve)
      },
      // 分类列表
      {
        path: 'classifyManage/classify',
        name: 'classify',
        component: resolve => require(['../views/classifyManage/classify.vue'], resolve)
      },
      // 额外添加列表
      {
        path: 'classifyManage/extra',
        name: 'extra',
        component: resolve => require(['../views/classifyManage/extra.vue'], resolve)
      },
      // 额外添加列表
      {
        path: 'classifyManage/addExtra',
        name: 'addExtra',
        component: resolve => require(['../views/classifyManage/addExtra.vue'], resolve)
      },
      // 管理员列表
      {
        path: 'manageMember/manageMember',
        name: 'manageMember',
        component: resolve => require(['../views/manageMember/manageMember.vue'], resolve)
      },
      // 管理员信息
      {
        path: 'manageMember/editManage',
        name: 'editManage',
        component: resolve => require(['../views/manageMember/editManage.vue'], resolve)
      },
      // 用户点单统计
      {
        path: 'statistics/statistics',
        name: 'statistics',
        component: resolve => require(['../views/statistics/statistics.vue'], resolve)
      },
      // 首页方案
      {
        path: 'weAppIndex/index',
        name: 'weAppIndex',
        component: resolve => require(['../views/weAppIndex/index.vue'], resolve) 
      },
      // 处理订单
      {
        path: 'order/index',
        name: 'order',
        component: resolve => require(['../views/order/index.vue'], resolve) 
      }
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: resolve => require(['../views/register.vue'],resolve) 
  },
  {
    path: '/test',
    name: 'test',
    component: resolve => require(['../views/test.vue'], resolve)
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
