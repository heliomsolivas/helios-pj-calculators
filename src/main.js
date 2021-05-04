import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
  id: 'G-2JHZS4M7Q9'
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
