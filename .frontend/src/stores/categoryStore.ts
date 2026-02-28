import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Categoria } from '../types' 

export const useCategoryStore = defineStore('categories', () => {
  // 1. ESTADO: Metemos 2 categorías de prueba
  const categorias = ref<Categoria[]>([
    { id: 1, nombre: 'Aventura', descripcion: 'Juegos de exploración y mundo abierto' },
    { id: 2, nombre: 'RPG', descripcion: 'Juegos de rol y desarrollo de personajes' }
  ])
  
  // 2. ACCIONES
  const agregarCategoria = (nuevaCategoria: Categoria) => {
    categorias.value.push(nuevaCategoria)
  }

  const borrarCategoria = (id: number) => {
    categorias.value = categorias.value.filter(c => c.id !== id)
  }
  
  // 3. RETORNO
  return {
    categorias,
    agregarCategoria,
    borrarCategoria
  }
})