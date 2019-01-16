import axios from '../axios/http'

export const getrecommend = ()=>{
  return axios.request({
    url: '/toplist/detail',
    method:'get'
  });
};