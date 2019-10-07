import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './assets/styles/icon.css'
import i18n from './lang'
import '../src/utils/boost'
import '../src/utils/createApi'
// import './mock'
import VueLazyLoad from 'vue-lazyload'
Vue.config.productionTip = false
Vue.use(VueLazyLoad)
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
