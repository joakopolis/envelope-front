import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'
import { useAuthStore } from '@/stores/auth'
import '@/assets/styles/main.css'

const app = createApp(App)
app.use(createPinia())
const auth = useAuthStore()
auth.loadFromStorage()
// 👇 EXponer el store para debugging
window.authStore = auth
app.use(router)
app.mount('#app')
