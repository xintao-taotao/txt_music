import Tinput from './input/index.vue';
import plugin from "./modal/index";

export default (Vue) => {
  Vue.component('Tinput', Tinput);
  Vue.use(plugin);
}