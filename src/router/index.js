const routers = [
  {
    path: '/',
    name: 'home',
    meta: {
      titleName: 'home'
    },
    component: (resolve) => require(['../view/music/index.vue'], resolve),
  }
];
export default routers;