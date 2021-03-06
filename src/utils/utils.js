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
  let minutes = parseInt((time % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = (time % (1000 * 60)) / 1000;
  seconds = ~~seconds;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  let data = minutes + ":" + seconds;
  return data;
}

/** css滚动组件 */
export const scrollAnimation = (classname, time = 8, timeout = 1000) => {
  setTimeout(() => {
    if (classname && time) {
      let div;
      if (classname.indexOf("#") !== -1) {
        div = document.getElementById(classname.replace('#', ''));
      } else {
        div = document.getElementsByClassName(classname.replace('.', ''));
      }
      if ((div && div.length === 1) || div && div.clientWidth) {
        let timesj = time * 1000;
        let timetow = time + '900';
        let divdom = div[0] ? div[0] : div;
        if (divdom.clientWidth > divdom.parentNode.clientWidth ? divdom.clientWidth > divdom.parentNode.clientWidth : divdom.clientWidth > divdom.parentNode.parentNode.clientWidth) {
          let width = divdom.clientWidth - divdom.parentNode.clientWidth;
          divdom.style.position = 'relative';
          divdom.style.marginLeft = ~width + 'px';
          getComputedStyle(divdom).length;
          divdom.style.transition = `all ${time}s`;
          divdom.style.transitionTimingFunction = 'ease-in';
          setTimeout(
            () => {
              divdom.style.marginLeft = '0px';
              getComputedStyle(divdom).length;
              divdom.style.transition = `all 1s`;
              divdom.style.transitionTimingFunction = 'ease-in';
            },
            timesj
          );
          setTimeout(
            () => {
              divdom.style.marginLeft = '0px';
              getComputedStyle(divdom).length;
              divdom.style.transition = `all 1s`;
              divdom.style.transitionTimingFunction = 'ease-in';
              scrollAnimation(classname, time, 0);
            },
            timetow
          );
        }
      } else if (div && div.length >= 2) {
        let timesj = time * 1000;
        let timetow = time + '900';
        for (let i = 0; i < div.length; i++) {
          let item = div[i].clientWidth > div[i].parentNode.clientWidth ? div[i].parentNode.clientWidth : div[i].parentNode.parentNode.clientWidth;
          if (item < div[i].clientWidth) {
            let width = div[i].clientWidth - item;
            let doms = div[i].clientWidth < div[i].parentNode.clientWidth ? div[i].parentNode : (div[i].parentNode.clientWidth > div[i].parentNode.parentNode.clientWidth ? div[i].parentNode : div[i]);
            doms.style.position = 'relative';
            doms.style.marginLeft = ~(width + 60) + 'px';
            getComputedStyle(doms).length;
            doms.style.transition = `all ${time}s`;
            doms.style.transitionTimingFunction = 'ease-in';
            setTimeout(
              () => {
                doms.style.marginLeft = '0px';
                getComputedStyle(doms).length;
                doms.style.transition = `all 1s`;
                doms.style.transitionTimingFunction = 'ease-in';
              },
              timesj
            );
            setTimeout(
              () => {
                doms.style.marginLeft = '0px';
                getComputedStyle(doms).length;
                doms.style.transition = `all 1s`;
                doms.style.transitionTimingFunction = 'ease-in';
                scrollAnimation(classname, time, 0);
              },
              timetow
            );
          }
        }
      }
    }
  }, timeout)
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

/** 下载文件 */
export const download = (dom, type, name, url) => {
  fetch(url).then(res => res.blob()).then(blob => {
    // 使用获取到的blob对象创建的url
    const url = window.URL.createObjectURL(blob);
    dom.href = url;
    // 指定下载的文件名
    dom.download = `${name}.${type === 'mp4' ? 'mp4' : 'mp3'}`;
    return;
  });
}

/** 初始化css滚动组件 */
export const initscrollAnimation = (classname, timeout = 1000) => {
  setTimeout(() => {
    if (classname) {
      let div;
      if (classname.indexOf("#") !== -1) {
        div = document.getElementById(classname.replace('#', ''));
      } else {
        div = document.getElementsByClassName(classname.replace('.', ''));
      }
      if ((div && div.length === 1) || div && div.clientWidth) {
        let divdom = div[0] ? div[0] : div;
        divdom.style.marginLeft = '0px';
        getComputedStyle(divdom).length;
        divdom.style.transition = `all 1s`;
        divdom.style.transitionTimingFunction = 'ease-in';
      } else if (div && div.length >= 2) {
        for (let i = 0; i < div.length; i++) {
          div[i].style.marginLeft = '0px';
          getComputedStyle(div[i]).length;
          div[i].style.transition = `all 1s`;
          div[i].style.transitionTimingFunction = 'ease-in';
        }
      }
    }
  }, timeout)
}

/** 毫秒转换成年月日时分秒 */
export const timeconversionymdhms = (time) => {
  let t = new Date(time);
  let tf = function (i) {
    return (i < 10 ? '0' : '') + i
  };
  let formats = 'yyyy-MM-dd HH:mm:ss';
  return formats.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
    switch (a) {
      case 'yyyy':
        return tf(t.getFullYear());
        break;
      case 'MM':
        return tf(t.getMonth() + 1);
        break;
      case 'mm':
        return tf(t.getMinutes());
        break;
      case 'dd':
        return tf(t.getDate());
        break;
      case 'HH':
        return tf(t.getHours());
        break;
      case 'ss':
        return tf(t.getSeconds());
        break;
    }
  })
}