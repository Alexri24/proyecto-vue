<script setup lang="ts">
/**
 * ════════════════════════════════════════════════════
 *  App.vue — El componente raíz de toda la aplicación
 * ════════════════════════════════════════════════════
 *
 * <script setup> es la forma moderna de escribir Vue 3 (Composition API).
 * Todo lo que importes o declares aquí (variables, funciones) 
 * está automáticamente disponible en el <template> de abajo.
 */

import { RouterView } from 'vue-router' // Componente especial del router
import { onMounted } from 'vue'         // Hook del ciclo de vida
import { useGameStore } from './stores/gameStore'
import { useCategoryStore } from './stores/categoryStore'

// 1. Instanciamos los stores que necesitamos
const gameStore = useGameStore()
const categoryStore = useCategoryStore()

/**
 * onMounted() es un "hook del ciclo de vida" de Vue.
 * Se ejecuta AUTOMÁTICAMENTE una única vez justo cuando el componente 
 * termina de cargarse en el navegador (se "monta" en el DOM).
 *
 * Aquí aprovechamos para pedirle al servidor todos los datos iniciales
 * (juegos y categorías) para que la tienda se llene nada más entrar.
 */
onMounted(() => {
  gameStore.cargarJuegos()
  categoryStore.cargarCategorias()
})
</script>

<template>
  <!-- v-app es el contenedor principal obligatorio de Vuetify.
       Controla el tema oscuro/claro y el diseño general de la página -->
  <v-app>
    <!-- RouterView es una "ventana mágica".
         Dependiendo de la URL, Vue Router dibuja aquí dentro 
         el componente correspondiente (HomeView, LoginView, etc.) -->
    <RouterView />
  </v-app>
</template>

<style>
/* 
  Estilos Globales:
  Como esto está en App.vue sin la palabra "scoped", 
  afectará a toda la página web.
*/
html, body, .v-application {
  /* Usamos la fuente premium 'Outfit' que importamos en index.html */
  font-family: 'Outfit', sans-serif !important;
  -webkit-font-smoothing: antialiased; /* Hace que el texto se vea más nítido */
}

/* Scrollbar (barra de desplazamiento) moderno y delgado */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: transparent; 
}
::-webkit-scrollbar-thumb {
  background: #888; 
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
</style>