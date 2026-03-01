<script setup lang="ts">
import { useTheme } from 'vuetify'
import { useAuthStore } from '../stores/authStore' // 1. Importamos el store
import { useRouter } from 'vue-router' // 2. Importamos el router para redirigir

const theme = useTheme()
const authStore = useAuthStore()
const router = useRouter()

const cambiarTema = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

// 3. Función para salir
const cerrarSesion = () => {
  authStore.logout() // Borramos el usuario de Pinia
  router.push('/login') // Lo mandamos al login
}
</script>

<template>
  <v-layout>
    <v-app-bar color="blue-grey-darken-4" elevation="4">
      <v-app-bar-title class="font-weight-bold text-cyan-accent-4">
        ⚙️ Panel de Control
      </v-app-bar-title>
      
      <v-spacer></v-spacer>

      <v-btn icon @click="cambiarTema" class="mr-4">
        <span class="text-h6">{{ theme.global.current.value.dark ? '☀️' : '🌙' }}</span>
      </v-btn>

      <v-btn to="/" variant="text" class="mr-2">Ver Tienda</v-btn>
      
      <v-btn color="error" variant="flat" class="mr-4" @click="cerrarSesion">
        Cerrar Sesión
      </v-btn>
    </v-app-bar>

    <v-main>
      <slot></slot>
    </v-main>
  </v-layout>
</template>