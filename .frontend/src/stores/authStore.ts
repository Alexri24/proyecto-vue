import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  // Guardamos el usuario si el login es correcto
  const usuarioActual = ref(null)

  // Función que pregunta al servidor si el email y la contraseña coinciden
  const login = async (email: string, password: string) => {
    try {
      // json-server permite buscar directamente pasando los datos en la URL (?)
      const respuesta = await axios.get(`http://localhost:3000/usuarios?email=${email}&password=${password}`)
      
      // Si el servidor nos devuelve un array con datos, es que el usuario existe
      if (respuesta.data.length > 0) {
        usuarioActual.value = respuesta.data[0]
        return true // Login con éxito
      }
      return false // Credenciales falsas
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