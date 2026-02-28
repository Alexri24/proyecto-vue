<script setup lang="ts">
import { ref } from 'vue'
import { useGameStore } from '../stores/gameStore'
import type { Videojuego } from '../types'

const gameStore = useGameStore()

// Variables para controlar la ventanita (Modal)
const modalAbierto = ref(false)
const juegoEditando = ref<Videojuego>({ id: 0, titulo: '', precio: 0, stock: 0, categoriaId: 1, imagen: '' })

// Función para abrir la ventana con los datos cargados
const abrirModal = (juego: Videojuego) => {
  juegoEditando.value = { ...juego } // Hacemos una copia para no cambiar la tabla hasta guardar
  modalAbierto.value = true
}

// Función para guardar y cerrar
const guardarEdicion = async () => {
  await gameStore.actualizarJuego(juegoEditando.value.id, juegoEditando.value)
  modalAbierto.value = false // Cerramos el modal
}
</script>

<template>
  <v-card title="Inventario de Videojuegos" flat border>
    <v-table>
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
        <tr v-for="juego in gameStore.juegos" :key="juego.id">
          <td>{{ juego.id }}</td>
          <td>{{ juego.titulo }}</td>
          <td>{{ juego.precio }} €</td>
          <td>
            <v-chip :color="juego.stock > 0 ? 'success' : 'error'" size="small">
              {{ juego.stock }}
            </v-chip>
          </td>
          <td>
            <v-btn color="primary" size="small" variant="text" class="mr-2" @click="abrirModal(juego)">Editar</v-btn>
            <v-btn color="error" size="small" variant="text" @click="gameStore.borrarJuego(juego.id)">Borrar</v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>

    <v-dialog v-model="modalAbierto" max-width="500px">
      <v-card>
        <v-card-title class="bg-primary text-white">Editar Videojuego</v-card-title>
        
        <v-card-text class="pt-4">
          <v-text-field v-model="juegoEditando.titulo" label="Título"></v-text-field>
          <v-text-field v-model="juegoEditando.precio" label="Precio (€)" type="number"></v-text-field>
          <v-text-field v-model="juegoEditando.stock" label="Stock" type="number"></v-text-field>
          <v-text-field v-model="juegoEditando.imagen" label="URL de la Imagen"></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" variant="text" @click="modalAbierto = false">Cancelar</v-btn>
          <v-btn color="primary" variant="flat" @click="guardarEdicion">Guardar Cambios</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-card>
</template>