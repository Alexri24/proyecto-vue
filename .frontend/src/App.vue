<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useGameStore } from './stores/gameStore'
import { useCategoryStore } from './stores/categoryStore' // 1. Importamos el store

const gameStore = useGameStore()
const categoryStore = useCategoryStore() // 2. Lo inicializamos

// onMounted se ejecuta automáticamente al cargar la web
onMounted(() => {
  gameStore.cargarJuegos()
  categoryStore.cargarCategorias() // 3. Pedimos las categorías al servidor
})
</script>

<template>
  <v-app>
    <RouterView />
  </v-app>
</template>

<style>
</style>