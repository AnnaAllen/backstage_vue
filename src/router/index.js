import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: resolve => require(['../views/index.vue'],resolve),
    children: [
      {
        path: 'menuManage/menuList',
        name: 'menuList',
        component: resolve => require(['../views/menuManage/menuList.vue'], resolve)
      },
      {
        path: 'menuManage/addMenu',
        name: 'addMenu',
        component: resolve => require(['../views/menuManage/addMenu.vue'], resolve)
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
