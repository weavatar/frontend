import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import VueGtag from 'vue-gtag'

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

app.mount('#app')
