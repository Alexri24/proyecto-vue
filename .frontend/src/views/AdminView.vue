<script setup lang="ts">
import AdminLayout from '../layouts/AdminLayout.vue'
import TablaVideojuegos from '../components/TablaVideojuegos.vue'
import FormularioVideojuego from '../components/FormularioVideojuego.vue'
import TablaCategorias from '../components/TablaCategorias.vue' // <-- IMPORTAMOS LA NUEVA TABLA
</script>

<template>
  <AdminLayout>
    <v-container>
      <h2 class="mb-4">Panel de Administración</h2>
      
      <TablaVideojuegos />
      <FormularioVideojuego />

      <TablaCategorias />
      
    </v-container>
  </AdminLayout>
</template>