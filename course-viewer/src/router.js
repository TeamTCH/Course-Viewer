import Vue from 'vue'
import Router from 'vue-router'
import Programs from './views/Programs.vue'
import Administrator from './views/Administrator.vue'
import EditPrograms from './views/EditPrograms.vue'
import About from './views/About.vue'
import Classes from './views/Classes.vue'
import ProgramDetails from './views/ProgramDetails.vue'
import Representative from './views/Representative.vue'
import Login from './views/Login.vue'
import Staff from './views/StaffMember.vue'
import UserMessenger from './views/UserMessenger.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Programs,
      redirect: '/programs'
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
    },
    {
      path: '/programs/:id',
      name: 'program information',
      component: ProgramDetails
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
    },
    {
      path: '/representative',
      name: 'representative',
      component: Representative
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/staff',
      name: 'staff',
      component: Staff
    },
    {
      path: '/usermessenger',
      name: 'usermessenger',
      component: UserMessenger
    }

  ]
})
