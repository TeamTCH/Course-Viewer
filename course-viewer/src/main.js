import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false
Vue.use(Vuetify, {
  iconfont: 'fa'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
