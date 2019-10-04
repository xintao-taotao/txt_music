import * as types from './mutation-types';

const matutaions = {
  [types.SET_CURRENTSONGID](state, currentsongId) {
    state.currentsongId = currentsongId;
  },
  [types.SET_SONGSCHEDULE](state, songschedule) {
    state.songschedule = songschedule;
  },
  [types.SET_PLAYSTATE](state, playstate) {
    state.playstate = playstate;
  },
  [types.SET_SONGINFO](state, songinfo) {
    state.songinfo = songinfo;
  },
  [types.SET_SONGCOUNT](state, songcount) {
    state.songcount = songcount;
  },
  [types.SET_PLAYERMODE](state, playermode) {
    state.playermode = playermode;
  },
  [types.SET_PLAYERLIST](state, playerlist) {
    state.playerlist = playerlist;
  },
  [types.SET_PLAYERVOLUME](state, playervolume) {
    state.playervolume = playervolume;
  },
}

export default matutaions;