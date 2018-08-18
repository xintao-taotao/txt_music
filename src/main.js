import Vue from 'vue/dist/vue.common';
import App from './App';
import Routers from './router/index';
import VueRouter from 'vue-router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import mutu from './mutu/mutu';
import Locales from './language/locale';
import zhLocale from 'iview/src/locale/lang/zh-CN';
import enLocale from 'iview/src/locale/lang/en-US';
import VueI18n from 'vue-i18n';
import Vuex from 'vuex'

Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(Vuex);
Vue.use(iView);

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

router.afterEach(() => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});
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
      console.log('chufa');
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
  render: h => h(App)
});