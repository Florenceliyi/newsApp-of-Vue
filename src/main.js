import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/css/base.css"
import './assets/css/base.scss'
import 'animate.css'
import axios from 'axios'

import Vant from 'vant';
import 'vant/lib/index.css';
import {
  Dialog
} from 'vant';

Vue.use(Vant);

Vue.use(Dialog);


//使用axios发送请求
Vue.prototype.$axios = axios;


//axios基准地址
// axios.defaults.baseURL = 'http://127.0.0.1:3000';
axios.defaults.baseURL = 'http://itluoshuai.cn:3000';

// 创建一个修复图片地址的全局过滤器
Vue.filter('fixImgUrl', function (url) {
  console.log(url);

  const fullUrlReg = /^http/;
  if (fullUrlReg.test(url)) {
    return url
  } else {
    return axios.defaults.baseURL + url
  }
})


// 路由守卫,所有的跳转都会被拦截经过这里；
router.beforeEach((to, from, next) => {
  // 是否有token
  const hasToken = localStorage.getItem("Authorization");
  // console.log(to);
  // console.log(from);
  // 是否是个人中心页

  //判断是否要守卫的方法一；
  // const pageNeedAuth = ['/mycenter', '/edit'];
  // //只要to.path存在在这个数组中，则表示需要守卫的路由;
  // if (pageNeedAuth.indexOf(to.path) >= 0) {
  //   //判断是否有token
  // }

  //方法二：
  //to.meata.pageNeedAuth//查找路由元信息；
  if (to.path === '/mycenter' || to.path === '/mycenter/personalMsg') {
    if (hasToken) {
      return next();
    } else {
      // 没有token则跳转到登录页
      Dialog.alert({
        message: "ログインくださいねー",
        theme: 'round-button',
      }).then(() => {
        // on close
        console.log(111111);
      });
      return router.push("/login").catch(err => console.log(err))
    }
  }

  next();
})
// 添加请求拦截器
axios.interceptors.request.use((config) => {
  //config中保存了每次请求的各种具体信息，url，data，method等参数；

  // console.log(config);
  // console.log(config.url);
  //若是登录页是不带token值的
  if (localStorage.getItem('Authorization') && !config.headers.Authorization) {
    //自动带上token值；
    config.headers.Authorization = 'Bearer ' + localStorage.getItem("Authorization")
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
//对请求出现的错误处理进行响应拦截；
axios.interceptors.response.use(res => {
  //每次响应都会被拦截检查是否有错误信息;
  const {
    msg,
    status
  } = res.data;
  const errMsg = /^4\d{2}$/;
  if (msg && errMsg.test(status)) {
    //有错误弹出错误信息;
    Dialog.alert({
      message: msg,
      theme: 'round-button',
    }).then(() => {
      // on close
      localStorage.removeItem("Authorization");
      localStorage.removeItem('id');
    });
  }
  if (msg == '用户信息验证失败') {
    router.push('/login')
  }
  return res;

}, err => Promise.reject(err));

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')