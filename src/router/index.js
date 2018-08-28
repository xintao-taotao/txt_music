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
  },
  {
    path: '/music_gedan',
    name: 'music_xinxi',
    meta: {
      titleName: 'music_xinxi'
    },
    component: (resolve) => require(['../view/gedan/index.vue'], resolve)
  }
];
export default routers;