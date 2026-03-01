import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Videojuego } from '../types'
import axios from 'axios'

export const useGameStore = defineStore('games', () => {
  // 1. ESTADO
  const juegos = ref<Videojuego[]>([])

  // 2. ACCIONES CON AXIOS
  const cargarJuegos = async () => {
    try {
      const respuesta = await axios.get('http://localhost:3000/juegos')
      juegos.value = respuesta.data
    } catch (error) {
      console.error('Error al cargar los juegos:', error)
    }
  }

  const agregarJuego = async (nuevoJuego: Omit<Videojuego, 'id'>) => {
    try {
      const respuesta = await axios.post('http://localhost:3000/juegos', nuevoJuego)
      juegos.value.push(respuesta.data)
    } catch (error) {
      console.error('Error al guardar el juego:', error)
    }
  }

  const borrarJuego = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/juegos/${id}`)
      juegos.value = juegos.value.filter(j => j.id !== id)
    } catch (error) {
      console.error('Error al borrar el juego:', error)
    }
  }

  // ✨ NUEVO: Función para actualizar en el servidor y en la vista
  const actualizarJuego = async (id: number, juegoEditado: Videojuego) => {
    try {
      const respuesta = await axios.put(`http://localhost:3000/juegos/${id}`, juegoEditado)
      
      // Buscamos el juego en nuestra lista y lo sustituimos por el nuevo
      const index = juegos.value.findIndex(j => j.id === id)
      if (index !== -1) {
        juegos.value[index] = respuesta.data
      }
    } catch (error) {
      console.error('Error al actualizar el juego:', error)
    }
  }

  // 3. RETORNO (Aquí es donde faltaba exportar actualizarJuego)
  return {
    juegos,
    cargarJuegos,
    agregarJuego,
    borrarJuego,
    actualizarJuego // <-- ¡Sin esto el botón de la tabla no funciona!
  }
})