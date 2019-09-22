module.exports = {
  /** 设置html的rem */
  plugins: {
    'autoprefixer': {
      browsers: ["Android 4.1",
        "iOS 7.1",
        "Chrome > 31",
        "ff > 31",
        "ie >= 9"
      ]
    },
    'postcss-pxtorem': {
      rootValue: 16,/** 结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem */
      propList: ['*']
    }
  }
}
