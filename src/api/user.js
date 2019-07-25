import axios from '../../axios/api.requset';

//手机登录
export const phonelogin = (params) => {
  return axios.request({
    url: '/login/cellphone',
    method: 'get',
    dataType: 'json',
    data: params
  })
}

//手机登录
export const emaillogin = (params) => {
  return axios.request({
    url: '/login',
    method: 'get',
    dataType: 'json',
    data: params
  })
}