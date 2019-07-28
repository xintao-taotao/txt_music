import Alert from "./index.vue";

import Vue from "vue";

//原始组件
let components = {
  modal: Alert
}

let instance = {}; //缓存组件的实例
let modal = {}; //组件的集合
let body = document.body || document.documentElement;
let root = document.createElement("div");
body.appendChild(root);

//初始化构造vue组件，并且注入自己的代码
const initComponents = function (type, options) {
  if (components[type]) {
    if (!instance[type]) {
      //避免重复的初始化
      let div = document.createElement('div');
      root.appendChild(div);
      const MessageBoxConstructor = Vue.extend(components[type]);
      instance[type] = new MessageBoxConstructor({
        el: div
      });
      instance[type].ok = function (){
        res();
        instance[type].visible = false;
      }
      instance[type].cancel = function (){
        rej();
        instance[type].visible = false;
      }
    }
    let ins = instance[type];
    //复制属性
    for (let i in options) {
      ins[i] = options[i];
    }
    Vue.nextTick(() => {
      ins.visible = true;
    })
    return new Promise(function (resolve, reject) {
      //注入当前的 promise
      ins._promise = {
        resolve,
        reject
      };
    }).finally(() => {
      //ins.visible = false;
      //可以在这里监听，不管结果如何，最后执行一段代码
    });
  } else {
    return Promise.reject("组件不存在");
  };
  // return new Promise((res, rej) => { //promise封装，ok执行resolve，no执行rejectlet
  //   let confirmDom = new confirmConstructor({   
  //     el: document.createElement('div')
  //   })
  //   document.body.appendChild(confirmDom.$el);  //new一个对象，然后插入body里面

  //   confirmDom.text = text;   //为了使confirm的扩展性更强，这个采用对象的方式传入，所有的字段都可以根据需求自定义
  //   confirmDom.ok = function () {
  //     res()
  //     confirmDom.isShow = false
  //   }
  //   confirmDom.close = function () {
  //     rej()
  //     confirmDom.isShow = false
  //   }

  // })
}

modal.Alert = function (content,title,type) {
  let options = {
    title: title ? title : '标题',
    content: content ? content : '',
    btn: type == 'prompt' ? ['确定','取消'] : '确定',
    type: type ? type : ''
  }
  return initComponents("modal", options);
}

export default {
  install(Vue) {
    Vue.prototype.$modal = modal;
  }
}