<template>
  <div class="min-h-screen bg-gray-900 text-gray-200">
    <!-- Navbar -->
    <Navbar @logout="logout" />

    <!-- Leads Table -->
    <div class="p-6 max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-emerald-400 mb-6"></h1>

      <div class="overflow-x-auto bg-gray-800 shadow-2xl rounded-xl border border-gray-700">
        <table v-if="leads.length" class="w-full table-auto rounded-xl overflow-hidden">
          <thead class="bg-emerald-600 text-white">
            <tr>
              <th class="p-4 text-left font-medium">Nombre</th>
              <th class="p-4 text-left font-medium">Correo</th>
              <th class="p-4 text-left font-medium">Teléfono</th>
              <th class="p-4 text-left font-medium">Mensaje</th>
              <th class="p-4 text-left font-medium">Estado</th>
              <th class="p-4 text-left font-medium">Cambiar estado</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="lead in leads" 
              :key="lead.id" 
              class="border-t border-gray-700 hover:bg-gray-750 transition"
            >
              <td class="p-4">{{ lead.name }}</td>
              <td class="p-4">{{ lead.email }}</td>
              <td class="p-4">{{ lead.phone }}</td>
              <td class="p-4">{{ lead.message }}</td>
              <td class="p-4 capitalize font-medium" :class="{
                'text-emerald-400': lead.status === 'nuevo',
                'text-blue-400': lead.status === 'contactado',
                'text-red-400': lead.status === 'descartado'
              }">
                {{ lead.status }}
              </td>
              <td class="p-4">
                <select
                  v-model="lead.status"
                  @change="updateStatus(lead)"
                  class="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="nuevo">Nuevo</option>
                  <option value="contactado">Contactado</option>
                  <option value="descartado">Descartado</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <p v-else class="p-6 text-gray-400 text-center">No hay leads disponibles por el momento.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'

const leads = ref([])
const router = useRouter()

const fetchLeads = async () => {
  try {
    const res = await axios.get(import.meta.env.VITE_API_URL + '/leads', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })
    leads.value = res.data
  } catch (e) {
    router.push('/login')
  }
}

const updateStatus = async (lead) => {
  try {
    await axios.patch(`${import.meta.env.VITE_API_URL}/leads/${lead.id}`, {
      status: lead.status
    }, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })
  } catch (e) {
    console.error('Error al actualizar el estado', e)
  }
}

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

onMounted(fetchLeads)
</script>