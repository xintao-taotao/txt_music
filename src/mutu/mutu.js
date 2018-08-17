import axios from 'axios';
import swal from "sweetalert";
import Locales from "../language/locale"

const lang = Locales[window.localStorage.lang || 'zh-CN'];
let util = {
  vue: ''
};

util.title = function (title) {
  window.document.title = title;
};
console.log(env);
const ajaxUrl = env === 'development' ?
  'http://127.0.0.1:9096' :
  env === 'production' ?
    'http://test.deepbrief.net' :
    'https://debug.url.com';
util.baseURL = ajaxUrl;
util.ajax = axios.create({
  baseURL: ajaxUrl,
  timeout: 90000,
  headers: {
    'Content-Type': 'application/json'
  }
});

util.ajax.interceptors.request.use((config) => {
  let params = !config.params ? {} : config.params;
  params['lan'] = !localStorage.getItem('lang') || localStorage.getItem('lang') === 'zh-CN' ? 'zh' : 'en';
  config.params = params;
  return config;
}, (error) => {
  util.error(lang['networkError']);
  return Promise.reject(error);
});
util.ajax.interceptors.response.use((res) => {
  if (res.data.code === '0002') {
    util.removeToken();
    window.location.reload();
  } else if (res.data.code != '0000') {
    util.error(res.data.message ? res.data.message : lang['dataError']);
  }
  return res.data;
}, (error) => {
  if (util.vue.loading) {
    util.vue.loading = false;
  }
  return Promise.reject(error);
});

util.success = function (arg, callback) {
  alertMsg(arg, "success", callback);
}

util.error = function (arg, callback) {
  alertMsg(arg, "error", callback);
}

util.warning = function (arg, callback) {
  alertMsg(arg, 'warning', callback);
}

util.info = function (arg, callback) {
  alertMsg(arg, 'info', callback);
}
