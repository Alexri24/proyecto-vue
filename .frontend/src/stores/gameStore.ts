/**
 * ══════════════════════════════════════════════════
 *  gameStore.ts — Store de Pinia para los Videojuegos
 * ══════════════════════════════════════════════════
 *
 * CONCEPTO CLAVE: ¿Qué es un Store de Pinia?
 * Es una "caja de datos global" que cualquier componente
 * de la app puede leer o modificar. Sin Pinia, cada componente
 * tendría sus propios datos y no podrían compartirlos fácilmente.
 *
 * PATRÓN: Usamos el "Setup Store" de Pinia (estilo Composition API).
 *   - ref()      → datos reactivos (el estado)
 *   - computed() → datos derivados (calculados automáticamente)
 *   - funciones  → acciones que modifican el estado
 */

import { defineStore } from 'pinia'  // Función principal de Pinia para crear stores
import { ref } from 'vue'             // ref() para hacer datos reactivos
import type { Videojuego } from '../types' // Tipo TypeScript (solo para validación)
import axios from 'axios'             // Librería para hacer peticiones HTTP a la API

// ── defineStore('games', ...) ──
// 'games' es el nombre único de este store (ID interno de Pinia)
export const useGameStore = defineStore('games', () => {

  // ══════════════════
  //  1. ESTADO
  // ══════════════════
  // ref([]) → array vacío reactivo. Cuando cambie, Vue re-renderiza automáticamente.
  const juegos = ref<Videojuego[]>([])

  // ══════════════════════════════════════════
  //  2. ACCIONES — Peticiones HTTP con Axios
  // ══════════════════════════════════════════

  /**
   * GET /juegos → Carga todos los juegos de la base de datos
   * Se llama en App.vue al iniciar la aplicación
   */
  const cargarJuegos = async () => {
    try {
      // axios.get() devuelve una promesa. Con await esperamos la respuesta.
      const respuesta = await axios.get('http://localhost:3000/juegos')
      // Guardamos los datos en el estado. Esto actualiza la pantalla al instante.
      juegos.value = respuesta.data
    } catch (error) {
      console.error('Error al cargar los juegos:', error)
    }
  }

  /**
   * POST /juegos → Añade un juego nuevo a la base de datos
   * Omit<Videojuego, 'id'> → TypeScript: el nuevo juego NO lleva 'id' (lo genera la BD)
   */
  const agregarJuego = async (nuevoJuego: Omit<Videojuego, 'id'>) => {
    try {
      const respuesta = await axios.post('http://localhost:3000/juegos', nuevoJuego)
      // Tras guardarlo en BD, lo añadimos también al array local → la tabla se actualiza sola
      juegos.value.push(respuesta.data)
    } catch (error) {
      console.error('Error al guardar el juego:', error)
    }
  }

  /**
   * DELETE /juegos/:id → Elimina un juego por su ID
   */
  const borrarJuego = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/juegos/${id}`)
      // filter() devuelve un nuevo array SIN el juego borrado → la tabla se actualiza
      juegos.value = juegos.value.filter(j => j.id !== id)
    } catch (error) {
      console.error('Error al borrar el juego:', error)
    }
  }

  /**
   * PATCH /juegos/:id → Descuenta 1 unidad de stock cuando se tramita un pedido
   * PATCH (no PUT) porque solo modificamos UN campo, no el juego entero
   */
  const descontarStock = async (id: number, stockActual: number) => {
    try {
      // Math.max(0, ...) → el stock nunca baja de 0 (nunca negativo)
      const nuevoStock = Math.max(0, Number(stockActual) - 1)
      await axios.patch(`http://localhost:3000/juegos/${id}`, { stock: nuevoStock })
      // También actualizamos en local para que el admin vea el cambio sin recargar
      const index = juegos.value.findIndex(j => j.id === id)
      if (index !== -1) {
        // Spread operator {...} → copia el objeto y solo cambia el stock
        juegos.value[index] = { ...juegos.value[index], stock: nuevoStock }
      }
    } catch (error) {
      console.error('Error al descontar stock:', error)
    }
  }

  /**
   * PUT /juegos/:id → Reemplaza un juego completo (edición desde el modal del admin)
   * PUT (no PATCH) porque enviamos el objeto entero
   */
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

  // ══════════════════════════════════════════
  //  3. RETORNO — Lo que exponemos al exterior
  // ══════════════════════════════════════════
  // Solo lo que retornemos aquí estará disponible en los componentes
  return {
    juegos,          // El array de videojuegos (estado)
    cargarJuegos,    // Carga inicial desde BD
    agregarJuego,    // POST — crear
    borrarJuego,     // DELETE — borrar
    actualizarJuego, // PUT — editar completo
    descontarStock   // PATCH — editar un campo
  }
})