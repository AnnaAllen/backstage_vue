import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: 'menuManage/menuList',
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
    ]
  },
  {
    path: '/test',
    name: 'Test',
    component: resolve => require(['../views/test.vue'],resolve) 
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
