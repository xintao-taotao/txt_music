const routers = [{
  path: '/',
  redirect: '/home',
}, {
  path: '/home',
  name: 'home',
  title:'首页',
  component: (resolve) => require(['./views/main/index.vue'], resolve),
  // children: [{
  //     path: '/home',
  //     name: 'home',
  //     meta: {
  //         titleName: 'home.title'
  //     },
  //     component: (resolve) => require(['./views/home/index.vue'], resolve)
  // }]
}, {
  path: '/login',
  name: 'login',
  title:'登录',
  component: (resolve) => require(['./views/login/login.vue'], resolve)
}]

export default routers; 