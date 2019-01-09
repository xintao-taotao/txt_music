import App from './App';
import Routers from './router/index';
import Tcomponents from './view/components/components'

Vue.use(Tcomponents);
Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(Vuex);
Vue.config.productionTip = false

const RouterConfig = {
  mode: 'hash',
  routes: Routers
};
const router = new VueRouter(RouterConfig);
/* eslint-disable no-new */


const store = new Vuex.Store({
  state: {
    lang: '',
    menuList: ''
  },
  getters: {

  },
  actions: {

  }
});

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App),
  components: {
    App
  }
});