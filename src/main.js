import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router';
import components from '../src/components/components'
import router from './router'
import './css/reset.less'
import store from './store/store';

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(components);

const RouterConfig = {
  mode: 'hash',
  routes: router
};
const routers = new VueRouter(RouterConfig);
routers.beforeEach((to, from, next) => {
  let cookie = window.localStorage.getItem('cookie');
  if (to.name != 'login' && !cookie) {
    next({name:'login'})
  }else{
    next();
  }
});
new Vue({
  el: '#app',
  store,
  router: routers,
  render: h => h(App)
})