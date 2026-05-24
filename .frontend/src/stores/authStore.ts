/**
 * ════════════════════════════════════════════
 *  authStore.ts — Store de Autenticación (Login)
 * ════════════════════════════════════════════
 *
 * PROPÓSITO: Gestionar la sesión del usuario.
 *   - Saber si hay alguien logueado
 *   - Guardar los datos del usuario (email, rol)
 *   - Manejar login y logout
 *
 * IMPORTANTE: El login NO usa JWT ni cookies.
 * Consulta directamente a json-server filtrando por email y password.
 * Esto es válido para un proyecto educativo, pero NO es seguro en producción.
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import type { Usuario } from '../types' // Tipo: { id, email, password, rol }

export const useAuthStore = defineStore('auth', () => {

  // ══════════════════════════════════════════════════════
  //  1. ESTADO
  //  Usuario | null → puede ser un objeto Usuario o "vacío"
  //  Empieza en null porque nadie está logueado al arrancar
  // ══════════════════════════════════════════════════════
  const usuarioActual = ref<Usuario | null>(null)

  // ══════════════════
  //  2. ACCIONES
  // ══════════════════

  /**
   * Intenta hacer login buscando el usuario en la BD.
   * GET /usuarios?email=X&password=Y → json-server filtra por esos campos
   * Retorna true si encontró usuario, false si no.
   */
  const login = async (email: string, password: string) => {
    try {
      // La URL con ?email=...&password=... filtra la lista de usuarios en json-server
      const respuesta = await axios.get(
        `http://localhost:3000/usuarios?email=${email}&password=${password}`
      )

      if (respuesta.data.length > 0) {
        // Si hay resultado, guardamos el primer usuario encontrado como "activo"
        usuarioActual.value = respuesta.data[0]
        return true  // Le decimos al componente que el login fue bien
      }
      return false   // Sin resultados → credenciales incorrectas
    } catch (error) {
      console.error('Error al conectar con el servidor', error)
      return false
    }
  }

  /**
   * Cierra la sesión limpiando el usuario activo.
   * Al poner null, el router guard detectará que no hay sesión
   * y bloqueará el acceso a /admin.
   */
  const logout = () => {
    usuarioActual.value = null
  }

  // ══════════════════════════════════════════
  //  3. RETORNO
  // ══════════════════════════════════════════
  return {
    usuarioActual, // null (sin sesión) o el objeto Usuario logueado
    login,         // Función async de autenticación
    logout         // Limpia la sesión
  }
})