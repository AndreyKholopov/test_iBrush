import Vue from "vue"
import App from "./App.vue"
import "./css/fonts.css"

Vue.prototype.$globalData = {
  client_id: "ceb469406ea5423b8ff9d5b94a09f335",
  client_secret: "2cfdb45333cc4a068ba6d41b5cd331d4",
  redirect_uri: "http://localhost:8080/",
}

Vue.directive("click-outside", {
  bind: function(el, binding, vnode) {
    setTimeout(() => {
      el.clickOutsideEvent = function(event) {
        if (!(el === event.target || el.contains(event.target))) {
          vnode.context[binding.expression](event)
        }
      }
      document.body.addEventListener("click", el.clickOutsideEvent)
    }, 100)
  },
  unbind: function(el) {
    document.body.removeEventListener("click", el.clickOutsideEvent)
  },
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount("#app")
