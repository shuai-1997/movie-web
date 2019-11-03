import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import reg from '@/pages/reg'
import logon from '@/pages/logon'
import details from '@/pages/details'
import cinema from '@/pages/cinema'
import seat from '@/pages/seat'
import user from '@/pages/user'
import order from '@/pages/order'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
    	path: '/reg',
      name: 'reg',
      component: reg
    },
    {
    	path: '/logon',
      name: 'logon',
      component: logon
    },
    {
    	path: '/details',
      name: 'details',
      component: details
    },
    {
    	path: '/cinema',
      name: 'cinema',
      component: cinema
    }
    ,
    {
    	path: '/seat',
      name: 'seat',
      component: seat
    },
    {
    	path: '/user',
      name: 'user',
      component: user
    },
    {
    	path: '/order',
      name: 'order',
      component: order
    }
  ]
})
