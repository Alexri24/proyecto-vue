/**
 * ══════════════════════════════════════════
 *  cartStore.ts — Store del Carrito de Compra
 * ══════════════════════════════════════════
 *
 * DIFERENCIA con gameStore:
 * Este store NO hace llamadas a la API (axios).
 * El carrito es un estado TEMPORAL que vive solo en el navegador.
 * Al recargar la página, el carrito se vacía (comportamiento normal).
 *
 * CONCEPTOS USADOS:
 *   - ref()      → el array de items (estado mutable)
 *   - computed() → totalItems y precioTotal (se calculan solos)
 *   - splice()   → elimina un elemento de un array por índice
 *   - reduce()   → recorre el array sumando precios → total
 */

import { defineStore } from 'pinia'   // Para crear el store
import { ref, computed } from 'vue'    // ref para estado, computed para derivados
import type { Videojuego } from '../types' // Tipo del juego

export const useCartStore = defineStore('cart', () => {

  // ══════════════════
  //  1. ESTADO
  // ══════════════════
  // Array que guarda los juegos que el usuario ha añadido al carrito
  const items = ref<Videojuego[]>([])

  // ══════════════════
  //  2. ACCIONES
  // ══════════════════

  /**
   * Añade un juego al carrito.
   * push() → añade al final del array
   * No comprobamos duplicados para simplificar (lo normal sería sumar cantidad)
   */
  const agregarAlCarrito = (juego: Videojuego) => {
    items.value.push(juego)
  }

  /**
   * Elimina un juego del carrito por su posición (index).
   * splice(index, 1) → borra 1 elemento empezando en esa posición
   */
  const eliminarDelCarrito = (index: number) => {
    items.value.splice(index, 1)
  }

  /**
   * Vacía el carrito completamente (se usa tras tramitar el pedido)
   */
  const vaciarCarrito = () => {
    items.value = []
  }

  // ══════════════════════════════════════════════
  //  3. PROPIEDADES COMPUTADAS (computed)
  //  Se recalculan automáticamente cuando cambia 'items'
  // ══════════════════════════════════════════════

  /**
   * Número total de artículos en el carrito.
   * .length → propiedad nativa de los arrays
   */
  const totalItems = computed(() => items.value.length)

  /**
   * Precio total de todos los artículos.
   * reduce() recorre el array acumulando la suma:
   *   total = 0 → empieza en 0
   *   por cada juego: total = total + juego.precio
   * Number() → convierte a número (por si el precio viene como texto desde la BD)
   * toFixed(2) → redondea a 2 decimales → "59.98"
   */
  const precioTotal = computed(() => {
    return items.value.reduce((total, juego) => total + Number(juego.precio), 0).toFixed(2)
  })

  // ══════════════════════════════════════════
  //  4. RETORNO — Lo que exponemos al exterior
  // ══════════════════════════════════════════
  return {
    items,              // El array de juegos en el carrito
    agregarAlCarrito,   // Añadir un juego
    eliminarDelCarrito, // Quitar un juego por índice
    vaciarCarrito,      // Vaciar todo
    totalItems,         // Computed: número de artículos
    precioTotal         // Computed: precio total formateado
  }
})
