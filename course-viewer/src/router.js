import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Programs from './views/Programs.vue'
import Administrator from './views/Administrator.vue'
import EditPrograms from './views/EditPrograms.vue'
import About from './views/About.vue'
import Classes from './views/Classes.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'programs',
      component: Programs
    },
    {
      path: '/classes',
      name: 'classes',
      component: Classes
    },
    {
      path: '/about',
      name: 'about',
      component: About
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/programs',
      name: 'programs',
      component: Programs,
      redirect: '/'
    },
    {
      path: '/administrator',
      name: 'administrator',
      component: Administrator
    },
    {
      path: '/editprograms',
      name: 'editprograms',
      component: EditPrograms
    }

  ]
})
