import songList from './songlist';
import Tbutton from './button'

export default (Vue)=>{
    Vue.component('songList', songList);
    Vue.component('Tbutton', Tbutton);
}