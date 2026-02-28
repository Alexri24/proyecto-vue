<script setup lang="ts">
import { useGameStore } from '../stores/gameStore'

// Conectamos con nuestro store de Pinia
const gameStore = useGameStore()
</script>

<template>
  <v-card title="Inventario de Videojuegos" flat>
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
            <v-chip :color="juego.stock > 5 ? 'success' : 'error'">
              {{ juego.stock }}
            </v-chip>
          </td>
          <td>
            <v-btn color="error" size="small" variant="text" @click="gameStore.borrarJuego(juego.id)">Borrar</v-btn>          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>