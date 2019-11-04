import Tinput from './input/index.vue';
import loading from './loading/loading.vue';
import Modal from './Modal/index.vue'

export default (Vue) => {
  Vue.component('Tinput', Tinput);
  Vue.component('loading', loading);
  Vue.component('TModal', Modal);
}