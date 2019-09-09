import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', // 当这个路由就异步加载这个组件
      component: () => import('./views/ebook/index.vue'),
      children: [{
        path: ':filename',
        component: () => import('./components/ebook/EbookReader')
      }
      ]
    }
  ]
})
