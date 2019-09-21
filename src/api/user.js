import axios from '../../axios/api.requset';

/** 手机登录 */
export const phonelogin = (phone, password) => {
  return axios.request({
    url: `/login/cellphone?countrycode=86&phone=${phone}&password=${password}`,
    method: 'post',
    dataType: 'json'
  })
}

/** 邮箱登录 */
export const emaillogin = (email,password) => {
  return axios.request({
    url: `/login?email=${email}&password=${password}`,
    method: 'get',
    dataType: 'json'
  })
}

/** 登录状态 */
export const loginstatus = () => {
  return axios.request({
    url: '/login/status',
    method: 'get',
    dataType: 'json'
  })
}

/** 刷新登录 */
export const shiftlogin = () => {
  return axios.request({
    url: '/login/refresh',
    method: 'get',
    dataType: 'json'
  })
}

/** 获取用户歌单、收藏、dj数量等 */
export const userdata = () => {
  return axios.request({
    url: '/user/subcount',
    method: 'post',
    dataType: 'json'
  })
}

/** 检测手机号是否注册 */
export const isregistered = (phone) => {
  return axios.request({
    url: `/cellphone/existence/check?phone=${phone}`,
    method: 'post',
    dataType: 'json'
  })
}

/** 发送验证码 */
export const phonecode = (code) => {
  return axios.request({
    url: `/captcha/sent?phone=${code}`,
    method: 'post',
    dataType: 'json'
  })
}

/** 注册账号 */
export const registerphone = (params) => {
  return axios.request({
    url: `/register/cellphone?phone=${params.phone}&password=${params.password}&captcha=${params.captcha}&nickname=${params.nickname}`,
    method: 'post',
    dataType: 'json'
  })
}

/** 验证验证码是否正确 */
export const iscode = (params) => {
  return axios.request({
    url: `/captcha/verify?phone=${params.phone}&captcha=${params.captcha}`,
    method: 'post',
    dataType: 'json'
  })
}

/** 找回密码 */
export const retrevepassword = (params) => {
  return axios.request({
    url: `/register/cellphone?phone=${params.phone}&password=${params.password}&captcha=${params.captcha}`,
    method: 'post',
    dataType: 'json'
  })
}

/** 获取用户详情 */
export const userinfo = (id) => {
  return axios.request({
    url: `/user/detail?uid=${id}`,
    method: 'post',
    dataType: 'json'
  })
}