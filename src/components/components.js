import songList from './songlist';
import Tinput from './input'

export default (Vue)=>{
    Vue.component('songList', songList);
    Vue.component('Tinput', Tinput);
}