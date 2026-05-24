<script setup lang="ts">
import { ref } from 'vue'
import { useGameStore } from '../stores/gameStore'
import { useAuthStore } from '../stores/authStore'
import type { Videojuego } from '../types'

const gameStore = useGameStore()
const authStore = useAuthStore()

const modalAbierto = ref(false)
const juegoEditando = ref<Videojuego>({ id: 0, titulo: '', precio: 0, stock: 0, categoriaId: 1, imagen: '' })

const abrirModal = (juego: Videojuego) => {
  juegoEditando.value = { ...juego }
  modalAbierto.value = true
}

const guardarEdicion = async () => {
  await gameStore.actualizarJuego(juegoEditando.value.id, juegoEditando.value)
  modalAbierto.value = false
}
</script>

<template>
  <div class="tabla-wrapper">
    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="juego in gameStore.juegos" :key="juego.id" class="data-row">
          <td><span class="id-badge">#{{ juego.id }}</span></td>
          <td class="font-weight-bold" style="color: #0f172a;">{{ juego.titulo }}</td>
          <td class="price-cell">{{ juego.precio }}€</td>
          <td>
            <v-chip
              :color="Number(juego.stock) > 0 ? 'success' : 'error'"
              size="small"
              variant="tonal"
              class="font-weight-bold"
            >
              {{ Number(juego.stock) > 0 ? juego.stock + ' uds.' : 'Agotado' }}
            </v-chip>
          </td>
          <td>
            <v-btn
              size="small"
              variant="tonal"
              color="primary"
              rounded="pill"
              class="text-none font-weight-bold mr-2"
              prepend-icon="mdi-pencil"
              @click="abrirModal(juego)"
            >
              Editar
            </v-btn>
            <v-btn
              v-if="authStore.usuarioActual?.rol === 'admin'"
              size="small"
              variant="tonal"
              color="error"
              rounded="pill"
              class="text-none font-weight-bold"
              icon="mdi-delete"
              @click="gameStore.borrarJuego(juego.id)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Modal Editar -->
  <v-dialog v-model="modalAbierto" max-width="480">
    <v-card rounded="xl" elevation="8">
      <div class="modal-header">
        <v-icon icon="mdi-pencil-circle" size="28" class="mr-3" />
        <span>Editar Videojuego</span>
      </div>
      <v-card-text class="pa-6">
        <v-text-field v-model="juegoEditando.titulo" label="Título" variant="outlined" rounded="lg" class="mb-3" density="comfortable" />
        <v-row>
          <v-col cols="6">
            <v-text-field v-model="juegoEditando.precio" label="Precio (€)" type="number" variant="outlined" rounded="lg" density="comfortable" />
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="juegoEditando.stock" label="Stock" type="number" variant="outlined" rounded="lg" density="comfortable" />
          </v-col>
        </v-row>
        <v-text-field v-model="juegoEditando.imagen" label="URL Imagen" variant="outlined" rounded="lg" density="comfortable" prepend-inner-icon="mdi-image-outline" />
      </v-card-text>
      <v-card-actions class="px-6 pb-6">
        <v-btn variant="text" class="text-none" @click="modalAbierto = false">Cancelar</v-btn>
        <v-spacer />
        <v-btn rounded="pill" class="text-none font-weight-bold save-btn" @click="guardarEdicion">
          Guardar Cambios
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
.price-cell {
  font-size: 1rem;
  font-weight: 800;
  color: #6366f1;
}

/* Modal */
.modal-header {
  display: flex;
  align-items: center;
  padding: 20px 24px 0;
  font-size: 1.15rem;
  font-weight: 900;
  color: #0f172a;
  background: linear-gradient(135deg, #6366f1, #3b82f6);
  color: white;
  padding: 20px 24px;
  border-radius: 20px 20px 0 0;
}
.save-btn {
  background: linear-gradient(135deg, #6366f1, #3b82f6) !important;
  color: white !important;
}
</style>