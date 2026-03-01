import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import type { Usuario } from '../types' // ✨ NUEVO: Importamos el tipo Usuario

export const useAuthStore = defineStore('auth', () => {
  
  // ✨ NUEVO: Le decimos a TypeScript que esto puede ser un Usuario o estar vacío (null)
  const usuarioActual = ref<Usuario | null>(null)

  const login = async (email: string, password: string) => {
    try {
      const respuesta = await axios.get(`http://localhost:3000/usuarios?email=${email}&password=${password}`)
      
      if (respuesta.data.length > 0) {
        usuarioActual.value = respuesta.data[0]
        return true 
      }
      return false 
    } catch (error) {
      console.error('Error al conectar con el servidor', error)
      return false
    }
  }

  const logout = () => {
    usuarioActual.value = null
  }

  return {
    usuarioActual,
    login,
    logout
  }
})