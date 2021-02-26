import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import './assets/scss/reset.scss'
import Time from './ds/Time.vue'

Vue.config.productionTip = false
Vue.component('Time', Time)

new Vue({
  render: h => h(App),
}).$mount('#app')
