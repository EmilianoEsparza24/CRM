<template>
  <div class="min-h-screen flex items-center justify-center bg-green-100 px-4">
    <div class="bg-white shadow-lg rounded-lg px-8 py-6 w-full max-w-sm border border-green-200">
      <h2 class="text-2xl font-bold mb-6 text-center text-green-700">Iniciar sesión</h2>

      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
          <input
            v-model="email"
            id="email"
            type="email"
            required
            class="input"
            placeholder="ejemplo@correo.com"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              id="password"
              required
              class="input pr-10"
              placeholder="Tu contraseña"
            />
            <div class="absolute inset-y-0 right-0 flex items-center pr-3">
              <input
                type="checkbox"
                id="showPwd"
                v-model="showPassword"
                class="h-4 w-4 text-green-600"
              />
              <label for="showPwd" class="ml-2 text-xs text-gray-600">Ver</label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          class="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Entrar
        </button>
      </form>

      <div class="text-center mt-4">
        <a href="/" class="text-sm text-green-700 hover:underline">← Volver al inicio</a>
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
  padding: 0.6rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  outline: none;
  font-size: 0.95rem;
  transition: border-color 0.2s;
}
.input:focus {
  border-color: #16a34a; /* verde-600 */
  box-shadow: 0 0 0 1px #16a34a;
}
</style>
