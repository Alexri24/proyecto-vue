/**
 * ════════════════════════════════════════════
 *  categoryStore.ts — Store de Categorías
 * ════════════════════════════════════════════
 *
 * Sigue exactamente el mismo patrón que gameStore:
 *   GET    → cargar categorías
 *   POST   → añadir categoría
 *   DELETE → borrar categoría
 *
 * Las categorías se usan para clasificar los videojuegos (Aventura, RPG, Deportes...)
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Categoria } from '../types' // Tipo: { id, nombre, descripcion }
import axios from 'axios'

export const useCategoryStore = defineStore('categories', () => {

  // ══════════════════
  //  1. ESTADO
  // ══════════════════
  // Array vacío al inicio, se llenará al llamar a cargarCategorias()
  const categorias = ref<Categoria[]>([])

  // ══════════════════════════════════════════
  //  2. ACCIONES CON AXIOS
  // ══════════════════════════════════════════

  /**
   * GET /categorias → Obtiene todas las categorías de la BD
   * Se llama en App.vue junto con cargarJuegos() al iniciar la app
   */
  const cargarCategorias = async () => {
    try {
      const respuesta = await axios.get('http://localhost:3000/categorias')
      categorias.value = respuesta.data
    } catch (error) {
      console.error('Error al cargar las categorías:', error)
    }
  }

  /**
   * POST /categorias → Crea una nueva categoría en la BD
   * Omit<Categoria, 'id'> → el id lo genera json-server automáticamente
   */
  const agregarCategoria = async (nuevaCategoria: Omit<Categoria, 'id'>) => {
    try {
      const respuesta = await axios.post('http://localhost:3000/categorias', nuevaCategoria)
      // Añadimos la categoría ya con su id al array local → la tabla se actualiza
      categorias.value.push(respuesta.data)
    } catch (error) {
      console.error('Error al guardar la categoría:', error)
    }
  }

  /**
   * DELETE /categorias/:id → Borra una categoría por su id
   */
  const borrarCategoria = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/categorias/${id}`)
      // filter() devuelve todas EXCEPTO la borrada → la tabla se actualiza
      categorias.value = categorias.value.filter(c => c.id !== id)
    } catch (error) {
      console.error('Error al borrar la categoría:', error)
    }
  }

  // ══════════════════════════════════════════
  //  3. RETORNO
  // ══════════════════════════════════════════
  return {
    categorias,        // El array de categorías (estado)
    cargarCategorias,  // Carga inicial desde BD
    agregarCategoria,  // POST — crear
    borrarCategoria    // DELETE — borrar
  }
})