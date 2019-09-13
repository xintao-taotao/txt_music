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
}

export default matutaions;