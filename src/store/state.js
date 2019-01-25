import {playMode} from 'common/config'

const state = {
  //歌手
  singer: {},
  //歌曲是否正在播放
  playing: false,
  //播放器是否全屏
  fullScreen: false,
  //随机播放列表
  playlist:[],
  //顺序播放列表
  sequenceList:[],
  //播放模式
  mode: playMode.sequence,
  //当前播放歌曲的索引
  currentIndex: -1
}

export default state;