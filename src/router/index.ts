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
import PrivacyView from '@/views/pages/PrivacyView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView,
      meta: {
        title: '退出'
      }
    },
    {
      path: '/doc',
      name: 'doc',
      component: DocView,
      meta: {
        title: '文档'
      }
    },
    {
      path: '/help',
      name: 'help',
      component: HelpView,
      meta: {
        title: '帮助'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: {
        title: '关于'
      }
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: PrivacyView,
      meta: {
        title: '隐私'
      }
    },
    {
      path: '/oauth/callback',
      name: 'oauth-callback',
      component: CallbackView,
      meta: {
        title: '登录中'
      }
    },
    {
      path: '/user/avatar',
      name: 'user-avatar',
      component: AvatarView,
      meta: {
        title: '头像'
      }
    },
    {
      path: '/user/info',
      name: 'user-info',
      component: InfoView,
      meta: {
        title: '账号信息'
      }
    },
    {
      name: '404',
      path: '/404',
      component: NotFoundView,
      meta: {
        title: '404'
      }
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
router.beforeEach((to) => {
  window.$loadingBar.start()

  if (to.meta.title) {
    document.title = String(to.meta.title + ' - WeAvatar')
  }
})
router.afterEach(() => {
  window.$loadingBar.finish()
})

export default router
