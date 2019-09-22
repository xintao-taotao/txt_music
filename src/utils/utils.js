import _this from '../main';
import Cookies from 'js-cookie';

/** 根据路由PATH跳转 */
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

/** 获取cookie */
export const getCookie = (key) => {
  return Cookies.get(key);
};

/** 删除cookie */
export const rmCookie = (key) => {
  Cookies.remove(key)
};

/** 添加cookie */
export const setCookie = (key, value) => {
  Cookies.set(key, value)
};

/** 存储token */
export const setToken = (token) => {
  setCookie('token', encodeURIComponent(token));
};

/** 删除token */
export const removeToken = () => {
  rmCookie('token');
};

/** 获取token */
export const getToken = () => {
  return getCookie('token') ? getCookie('token') : (getCookie('token') == undefined ? undefined : null);
};

/** 改变网页title */
export const title = (title) => {
  document.title = title;
}

/** 判断是否是合格手机号 */
export const isphone = (pone) => {
  var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (!myreg.test(pone)) {
    return false;
  } else {
    return true;
  }
}

/** 判断是否是合格的邮箱 */
export const isemail = (email) => {
  let emails = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
  if (!emails.test(email)) {
    return false;
  } else {
    return true;
  }
}

/** 字符串转json对象 */
export const toJson = (str) => {
  try {
    let obj = JSON.parse(str)
    if (typeof obj == "object") {
      return obj;
    }
  } catch (e) {}
  return false;
};

/** 将歌曲时间转换成分秒 */
export const timeconversion = (time) => {
  let theTime = parseInt(time); /** 秒 */
  let middle = 0; /** 分 */
  let hour = 0; /** 小时 */
  if (theTime > 60) {
    middle = parseInt(theTime / 60);
    theTime = parseInt(theTime % 60);
    if (middle > 60) {
      hour = parseInt(middle / 60);
      middle = parseInt(middle % 60);
    }
  }
  let result = "" + parseInt(theTime);
  if (middle > 0) {
    result = "" + parseInt(middle) + ":" + result;
  }
  if (hour > 0) {
    result = "" + parseInt(hour) + ":" + result;
  }
  return result;
}

/** css滚动组件 */
export const scrollAnimation = (classname, time) => {
  if (classname && time) {
    let div;
    if (classname.indexOf("#") !== -1) {
      div = document.getElementById(classname.replace('#', ''));
    } else {
      div = document.getElementsByClassName(classname.replace('.', ''));
    }
    if (div) {
      let timesj = time * 1000;
      let timetow = time + '900';
      if (div.clientWidth > div.parentNode.clientWidth) {
        let width = div.clientWidth - div.parentNode.clientWidth;
        div.style.position = 'relative';
        div.style.marginLeft = ~width + 'px';
        getComputedStyle(div).length;
        div.style.transition = `all ${time}s`;
        setTimeout(
          () => {
            div.style.marginLeft = '0px';
            getComputedStyle(div).length;
            div.style.transition = `all 1s`;
          },
          timesj
        );
        setTimeout(
          () => {
            div.style.marginLeft = '0px';
            getComputedStyle(div).length;
            div.style.transition = `all 1s`;
            scrollAnimation(classname, time);
          },
          timetow
        );
      }
    } else if (div && div.length > 0) {
      let timesj = time * 1000;
      let timetow = time + '900';
      if (div[0].clientWidth > div[0].parentNode.clientWidth) {
        let width = div[0].clientWidth - div[0].parentNode.clientWidth;
        div[0].style.position = 'relative';
        div[0].style.marginLeft = ~width + 'px';
        getComputedStyle(div[0]).length;
        div[0].style.transition = `all ${time}s`;
        setTimeout(
          () => {
            div[0].style.marginLeft = '0px';
            getComputedStyle(div[0]).length;
            div[0].style.transition = `all 1s`;
          },
          timesj
        );
        setTimeout(
          () => {
            div[0].style.marginLeft = '0px';
            getComputedStyle(div[0]).length;
            div[0].style.transition = `all 1s`;
            scrollAnimation(classname, time);
          },
          timetow
        );
      }
    }
  }
}