import axios from '../../axios/api.requset';

//手机登录
export const phonelogin = (phone, password) => {
  return axios.request({
    url: `/login/cellphone?countrycode=86&phone=${phone}&password=${password}`,
    method: 'post',
    dataType: 'json'
  })
}

//邮箱登录
export const emaillogin = (email,password) => {
  return axios.request({
    url: `/login?email=${email}&password=${password}`,
    method: 'get',
    dataType: 'json'
  })
}

//登录状态
export const loginstatus = () => {
  return axios.request({
    url: '/login/status',
    method: 'get',
    dataType: 'json'
  })
}

//刷新登录
export const shiftlogin = () => {
  return axios.request({
    url: '/login/refresh',
    method: 'get',
    dataType: 'json'
  })
}

//获取用户歌单、收藏、dj数量等
export const userdata = () => {
  return axios.request({
    url: '/user/subcount',
    method: 'post',
    dataType: 'json'
  })
}