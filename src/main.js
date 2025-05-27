import './assets/main.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import Vue3JsonExcel from 'vue3-json-excel'

import { createApp } from 'vue'
import App from './App.vue'
// import router from './router'

const app = createApp(App)
// app.use(router)
app.use(Toast)
app.use(Vue3JsonExcel)
app.mount('#app')
