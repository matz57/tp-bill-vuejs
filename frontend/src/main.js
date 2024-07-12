import './assets/main.scss'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

import AppDebug from '@/components/AppDebug.vue'
app.component(
  'AppDebug',
  AppDebug
)

app.mount('#app')
