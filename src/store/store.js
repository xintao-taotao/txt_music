import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
let store = new Vuex.Store({
    state:{
        ztcolor:"#1954CA"
    },
    getters:{
        getcolor(state){
            return state.ztcolor;
        }
    },
    actions:{
        setCityName({commit}, name){
            commit("setcolor", name);
        }
    },
    mutations:{
        setcolor(state, name){
            state.ztcolor = name;
        }
    }
});

export default store;