import { createRouter, createWebHistory } from 'vue-router'
import NotFoundView from '../views/pages/NotFoundView.vue'
import HomeView from '../views/pages/HomeView.vue'
import DocView from '../views/pages/DocView.vue'
import HelpView from '../views/pages/HelpView.vue'
import AboutView from '../views/pages/AboutView.vue'
import LoginView from '../views/auth/LoginView.vue'
import LogoutView from '../views/auth/LogoutView.vue'
import CallbackView from '../views/auth/CallbackView.vue'
import AvatarView from '../views/user/AvatarView.vue'
import InfoView from '../views/user/InfoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView
    },
    {
      path: '/doc',
      name: 'doc',
      component: DocView
    },
    {
      path: '/help',
      name: 'help',
      component: HelpView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/oauth/callback',
      name: 'oauth-callback',
      component: CallbackView
    },
    {
      path: '/user/avatar',
      name: 'user-avatar',
      component: AvatarView
    },
    {
      path: '/user/info',
      name: 'user-info',
      component: InfoView
    },
    {
      name: '404',
      path: '/404',
      component: NotFoundView
    },
    {
      path: '/:catchAll(.*)',
      redirect: {
        name: '404'
      }
    }
  ]
})

// 加载进度条
router.beforeEach(() => {
  window.$loadingBar.start()
})
router.afterEach(() => {
  window.$loadingBar.finish()
})

export default router
