import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router';
import components from '../src/components/components'
import router from './router'
import './css/reset.less'
import './css/animate.css';
import './css/element.css'
import store from './store/store';
import ElementUI from 'element-ui';
import {setTitle} from './views/public/util'

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(components);
Vue.use(ElementUI);

const RouterConfig = {
  mode: 'hash',
  routes: router
};
const routers = new VueRouter(RouterConfig);
routers.beforeEach((to, from, next) => {
  routers.options.routes.forEach(item=>{
    if(window.location.hash==='#'+item.path){
      setTitle(item.title);
    }
  })
  let cookie = window.localStorage.getItem('cookie');
  if (to.name != 'login' && !cookie) {
    next({name:'login'})
  }else{
    next();
  }
});
let vue = new Vue({
  el: '#app',
  store,
  router: routers,
  render: h => h(App)
})
export default vue;