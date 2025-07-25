<template>
  <div class="bg-gray-900 text-gray-200 font-sans min-h-screen">
    <!-- Header -->
    <header class="bg-gray-800 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <h1 class="text-xl font-bold text-emerald-400">CRM</h1>
        <a href="/login" class="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition font-medium">
          Comenzar
        </a>
      </div>
    </header>

    <!-- Contact Form Section -->
    <div class="py-20 text-center">
      <h1 class="text-3xl font-bold text-white tracking-wide"> Formulario de Contacto</h1>
      <p class="text-sm text-gray-400 mt-2">Completa los campos a continuación y nos pondremos en contacto contigo.</p>
    </div>

    <form
      @submit.prevent="handleSubmit"
      class="w-full max-w-xl p-8 space-y-4 bg-gray-800 rounded-xl shadow-lg mx-auto mb-20"
    >
      <!-- Nombre -->
      <div>
        <label class="block text-sm font-medium mb-2 text-gray-300">Nombre completo:</label>
        <input
          v-model="form.name"
          required
          class="w-full bg-gray-700 border border-gray-600 text-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      <!-- Correo -->
      <div>
        <label class="block text-sm font-medium mb-2 text-gray-300">Correo:</label>
        <input
          v-model="form.email"
          type="email"
          required
          class="w-full bg-gray-700 border border-gray-600 text-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      <!-- Teléfono -->
      <div>
        <label class="block text-sm font-medium mb-2 text-gray-300">Teléfono:</label>
        <input
          v-model="form.phone"
          required
          class="w-full bg-gray-700 border border-gray-600 text-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      <!-- Mensaje -->
      <div>
        <label class="block text-sm font-medium mb-2 text-gray-300">Mensaje:</label>
        <textarea
          v-model="form.message"
          required
          rows="4"
          class="w-full bg-gray-700 border border-gray-600 text-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        ></textarea>
      </div>

      <!-- Términos y condiciones -->
      <div class="flex items-center space-x-3">
        <input
          type="checkbox"
          id="terms"
          v-model="form.acceptedTerms"
          class="h-4 w-4 text-emerald-500 bg-gray-700 border-gray-600 rounded focus:ring-emerald-500"
        />
        <label for="terms" class="text-sm text-gray-400">Acepto los</label>
        <button
          type="button"
          @click="showTerms = true"
          class="text-sm text-emerald-400 hover:text-emerald-300 underline"
        >
          Términos y condiciones
        </button>
      </div>

      <!-- reCAPTCHA -->
      <div
        class="g-recaptcha mt-4"
        ref="recaptcha"
        :data-sitekey="recaptchaSiteKey"
      ></div>

      <!-- Botón de envío -->
      <button
        type="submit"
        class="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition font-medium"
      >
        Enviar
      </button>

      <!-- Mensajes de respuesta -->
      <p v-if="success" class="text-emerald-400 mt-2">✅ Enviado correctamente</p>
      <p v-if="error" class="text-red-400 mt-2">❌ {{ error }}</p>
    </form>

    <!-- Modal de Términos -->
    <div
      v-if="showTerms"
      class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
    >
      <div class="bg-gray-800 p-8 rounded-xl max-w-lg w-full shadow-lg overflow-y-auto max-h-[80vh] border border-gray-700">
        <h2 class="text-lg font-semibold mb-4 text-white">Términos y Condiciones</h2>
        <p class="text-sm text-gray-300 mb-6">
          No me reprube profe :b
        </p>
        <div class="flex justify-end">
          <button
            @click="showTerms = false"
            class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="text-center text-sm text-gray-500 py-8 bg-gray-800">
    </footer>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import emailjs from 'emailjs-com'
import axios from 'axios'

const router = useRouter()

const emailjsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
const emailjsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const emailjsUserId = import.meta.env.VITE_EMAILJS_USER_ID

const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: '',
  acceptedTerms: false
})

const success = ref(false)
const error = ref('')
const showTerms = ref(false)

const recaptcha = ref(null)
const recaptchaWidgetId = ref(null)

const apiUrl = import.meta.env.VITE_API_URL
const recaptchaSiteKey = import.meta.env.VITE_SITE_KEY

if (!recaptchaSiteKey) {
  console.error('❌ No se encontró VITE_SITE_KEY en tu archivo .env')
}


onMounted(() => {
  const renderCaptcha = () => {
    if (
      window.grecaptcha &&
      recaptcha.value &&
      recaptcha.value.children.length === 0 &&
      recaptchaWidgetId.value === null
    ) {
      recaptchaWidgetId.value = grecaptcha.render(recaptcha.value, {
        sitekey: recaptchaSiteKey
      })
    }
  }

  if (window.grecaptcha) {
    renderCaptcha()
  } else {
    const interval = setInterval(() => {
      if (window.grecaptcha) {
        renderCaptcha()
        clearInterval(interval)
      }
    }, 300)
  }
})

const handleSubmit = async () => {
  if (!form.acceptedTerms) {
    error.value = 'Debes aceptar los términos y condiciones.'
    return
  }

  if (!window.grecaptcha || recaptchaWidgetId.value === null) {
    error.value = 'reCAPTCHA aún no está listo.'
    return
  }

  const recaptchaToken = grecaptcha.getResponse(recaptchaWidgetId.value)
  if (!recaptchaToken) {
    error.value = 'Completa el reCAPTCHA antes de continuar.'
    return
  }

  try {
    const res = await axios.post(
    'https://crm-back-00mt.onrender.com/api/contact',
    {
      ...form,
      recaptchaToken
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )


    if (res.ok) {
      success.value = true
      error.value = ''
      grecaptcha.reset(recaptchaWidgetId.value)

      await emailjs.send(
        emailjsServiceId,
        emailjsTemplateId,
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message
        },
        emailjsUserId
      )

      Object.assign(form, {
        name: '',
        email: '',
        phone: '',
        message: '',
        acceptedTerms: false
      })
    } else {
      error.value = 'Error al enviar. Intenta más tarde.'
    }
  } catch (e) {
    error.value = 'Error de red: ' + e.message
  }
}
</script>