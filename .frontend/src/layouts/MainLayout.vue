<script setup lang="ts">
import { useTheme } from 'vuetify' // <-- Importamos el controlador de temas

const theme = useTheme()

// Función que cambia entre claro y oscuro
const cambiarTema = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>

<template>
  <v-layout>
    <v-app-bar color="primary" elevation="3">
      <v-app-bar-title class="font-weight-black">🎮 GameStore</v-app-bar-title>
      
      <v-spacer></v-spacer>

      <v-btn to="/" variant="text">Tienda</v-btn>
      <v-btn to="/login" variant="text">Login</v-btn>

      <v-btn icon @click="cambiarTema" class="ml-2">
        <span class="text-h6">{{ theme.global.current.value.dark ? '☀️' : '🌙' }}</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <slot></slot> </v-main>

    <v-footer app border color="grey-lighten-4" class="text-center d-flex flex-column">
      <div class="mt-2">
        <strong>GameStore</strong> - Proyecto de Vue 3
      </div>
    </v-footer>
  </v-layout>
</template>