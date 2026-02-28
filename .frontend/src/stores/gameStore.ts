import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Videojuego } from '../types'
import axios from 'axios' // Importamos Axios para las peticiones

export const useGameStore = defineStore('games', () => {
  // 1. ESTADO: Ahora empieza vacío, los datos vendrán del servidor
  const juegos = ref<Videojuego[]>([])

  // 2. ACCIONES REALES CON LA BASE DE DATOS
  
  // OBTENER (GET): Pide los juegos al servidor
  const cargarJuegos = async () => {
    try {
      const respuesta = await axios.get('http://localhost:3000/juegos')
      juegos.value = respuesta.data // Guardamos los datos reales en nuestra variable
    } catch (error) {
      console.error('Error al cargar los juegos:', error)
    }
  }

  // AÑADIR (POST): Envía un nuevo juego al servidor
  const agregarJuego = async (nuevoJuego: Omit<Videojuego, 'id'>) => { // Omitimos el ID porque lo crea el servidor
    try {
      const respuesta = await axios.post('http://localhost:3000/juegos', nuevoJuego)
      juegos.value.push(respuesta.data) // Añadimos el juego devuelto (ya con su ID real) a la vista
    } catch (error) {
      console.error('Error al guardar el juego:', error)
    }
  }

  // BORRAR (DELETE): Le dice al servidor que borre un juego
  const borrarJuego = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/juegos/${id}`)
      juegos.value = juegos.value.filter(j => j.id !== id) // Lo quitamos de la vista si el servidor lo borró bien
    } catch (error) {
      console.error('Error al borrar el juego:', error)
    }
  }

  // 3. RETORNO
  return {
    juegos,
    cargarJuegos,
    agregarJuego,
    borrarJuego
  }
})