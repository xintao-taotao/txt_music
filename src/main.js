import Vue from 'vue';
import '../config/reset.css';
import App from './App.vue';
import CreateAPI from 'vue-create-api';
Vue.use(CreateAPI);
import Talert from './views/Components/talert';
Vue.createAPI(Talert, true);
//自制组件注册
import TXTComponents from '../src/views/Components/Components';
Vue.use(TXTComponents);
import { getToken } from 'utils/utils'
import store from './store';
import VueRouter from 'vue-router';
import routers from './router.js';
import axios from 'axios';
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload
//   {
//   error: '',
//   loading: ''
// }
);
axios.defaults.withCredentials = true;
Vue.config.productionTip = false;
Vue.use(VueRouter);

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
  if (to.name != 'login' && getToken() == undefined) {
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