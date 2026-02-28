<script setup lang="ts">
import AdminLayout from '../layouts/AdminLayout.vue'
import TablaVideojuegos from '../components/TablaVideojuegos.vue'
import FormularioVideojuego from '../components/FormularioVideojuego.vue'
import TablaCategorias from '../components/TablaCategorias.vue'
import FormularioCategoria from '../components/FormularioCategoria.vue' // <-- NUEVO
</script>

<template>
  <AdminLayout>
    <v-container>
      <h2 class="mb-4 text-cyan-accent-4">Gestión de Videojuegos</h2>
      <TablaVideojuegos />
      <FormularioVideojuego />

      <v-divider class="my-8" color="cyan-accent-4"></v-divider>

      <h2 class="mb-4 text-cyan-accent-4">Gestión de Categorías</h2>
      <TablaCategorias />
      <FormularioCategoria /> </v-container>
  </AdminLayout>
</template>