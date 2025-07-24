<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900 px-4">
    <div class="bg-gray-800 shadow-2xl rounded-xl px-8 py-8 w-full max-w-sm border border-gray-700">
      <h2 class="text-2xl font-bold mb-6 text-center text-emerald-400">Iniciar sesión</h2>

      <form @submit.prevent="login" class="space-y-5">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Correo electrónico</label>
          <input
            v-model="email"
            id="email"
            type="email"
            required
            class="input bg-gray-700 text-gray-200 placeholder-gray-400"
            placeholder="ejemplo@correo.com"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-300 mb-2">Contraseña</label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              id="password"
              required
              class="input bg-gray-700 text-gray-200 placeholder-gray-400 pr-10"
              placeholder="Tu contraseña"
            />
            <div class="absolute inset-y-0 right-0 flex items-center pr-3">
              <input
                type="checkbox"
                id="showPwd"
                v-model="showPassword"
                class="h-4 w-4 text-emerald-500 bg-gray-700 rounded"
              />
              <label for="showPwd" class="ml-2 text-xs text-gray-400">Ver</label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          class="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition font-medium"
        >
          Entrar
        </button>
      </form>

      <div class="text-center mt-5">
        <a href="/inicio" class="text-sm text-emerald-400 hover:text-emerald-300 hover:underline transition">← Volver al inicio</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const router = useRouter()

const login = async () => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
      email: email.value,
      password: password.value
    })

    localStorage.setItem('token', res.data.token)
    router.push('/leads')
  } catch (e) {
    alert('Credenciales inválidas')
  }
}
</script>

<style scoped>
.input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #4b5563;
  border-radius: 0.5rem;
  outline: none;
  font-size: 0.95rem;
  transition: all 0.3s;
}
.input:focus {
  border-color: #10b981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}
</style>