/** getters封装--当前歌曲id */
export const currentsongId = state => state.currentsongId;
/** getters封装--当前播放进度 */
export const songschedule = state => state.songschedule;
/** getters封装--当前歌曲总长度 */
export const songcount = state => state.songcount;
/** getters封装--当前播放状态 */
export const playstate = state => state.playstate;
/** getters封装--当前歌曲信息 */
export const songinfo = state => state.songinfo;
/** getters封装--当前播放器播放模式，0表示列表循环播放，1表示随机播放，2表示单曲循环播放 */
export const playermode = state => state.playermode;
/** getters封装--当前播放器播放列表 */
export const playerlist = state => state.playerlist;
/** getters封装--当前播放器音量 */
export const playervolume = state => state.playervolume;
/** getters封装--播放列表显示状态 */
export const  playerliststatus = state => state.playerliststatus;
/** getters封装--音量调节显示状态 */
export const playervolumestatus = state => state.playervolumestatus;
/** getters封装--播放器显示状态 */
export const playerstatus = state => state.playerstatus;