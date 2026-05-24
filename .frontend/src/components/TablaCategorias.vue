<script setup lang="ts">
import { useCategoryStore } from '../stores/categoryStore'

const categoryStore = useCategoryStore()
</script>

<template>
  <div class="tabla-wrapper">
    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="categoria in categoryStore.categorias" :key="categoria.id" class="data-row">
          <td><span class="id-badge">#{{ categoria.id }}</span></td>
          <td>
            <v-chip color="warning" variant="tonal" size="small" class="font-weight-bold">
              {{ categoria.nombre }}
            </v-chip>
          </td>
          <td class="text-medium-emphasis" style="font-size: 0.9rem;">{{ categoria.descripcion }}</td>
          <td>
            <v-btn
              size="small"
              variant="tonal"
              color="error"
              rounded="pill"
              class="text-none font-weight-bold"
              icon="mdi-delete"
              @click="categoryStore.borrarCategoria(categoria.id)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.tabla-wrapper {
  background: rgb(var(--v-theme-surface));
  border-radius: 16px;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  overflow: hidden;
}
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.92rem;
}
.data-table thead tr {
  background: rgb(var(--v-theme-background));
  border-bottom: 2px solid rgba(var(--v-border-color), var(--v-border-opacity));
}
.data-table th {
  padding: 14px 20px;
  text-align: left;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #64748b;
}
.data-row {
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  transition: background 0.15s ease;
}
.data-row:last-child { border-bottom: none; }
.data-row:hover { background: rgb(var(--v-theme-background)); }
.data-table td { padding: 14px 20px; vertical-align: middle; }

.id-badge {
  background: rgba(var(--v-theme-on-surface), 0.06);
  color: rgb(var(--v-theme-on-surface));
  font-size: 0.75rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  opacity: 0.7;
}
</style>