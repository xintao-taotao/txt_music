const routers = [{
  path: '',
  redirect: {
    name: 'login',
  },
},{
  path: '/login',
  name: 'login',
  meta: {
    title: 'txt-music 登录'
  },
  component: (resolve) => require(['./views/login/index.vue'], resolve)
}]
export default routers;