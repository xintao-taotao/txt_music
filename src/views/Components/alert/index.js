import Toast from './index.vue'
import Vue from 'vue'
let ToastCmp = Vue.extend(Toast)

function toast() {
  let VM = null;
  return function (title, text, time) {
    let oDiv = document.createElement('div')
    VM = new ToastCmp({
      el: oDiv
    })
    document.body.appendChild(VM.$el)
    VM.title = title;
    VM.text = text;
    setTimeout(() => {
      VM.show = false
    }, time ? time : 3000);
  }

  // let { title, content, btn} = options || {}
  // new ToastCmp({
  //   data() {
  //     return {
  //       title: title || "Tips",
  //       content: content || "contents here",
  //       btn: btn || "confirm",
  //       callback: () => {
  //         console.log('关闭按钮');
  //         this.show = false;
  //       }
  //     }
  //   }
  // })
}

export default {
  install: (Vue) => {
    Vue.prototype.$toast = toast
  },
  warning: (v) => {
    SHOW('warning', v)
  },
  success: (v) => {
    SHOW('success', v)
  }
}