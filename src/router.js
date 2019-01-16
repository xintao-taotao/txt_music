const routers = [{
  path: '/',
  redirect: '/home',
}, {
  path: '/home',
  name: '首页',
  component: (resolve) => require(['./views/home/index.vue'], resolve)
}]

export default routers; 