import axios from '../axios/http'

//手机号登录
export const login_phone = (phone,password) =>{
  return axios.request({
    url: '/login/cellphone',
    params: {
      phone: phone,
      password: password
    },
    method: 'get'
  })
}

//邮箱登录
export const login_email = (useremail,password) =>{
  return axios.request({
    url: '/login',
    params: {
      email: useremail,
      password: password
    },
    method: 'get'
  })
}