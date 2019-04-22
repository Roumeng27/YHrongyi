import Vue from 'vue'
import VueRouter from 'vue-router'
import route from './router.js'

var router = new VueRouter({
  routes: route
})
Vue.use(VueRouter)
export default router
