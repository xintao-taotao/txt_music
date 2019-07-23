import _this from '../main';
import Cookies from 'js-cookie';

//根据路由PATH跳转
export const goPageByPath = (pageName, query, newWindow = false) => {
  let params = localStorage.getItem(pageName);
  localStorage.setItem(pageName, query ? JSON.stringify(query) : (params && params != '' ? params : ''));
  if (newWindow) {
    window.open(
      _this.$router.resolve({
        path: pageName,
        query: query
      }).href,
      "_blank"
    );
  } else {
    _this.$router.push({
      path: pageName,
      query: query
    });
  }
};

//获取cookie
export const getCookie = (key) => {
  return Cookies.get(key);
};

//删除cookie
export const rmCookie = (key) => {
  Cookies.remove(key)
};

//存储token
export const setToken = (token) => {
  setCookie('token', token);
};

//删除token
export const removeToken = () => {
  rmCookie('token');
};

//获取token
export const getToken = () => {
  return getCookie('token') ? getCookie('token') : (getCookie('token') == undefined ? undefined : null);
};

//改变网页title
export const title = (title) => {
  document.title = title;
}