<script setup lang="ts">
import MainLayout from '../layouts/MainLayout.vue'
import { useGameStore } from '../stores/gameStore'

// Conectamos con el store para leer los juegos
const gameStore = useGameStore()
</script>

<template>
  <MainLayout>
    <v-container>
      <h1 class="text-h3 text-center my-8 font-weight-bold">Catálogo de Videojuegos</h1>

      <v-row>
        <v-col v-for="juego in gameStore.juegos" :key="juego.id" cols="12" sm="6" md="4" lg="3">
          <v-card class="mx-auto h-100 d-flex flex-column" hover>
            
            <v-img
              :src="juego.imagen || 'https://cdn.vuetifyjs.com/images/cards/gaming.jpg'"
              height="200px"
              cover
            ></v-img>

            <v-card-title class="font-weight-bold">{{ juego.titulo }}</v-card-title>

            <v-card-subtitle class="text-h6 text-primary font-weight-black">
              {{ juego.precio }} €
            </v-card-subtitle>

            <v-card-text class="flex-grow-1">
              <v-chip :color="juego.stock > 0 ? 'success' : 'error'" size="small">
                {{ juego.stock > 0 ? 'En stock: ' + juego.stock : 'Agotado' }}
              </v-chip>
            </v-card-text>

            <v-card-actions>
              <v-btn color="primary" variant="flat" block :disabled="juego.stock === 0">
                Añadir al carrito
              </v-btn>
            </v-card-actions>
            
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </MainLayout>
</template>