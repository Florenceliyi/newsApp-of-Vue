import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/css/base.css"
import './assets/css/base.scss'
import 'animate.css'
import axios from 'axios'
import {
  Dialog
} from "vant";
// import VueAxios from 'vue-axios'

// Vue.use(VueAxios, axios)

//使用axios发送请求
Vue.prototype.$axios = axios;

Vue.config.productionTip = false

Vue.baseURL = Vue.prototype.$axios.defaults.baseURL = 'http://127.0.0.1:3000';

// Vue.prototype.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 添加请求拦截器
Vue.prototype.$axios.interceptors.request.use(function (config) {
  //config中保存了每次请求的各种具体信息，url，data，method等参数；

  console.log(config);
  // console.log(config.url);
  //若是没有token值，踢回登录页；
  config.headers.Authorization = localStorage.getItem("Authorization")
  //储存token的值；
  // console.log(config.headers.Authorization);
  // if (!config.headers.common["Authorization"]) {
  //   Dialog.alert({
  //     message: 'token不存在！',
  //     theme: "round-button",
  //   }).then(() => {
  //     // on close
  //   });
  //   location.href = 'http://192.168.79.61:8081/#/login';
  // }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')