import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '../router'
import { VueReCaptcha } from 'vue-recaptcha-v3'

const app = createApp(App) // 👈 crea la instancia de Vue

// Agrega reCAPTCHA a la app
app.use(VueReCaptcha, {
  siteKey: import.meta.env.VITE_SITE_KEY,
  loaderOptions: {
    useRecaptchaNet: true,
  },
})

app.use(router) // Agrega el router
app.mount('#app') // Monta la app
