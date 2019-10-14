import axios from '../../axios/api.requset';

/** 获取mv详情数据 */
export const mvdetail = (id) => {
  return axios.request({
    url: `/mv/detail?mvid=${id}`,
    method: 'get',
    dataType: 'json'
  })
}

/** 获取mv播放地址 */
export const mvurl = (id) => {
  return axios.request({
    url: `/mv/url?id=${id}`,
    method: 'get',
    dataType: 'json'
  })
}