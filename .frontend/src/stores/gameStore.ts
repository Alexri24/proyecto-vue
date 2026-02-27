import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Videojuego } from '../types' 

export const useGameStore = defineStore('games', () => {
  // 1. ESTADO
  const juegos = ref<Videojuego[]>([])
  
  // 2. ACCIONES
  // Función para añadir un juego nuevo al array
  const agregarJuego = (nuevoJuego: Videojuego) => {
    juegos.value.push(nuevoJuego)
  }
  
  // 3. RETORNO (¡No olvides exportar la función también!)
  return {
    juegos,
    agregarJuego
  }
})