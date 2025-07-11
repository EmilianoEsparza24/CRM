<template>
  <div class="min-h-screen bg-green-100 text-gray-900">
    <!-- Navbar -->
    <Navbar @logout="logout" />

    <!-- Leads Table -->
    <div class="p-6 max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-green-700 mb-6">📋 Gestión de Leads</h1>

      <div class="overflow-x-auto bg-white shadow-lg rounded-lg border border-green-200">
        <table v-if="leads.length" class="w-full table-auto rounded overflow-hidden">
          <thead class="bg-green-600 text-white">
            <tr>
              <th class="p-3 text-left">Nombre</th>
              <th class="p-3 text-left">Correo</th>
              <th class="p-3 text-left">Teléfono</th>
              <th class="p-3 text-left">Mensaje</th>
              <th class="p-3 text-left">Estado</th>
              <th class="p-3 text-left">Cambiar estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="lead in leads" :key="lead.id" class="border-t hover:bg-green-50 transition">
              <td class="p-3">{{ lead.name }}</td>
              <td class="p-3">{{ lead.email }}</td>
              <td class="p-3">{{ lead.phone }}</td>
              <td class="p-3">{{ lead.message }}</td>
              <td class="p-3 capitalize font-medium text-green-700">{{ lead.status }}</td>
              <td class="p-3">
                <select
                  v-model="lead.status"
                  @change="updateStatus(lead)"
                  class="border border-green-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring focus:ring-green-200"
                >
                  <option value="nuevo">Nuevo</option>
                  <option value="contactado">Contactado</option>
                  <option value="descartado">Descartado</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <p v-else class="p-6 text-gray-600 text-center">No hay leads disponibles por el momento.</p>
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
