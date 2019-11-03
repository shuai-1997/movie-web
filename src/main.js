// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

import axios from "axios"
axios.defaults.baseURL="http://47.100.45.13:9000"
Vue.config.productionTip = false
Vue.prototype.$http=axios
Vue.prototype.pic="http://47.100.45.13:9000/"

import shuaiFooter from "@/components/footer"
Vue.component("shuaiFooter",shuaiFooter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
