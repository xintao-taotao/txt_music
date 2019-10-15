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
  } catch (e) { }
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

/** 解析歌词 */
export class Lyric {
  constructor(data) {
    this.data = data
    this.lrc = data['lrc']['lyric']
    this.tlyric = data['tlyric']['lyric']
    this.lrcMap = this.getLyricMap(this.lrc)
    this.finalLrcMap = this.convertProp(Object.assign({}, this.lrcMap))
    this.tlyricMap = this.getLyricMap(this.tlyric)
    this.finalTlyricMap = this.convertProp(Object.assign({}, this.tlyricMap))
  }
  getLyricMap(lrc) {
    let key, value, sIdx, eIdx, nsIdx
    let ret = {}
    if (!lrc || (typeof lrc !== 'string')) {
      return ret
    }
    while (lrc) {
      sIdx = lrc.indexOf('[')
      eIdx = lrc.indexOf(']') + 1;
      if (sIdx !== -1 && eIdx !== -1) {
        key = lrc.slice(sIdx, eIdx)
        advance(eIdx)
        nsIdx = lrc.indexOf('[')
        value = lrc.slice(0, nsIdx)
        ret[key] = value.trim()
        advance(nsIdx)
      } else {
        break
      }
    }

    function advance(n) {
      lrc = lrc.substring(n);
    }
    return ret
  }
  convertProp(obj) {
    Object.keys(obj).forEach((str) => {
      if (!obj[str]) {
        delete obj[str]
      } else {
        let prop = f(str)
        obj[prop] = obj[str]
        delete obj[str]
      }
    })

    function f(str) {
      str = str.match(/^\[(\d+):(\d+)\.(\d+)/)
      return Number(str[1]) * 60 * 1000 + Number(str[2]) * 1000 + Number(str[3])
    }
    return obj
  }
  getCurPlayLyric(audioCurTime) {
    let audioCurTimeMs = audioCurTime * 1000
    let arrTime = Object.keys(this.finalLrcMap)
    let i = 0,
      len = arrTime.length,
      idx
    let hasTranslate = Object.keys(this.finalTlyricMap).length > 0
    if (audioCurTimeMs === 0) {
      return g.call(this, arrTime[0])
    }
    if (audioCurTimeMs >= Number(arrTime[len - 1])) {
      return g.call(this, arrTime[len - 1])
    }
    for (; i < len; i++) {
      if (
        audioCurTimeMs >= Number(arrTime[i - 1]) &&
        audioCurTimeMs < Number(arrTime[i])
      ) {
        idx = i - 1
        break
      }
    }
    return g.call(this, arrTime[idx])

    function g(prop) {
      let o = {};
      if (hasTranslate) {
        o['value'] = v(this.finalLrcMap[prop]) + ('\n') + v(this.finalTlyricMap[prop]);
        o['key'] = prop
      } else {
        o['value'] = v(this.finalLrcMap[prop]);
        o['key'] = prop
      }
      return o;
    }

    function v(val) {
      return typeof val === 'undefined' ? '' : val
    }
  }
}

/** 将audio播放时间转换成秒 */
export const format = (interval) => {
  interval = interval | 0;
  const minute = interval / 60 | 0;
  const second = _pad(interval % 60);
  return `${minute}:${second}`;
}
/** 搭配audio转换秒方法 */
export const _pad = (num, n = 2) => {
  let len = num.toString().length;
  while (len < n) {
    num = '0' + num;
    len++;
  }
  return num;
}

/** javascript生成兼容性的css代码 */
export function prefixStyle(style) {
  let elementStyle = document.createElement('div').style
  let vendor = (() => {
    let transformNames = {
      webkit: 'webkitTransform',
      Moz: 'MozTransform',
      O: 'OTransform',
      ms: 'msTransform',
      standard: 'transform'
    }
    for (let key in transformNames) {
      if (elementStyle[transformNames[key]] !== undefined) {
        return key
      }
    }
    return false
  })()
  if (vendor === false) {
    return false
  }
  if (vendor === 'standard') {
    return style
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

/** 生成随机数随机播放歌曲 */
export const playerrandom = (arr) => {
  var len = arr.length;
  for (var i = 0; i < len - 1; i++) {
    var index = parseInt(Math.random() * (len - i));
    var temp = arr[index];
    arr[index] = arr[len - i - 1];
    arr[len - i - 1] = temp;
  }
  return arr;
}