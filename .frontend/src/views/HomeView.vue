<script setup lang="ts">
import MainLayout from '../layouts/MainLayout.vue'
import { useGameStore } from '../stores/gameStore'
import { ref, computed } from 'vue' // <-- NUEVO: Importamos ref y computed

const gameStore = useGameStore()

// <-- NUEVO: Variable para guardar lo que escribe el usuario
const busqueda = ref('') 

// <-- NUEVO: Filtramos los juegos automáticamente según lo que escriba
const juegosFiltrados = computed(() => {
  return gameStore.juegos.filter(juego => 
    juego.titulo.toLowerCase().includes(busqueda.value.toLowerCase())
  )
})
</script>

<template>
  <MainLayout>
    <v-container>
      <h1 class="text-h3 text-center mt-8 mb-4 font-weight-bold">Catálogo de Videojuegos</h1>

      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-text-field
            v-model="busqueda"
            label="🔍 Buscar videojuego por título..."
            variant="solo-filled"
            elevation="2"
            clearable
            class="mb-6"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col v-for="juego in juegosFiltrados" :key="juego.id" cols="12" sm="6" md="4" lg="3">
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

      <v-row v-if="juegosFiltrados.length === 0">
        <v-col class="text-center text-grey mt-4">
          <h3>No se han encontrado juegos con ese nombre 😢</h3>
        </v-col>
      </v-row>

    </v-container>
  </MainLayout>
</template>