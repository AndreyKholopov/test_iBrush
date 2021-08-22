import Vue from "vue"
import App from "./App.vue"
import "./css/fonts.css"

Vue.prototype.$globalData = {
  client_id: "ceb469406ea5423b8ff9d5b94a09f335",
  client_secret: "2cfdb45333cc4a068ba6d41b5cd331d4",
  redirect_uri: "http://localhost:8080/",
}

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount("#app")
