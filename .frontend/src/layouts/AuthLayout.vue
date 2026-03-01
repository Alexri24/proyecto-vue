<script setup lang="ts">
import { useTheme } from 'vuetify'

const theme = useTheme()

const cambiarTema = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>

<template>
  <v-layout>
    <v-btn
      icon
      elevation="4"
      @click="cambiarTema"
      style="position: absolute; top: 16px; right: 16px; z-index: 1000;"
    >
      <span class="text-h6">{{ theme.global.current.value.dark ? '☀️' : '🌙' }}</span>
    </v-btn>

    <v-main>
      <slot></slot>
    </v-main>
  </v-layout>
</template>