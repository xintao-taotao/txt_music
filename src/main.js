import Vue from 'vue';
import '../config/reset.css';
import App from './App.vue';
import store from './store';
import TXTComponents from '../src/views/Components/Components'
import VueRouter from 'vue-router';
import routers from './router.js';

Vue.config.productionTip = false
Vue.use(VueRouter);
//自制组件注册
Vue.use(TXTComponents);

const RouterConfig = {
  mode: 'hash',
  routes: routers
};
const router = new VueRouter(RouterConfig);

//路由拦截器
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  let userstate = document.cookie;
  if (to.name != 'login' && userstate.indexOf('token') == -1) {
    next({
      name: 'login'
    });
  } else {
    next();
  }
});

/* eslint-disable no-new */
let vue = new Vue({
  el: '#app',
  router: router,
  store,
  render: h => h(App)
});

export default vue;