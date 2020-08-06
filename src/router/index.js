import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import register from '../views/register.vue'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login',
  },
  {

    path: "/login",
    components: {
      login: login
    }
  },
  {
    path: '/register',
    components: {
      register: register
    }

  }

]

const router = new VueRouter({

  routes
})

export default router