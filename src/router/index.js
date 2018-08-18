const routers = [{
  path: '/',
  name: 'home',
  meta: {
      titleName: 'home'
  },
  component: (resolve) => require(['../view/index/index.vue'], resolve)
}
];
export default routers;