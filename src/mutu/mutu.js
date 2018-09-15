import axios from 'axios';
import swal from "sweetalert";
import Locales from "../language/locale"
import env from '../config/env'
import Cookies from "js-cookie"
import func from './func'

const lang = Locales[window.localStorage.lang || 'zh-CN'];
let util = {
  vue: ''
};

util.title = function (title) {
  window.document.title = title;
};

util.setToken = function(token) {
  //, { expires: 1 / 48 }
  Cookies.set('token', encodeURIComponent(token));
  localStorage.setItem('token', encodeURIComponent(token));
}
util.getToken = function() {
  return Cookies.get('token') ? Cookies.get('token') : undefined;
}
util.removeToken = function() {
  Cookies.remove('token');
  localStorage.removeItem('token');
}

const ajaxUrl = env === 'development' ?
  'http://localhost:8081' :
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

util.setToken = function(token) {
  //, { expires: 1 / 48 }
  Cookies.set('token', encodeURIComponent(token));
  localStorage.setItem('token', encodeURIComponent(token));
}
util.getToken = function() {
  return Cookies.get('token') ? Cookies.get('token') : undefined;
}
util.removeToken = function() {
  Cookies.remove('token');
  localStorage.removeItem('token');
}

util.confirm = function (msg, ok, cancel) {
  swal({
    icon: 'warning',
    text: msg,
    buttons: {
      cancel: Locales[window.localStorage.lang || 'zh-CN']['btn_cancel'],
      ok: {
        text: Locales[window.localStorage.lang || 'zh-CN']['btn_ok'],
        value: 'ok'
      }
    },
    closeOnClickOutside: false
  }).then((val) => {
    switch (val) {
      case 'ok':
        if (ok) {
          ok();
        }
        break;
      default:
        if (cancel) {
          cancel();
        }
    }
  });
}

function alertMsg(arg, type, callback) {
  if (arg instanceof Object) {
    swal(arg).then((val) => {
      if (callback) {
        callback();
      }
    });
  } else {
    swal({
      text: arg,
      icon: type,
      buttons: false,
      closeOnClickOutside: false,
      timer: 2000
    }).then((val) => {
      if (callback) {
        callback();
      }
    });
  }
}
export default util;