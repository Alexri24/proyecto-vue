<script setup lang="ts">
import { useCategoryStore } from '../stores/categoryStore'

const categoryStore = useCategoryStore()
</script>

<template>
  <v-card title="Gestión de Categorías" class="mt-8" flat border>
    <v-table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="categoria in categoryStore.categorias" :key="categoria.id">
          <td>{{ categoria.id }}</td>
          <td><strong>{{ categoria.nombre }}</strong></td>
          <td>{{ categoria.descripcion }}</td>
          <td>
            <v-btn color="error" size="small" variant="text" @click="categoryStore.borrarCategoria(categoria.id)">Borrar</v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>