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
import myCollection from '../views/mycenter/myCollection.vue'
import lists from '../components/diguiUse.vue'
import myComments from '../views/mycenter/myComments.vue'
import moreComments from '../views/moreComments.vue'
import search from '../views/search.vue'
import tagManagement from '../views/mycenter/tagManagement.vue'

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
    path: '/myCenter',
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
  //测试添加关注页面；
  {
    path: '/follow',
    components: {
      follow
    }
  },
  //新闻详情页面
  {
    path: '/newsDetail',
    components: {
      newsDetail
    }
  },
  //视频详情页面
  {
    path: '/videoDes',
    components: {
      videoDes
    }
  },
  //我的收藏页面
  {
    path: '/myCollection',
    components: {
      myCollection
    }
  },
  //精彩跟帖页面
  {
    path: '/myComments',
    components: {
      myComments
    }
  },
  //更多跟帖页面
  {
    path: '/moreComments',
    components: {
      moreComments
    }
  },
  {
    path: '/search',
    components: {
      search
    }
  },
  {
    path: '/tagManagement',
    components: {
      tagManagement
    }
  },
  //递归练习页面
  {
    path: '/diguiUse',
    components: {
      lists
    }
  },




]

const router = new VueRouter({

  routes
})

export default router