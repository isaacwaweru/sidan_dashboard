import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import { auth } from '../firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import( /* webpackChunkName: "login" */ '../views/Home.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
   
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import( /* webpackChunkName: "login" */ '../views/Dashboard.vue')
      },
      {
        path: "agents",
        name: "Agents",
        component: () => import( /* webpackChunkName: "login" */ '../views/Agents.vue')
      },
      {
        path: "products",
        name: "Products",
        component: () => import( /* webpackChunkName: "login" */ '../views/Products.vue')
      },
      {
        path: "users",
        name: "Users",
        component: () => import( /* webpackChunkName: "login" */ '../views/Users.vue')
      },
      {
        path: "orders",
        name: "Orders",
        component: () => import( /* webpackChunkName: "login" */ '../views/Orders.vue')
      },
      {
        path: "customers",
        name: "Customers",
        component: () => import( /* webpackChunkName: "login" */ '../views/Customers.vue')
      },
      {
        path: "services",
        name: "Services",
        component: () => import( /* webpackChunkName: "login" */ '../views/Services.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( /* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import( /* webpackChunkName: "settings" */ '../views/Settings.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// navigation guard to check for logged in users
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
