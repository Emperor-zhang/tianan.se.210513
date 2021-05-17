import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.url = "https://wb.jaas.ac.cn/SmallExePic/TianAn.SE.210513/img/"

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()