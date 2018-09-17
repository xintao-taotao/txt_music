import App from './App';
import Routers from './router/index';
import 'iview/dist/styles/iview.css';
import Locales from './language/locale';
import zhLocale from 'iview/src/locale/lang/zh-CN';
import enLocale from 'iview/src/locale/lang/en-US';

Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(Vuex);
const navLang = navigator.language;

const  localLang= (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;

const lang = window.localStorage.lang || localLang || 'zh-CN';

Vue.config.lang = lang;
const locales = Locales;
const mergeZH = Object.assign(zhLocale, locales['zh-CN']);
const mergeEN = Object.assign(enLocale, locales['en-US']);
Vue.locale('zh-CN', mergeZH);
Vue.locale('en-US', mergeEN);
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
  mutations: {
    switchLang(state, lang) {
      state.lang = lang;
      Vue.config.lang = lang;
      localStorage.setItem("lang", lang);
    },
    setPermissions(state, permissions) {

    }
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