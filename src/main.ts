import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import baiduAnalytics from 'vue-baidu-analytics'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(MotionPlugin)
app.use(baiduAnalytics, {
  router: router,
  siteIdList: ['16b7dd95f598c4ddc6677b1dc4a7a490'],
  isDebug: false
})

app.mount('#app')
