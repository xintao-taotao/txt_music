import axios from '../../axios/api.requset';

//歌手分类列表
export const songerlist = (cat = '1001', initial) => {
  return axios.request({
    url: initial ? `/artist/list?cat=${cat}&initial=${initial}` : `/artist/list?cat=${cat}`,
    method: 'get',
    dataType: 'json'
  })
}

//热门歌手
export const hotsonger = (offset, limit = 30) => {
  return axios.request({
    url: `/top/artists?offset=${offset}&limit=${limit}`,
    method: 'get',
    dataType: 'json'
  })
}