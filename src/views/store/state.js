const state = {
  /** 当前歌曲id */
  currentsongId: '',
  /** 当前播放进度 */
  songschedule: '',
  /** 当前歌曲总长度 */
  songcount: '',
  /** 当前播放状态 */
  playstate: false,
  /** 当前歌曲信息 */
  songinfo: {},
  /** 当前播放器播放模式，0表示列表循环播放，1表示随机播放，2表示单曲循环播放 */
  playermode: 0,
  /** 当前播放列表 */
  playerlist: [],
  /** 上一首歌id */
  prevsongerid: ''
}

export default state;