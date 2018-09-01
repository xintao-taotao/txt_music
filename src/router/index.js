const routers = [
  {
    path: '/',
    name: 'home',
    meta: {
      titleName: 'home'
    },
    component: (resolve) => require(['../view/index/index.vue'], resolve),
    // children: [{
    //     path: '/home/',
    //     name: 'home',
    //     meta: {
    //         titleName: 'home'
    //     },
    //     component: (resolve) => require(['./views/home/index.vue'], resolve)
    // }]
  },
  {
    path: '/music',
    name: 'music',
    meta: {
      titleName: 'music'
    },
    component: (resolve) => require(['../view/music/index.vue'], resolve)
  }
];
export default routers;