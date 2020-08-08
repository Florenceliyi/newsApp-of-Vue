import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import register from '../views/register.vue'
import home from '../views/home.vue'
import personCenter from '../views/myCenter.vue'
import personalMsg from '../views/personalMsg.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   redirect: '/home',

  // },
  {
    path: '/home',
    components: {
      //"name"的名字：组件名
      home
    }
  },
  {

    path: "/login",
    components: {
      login
    }
  },
  {
    path: '/register',
    components: {
      register
    }

  },
  {
    path: '/mycenter',
    components: {
      personCenter
    }

  },
  {
    path: '/personalMsg',
    components: {
      personalMsg
    }
  }

]

const router = new VueRouter({

  routes
})

export default router