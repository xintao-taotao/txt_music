import axios from '../../axios/api.requset';

//手机登录
export const phonelogin = (phone, password) => {
  return axios.request({
    url: `/login/cellphone?phone=${phone}&password=${password}`,
    method: 'get',
    dataType: 'json'
  })
}

//邮箱登录
export const emaillogin = (params) => {
  return axios.request({
    url: '/login',
    method: 'get',
    dataType: 'json',
    data: params
  })
}

export const loginstatus = () => {
  return axios.request({
    url: '/login/status',
    method: 'get',
    dataType: 'json'
  })
}