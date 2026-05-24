<script setup lang="ts">
import { useTheme } from 'vuetify'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const theme = useTheme()
const authStore = useAuthStore()
const router = useRouter()

const cambiarTema = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const cerrarSesion = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <v-layout>
    <!-- Navbar Admin — mismo estilo oscuro que el MainLayout -->
    <v-app-bar flat height="64" theme="dark" style="background: #0f0f1a; border-bottom: 1px solid rgba(255,255,255,0.07);">

      <v-app-bar-title>
        <div class="d-flex align-center">
          <v-icon icon="mdi-shield-crown" color="warning" size="24" class="mr-2" />
          <span class="text-h6 font-weight-black text-white" style="letter-spacing: -0.5px;">Panel Admin</span>
        </div>
      </v-app-bar-title>

      <v-spacer />

      <!-- Usuario logueado -->
      <v-chip
        v-if="authStore.usuarioActual"
        color="primary"
        variant="tonal"
        size="small"
        prepend-icon="mdi-account-circle"
        class="mr-4 font-weight-bold"
      >
        {{ authStore.usuarioActual.email }} · {{ authStore.usuarioActual.rol }}
      </v-chip>

      <v-btn to="/" variant="text" size="small" class="text-none mr-2" style="opacity:0.8;">
        <v-icon start icon="mdi-storefront" />
        Ver Tienda
      </v-btn>

      <v-btn icon size="40" class="mr-1" @click="cambiarTema">
        <v-icon :icon="theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night'" />
      </v-btn>

      <v-btn
        color="error"
        variant="tonal"
        size="small"
        rounded="pill"
        class="text-none font-weight-bold mr-3"
        prepend-icon="mdi-logout"
        @click="cerrarSesion"
      >
        Salir
      </v-btn>

    </v-app-bar>

    <v-main>
      <slot />
    </v-main>

  </v-layout>
</template>