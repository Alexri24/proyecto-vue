import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Videojuego } from '../types' 

export const useGameStore = defineStore('games', () => {
  // 1. ESTADO
  const juegos = ref<Videojuego[]>([
    { id: 1, titulo: 'The Legend of Zelda', categoriaId: 1, precio: 59.99, stock: 10, imagen: '' },
    { id: 2, titulo: 'Elden Ring', categoriaId: 2, precio: 49.99, stock: 5, imagen: '' }
  ])
  
  // 2. ACCIONES
  const agregarJuego = (nuevoJuego: Videojuego) => {
    juegos.value.push(nuevoJuego)
  }

  // NUEVO: Función para borrar un juego filtrando por su ID
  const borrarJuego = (id: number) => {
    juegos.value = juegos.value.filter(juego => juego.id !== id)
  }
  
  // 3. RETORNO (¡Asegúrate de exportar borrarJuego aquí abajo!)
  return {
    juegos,
    agregarJuego,
    borrarJuego
  }
})