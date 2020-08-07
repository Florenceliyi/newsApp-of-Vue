import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import register from '../views/register.vue'
import home from '../views/home.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   redirect: '/home',

  // },
  {
    path: '/home',
    components: {
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

  }

]

const router = new VueRouter({

  routes
})

export default router