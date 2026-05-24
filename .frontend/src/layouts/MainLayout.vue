<script setup lang="ts">
import { useTheme } from 'vuetify'
import { useCartStore } from '../stores/cartStore'
import { useI18n } from 'vue-i18n'

const theme = useTheme()
const cartStore = useCartStore()
const { t, locale } = useI18n()  // locale = idioma activo

const cambiarTema = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

// Alterna entre español e inglés
const cambiarIdioma = () => {
  locale.value = locale.value === 'es' ? 'en' : 'es'
}
</script>

<template>
  <v-layout>

    <!-- Navbar -->
    <v-app-bar flat height="64" theme="dark" style="background: #0f0f1a; border-bottom: 1px solid rgba(255,255,255,0.07);">

      <!-- Logo -->
      <v-app-bar-title>
        <router-link to="/" class="logo-link d-flex align-center text-decoration-none text-white">
          <v-icon icon="mdi-controller-classic" color="primary" size="28" class="mr-2" />
          <span class="text-h6 font-weight-black" style="letter-spacing: -0.5px;">GameStore</span>
        </router-link>
      </v-app-bar-title>

      <v-spacer />

      <!-- Links de navegación -->
      <v-btn to="/" variant="text" class="text-none font-weight-medium text-body-1 mr-1" style="opacity: 0.85;">
        {{ t('nav.store') }}
      </v-btn>
      <v-btn to="/login" variant="text" class="text-none font-weight-medium text-body-1 mr-3" style="opacity: 0.85;">
        {{ t('nav.login') }}
      </v-btn>

      <!-- Botón carrito con badge -->
      <v-btn to="/carrito" icon size="40" class="mr-1">
        <v-badge :content="cartStore.totalItems" :model-value="cartStore.totalItems > 0" color="error" floating>
          <v-icon icon="mdi-cart-outline" />
        </v-badge>
      </v-btn>

      <!-- Selector de idioma ES / EN -->
      <v-btn
        size="small"
        variant="tonal"
        class="text-none font-weight-black mr-1"
        style="min-width: 48px; font-size: 0.8rem; letter-spacing: 0.5px;"
        @click="cambiarIdioma"
      >
        {{ locale === 'es' ? '🇬🇧 EN' : '🇪🇸 ES' }}
      </v-btn>

      <!-- Toggle tema -->
      <v-btn icon size="40" class="mr-2" @click="cambiarTema">
        <v-icon :icon="theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night'" />
      </v-btn>

    </v-app-bar>

    <v-main>
      <slot />
    </v-main>

    <!-- Footer -->
    <v-footer app border="t" height="52" style="background: #0f0f1a; border-color: rgba(255,255,255,0.07) !important;">
      <div class="w-100 text-center text-body-2" style="color: rgba(255,255,255,0.4);">
        <v-icon icon="mdi-controller-classic" size="14" class="mr-1" />
        <strong style="color: rgba(255,255,255,0.7);">GameStore</strong>
        &nbsp;© {{ new Date().getFullYear() }} — {{ t('footer.tagline') }}
      </div>
    </v-footer>

  </v-layout>
</template>

<style scoped>
.logo-link {
  transition: opacity 0.2s ease;
}
.logo-link:hover {
  opacity: 0.8;
}
</style>