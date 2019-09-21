import axios from '../../axios/api.requset';

/** 歌手分类列表 */
export const songerlist = (cat = '1001', initial) => {
  return axios.request({
    url: initial ? `/artist/list?cat=${cat}&initial=${initial}` : `/artist/list?cat=${cat}`,
    method: 'get',
    dataType: 'json'
  })
}

/** 热门歌手 */
export const hotsonger = (offset, limit = 30) => {
  return axios.request({
    url: `/top/artists?offset=${offset}&limit=${limit}`,
    method: 'get',
    dataType: 'json'
  })
}

/** 歌手详情 */
export const singerdetails = (id) => {
  return axios.request({
    url: `/artists?id=${id}`,
    method: 'get',
    dataType: 'json'
  })
}

/** 获取歌手专辑 */
export const singeralbum = (id) => {
  return axios.request({
    url: `/artist/album?id=${id}&limit=30`,
    method: 'get',
    dataType: 'json'
  })
}

/** 获取歌手单曲 */
export const singerlist = (id) => {
  return axios.request({
    url: `/artists?id=${id}`,
    method: 'get',
    dataType: 'json'
  })
}

/** 获取歌手mv */
export const singermvlist = (id) => {
  return axios.request({
    url: `/artist/mv?id=${id}`,
    method: 'get',
    dataType: 'json'
  })
}