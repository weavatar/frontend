import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import VueGtag from 'vue-gtag'
import { VueReCaptcha } from 'vue-recaptcha-v3'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(MotionPlugin)
app.use(
  VueGtag,
  {
    appName: 'WeAvatar',
    pageTrackerScreenviewEnabled: true,
    config: {
      id: 'G-BL3JX2SWLP'
    }
  },
  router
)
app.use(VueReCaptcha, {
  siteKey: '6Le4F_ElAAAAAC5kj2DWj6XPT3oFiKwLHSX4ZD7T',
  loaderOptions: {
    useEnterprise: true,
    useRecaptchaNet: true,
    autoHideBadge: true,
    customUrl: 'https://recaptcha.net/recaptcha/enterprise.js'
  }
})

app.mount('#app')
