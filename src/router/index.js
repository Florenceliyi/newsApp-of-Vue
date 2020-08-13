import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import register from '../views/register.vue'
import home from '../views/home.vue'
import personCenter from '../views/mycenter/myCenter.vue'
import personalMsg from '../views/mycenter/personalMsg.vue'
import myFollowers from '../views/mycenter/myFollowers.vue'
import follow from '../views/mycenter/follow.vue'
import newsDetail from '../views/newsDetail.vue'
import videoDes from '../views/videoDes.vue'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/home',

  },
  //主页
  {
    path: '/home',
    components: {
      //"name"的名字：组件名
      home
    }
  },
  //登录页
  {

    path: "/login",
    components: {
      login
    }
  },
  //注册页
  {
    path: '/register',
    components: {
      register
    }

  },
  //个人中心页
  {
    path: '/mycenter',
    components: {
      personCenter
    },
    children: [{
      //个人编辑页
      path: 'personalMsg',
      component: personalMsg
    }]

  },
  //个人编辑页；
  {
    path: '/personalMsg',
    components: {
      personalMsg
    }
  },
  //个人关注页；
  {
    //我的关注页
    path: '/myFollowers',
    components: {
      myFollowers
    }
  },
  {
    path: '/follow',
    components: {
      follow
    }
  },
  {
    path: '/newsDetail',
    components: {
      newsDetail
    }
  }, {
    path: '/videoDes',
    components: {
      videoDes
    }
  }



]

const router = new VueRouter({

  routes
})

export default router