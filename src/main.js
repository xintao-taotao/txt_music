// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router';
import components from '../src/components/components'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(components);

const RouterConfig = {
  mode: 'hash',
  routes: router
};
const routers = new VueRouter(RouterConfig);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: routers,
  render: h => h(App)
})
