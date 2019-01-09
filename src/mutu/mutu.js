import swal from "sweetalert";
import Cookies from "js-cookie"

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
const ajaxUrl= 'http://localhost:3000';

util.baseURL = ajaxUrl;
util.ajax = axios.create({
  baseURL: ajaxUrl,
  timeout: 90000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials:true
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
      cancel: "取消",
      ok: {
        text: "确定",
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