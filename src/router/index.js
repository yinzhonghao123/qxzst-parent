import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import index from '@/components/index'
import drive from '@/components/views/drive/drive'
import factoryCar from '@/components/views/factory-car/factory-car'
import manage from '@/components/views/manage/manage'
import marketing from '@/components/views/marketing/marketing'
import set from '@/components/views/set/set'
import work from '@/components/views/work/work'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [  // 这里就是二级路由的配置
        {
          path: '/index/factoryCar',
          name: 'factoryCar',
          component: factoryCar
        }, {
          path: '/index/manage',
          name: 'manage',
          component: manage
        }, {
          path: '/index/marketing',
          name: 'marketing',
          component: marketing
        }, {
          path: '/index/set',
          name: 'set',
          component: set
        }, {
          path: '/index/work',
          name: 'work',
          component: work
        }, {
          path: '/index/drive',
          name: 'drive',
          component: drive
        }, {
          path: '*',
          redirect: '/index/drive'
        }
      ]
    }
  ]
})
