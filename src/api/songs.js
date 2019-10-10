import axios from '../../axios/api.requset';

/** 歌手分类列表 */
export const songerlist = (cat = '1001', initial, limit) => {
  let url;
  if(cat && !initial && !limit){
    url = `/artist/list?cat=${cat}`
  }else if(initial && !car && !limit){
    url = `/artist/list?initial=${initial}`
  }else if(limit && !initial && !car){
    url = `/artist/list?limit=${limit}`
  }else if(cat && initial){
    url = `/artist/list?cat=${cat}&initial=${initial}`
  } else if(cat && limit){
    url = `/artist/list?cat=${cat}&limit=${limit}`
  } else if (initial && limit) {
    url = `/artist/list?initial=${initial}&limit=${limit}`
  } else if (cat && initial && limit) {
    url = `/artist/list?cat=${cat}&initial=${initial}&limit=${limit}`
  }
  return axios.request({
    url: url,
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

/** 查看歌曲是否可用 */
export const singerstatus = (id) => {
  return axios.request({
    url: `/check/music?id=${id}`,
    method: 'get',
    dataType: 'json'
  })
}

/** 获取音乐播放地址 */
export const singerurl = (id) => {
  return axios.request({
    url: `/song/url?id=${id}`,
    method: 'get',
    dataType: 'json'
  })
}

/** 获取音乐歌词 */
export const singerlyric = (id) => {
  return axios.request({
    url: `/lyric?id=${id}`,
    method: 'get',
    dataType: 'json'
  })
}
/** 获取歌曲详情信息 */
export const songerdetails = (id) => {
  return axios.request({
    url: `/song/detail?ids=${id}`,
    method: 'get',
    dataType: 'json'
  })
}