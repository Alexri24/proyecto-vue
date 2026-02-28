import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Categoria } from '../types'
import axios from 'axios'

export const useCategoryStore = defineStore('categories', () => {
  // 1. ESTADO: Empieza vacío
  const categorias = ref<Categoria[]>([])

  // 2. ACCIONES CON AXIOS
  const cargarCategorias = async () => {
    try {
      const respuesta = await axios.get('http://localhost:3000/categorias')
      categorias.value = respuesta.data
    } catch (error) {
      console.error('Error al cargar las categorías:', error)
    }
  }

  const agregarCategoria = async (nuevaCategoria: Omit<Categoria, 'id'>) => {
    try {
      const respuesta = await axios.post('http://localhost:3000/categorias', nuevaCategoria)
      categorias.value.push(respuesta.data)
    } catch (error) {
      console.error('Error al guardar la categoría:', error)
    }
  }

  const borrarCategoria = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/categorias/${id}`)
      categorias.value = categorias.value.filter(c => c.id !== id)
    } catch (error) {
      console.error('Error al borrar la categoría:', error)
    }
  }

  // 3. RETORNO
  return {
    categorias,
    cargarCategorias,
    agregarCategoria,
    borrarCategoria
  }
})