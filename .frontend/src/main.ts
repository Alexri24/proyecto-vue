/**
 * ════════════════════════════════════════════════
 *  main.ts — Punto de entrada de la aplicación
 * ════════════════════════════════════════════════
 *
 * Este es el PRIMER archivo que ejecuta Vue al arrancar.
 * Aquí se crea la app y se "conectan" todos los plugins:
 *   - Pinia    → gestión de estado global
 *   - Router   → navegación entre páginas
 *   - Vuetify  → librería de componentes UI
 *   - i18n     → internacionalización (traducciones)
 */

import { createApp } from 'vue'           // Función para crear la app Vue
import { createPinia } from 'pinia'       // Plugin de gestión de estado global
import { createI18n } from 'vue-i18n'     // Plugin de traducciones (ES/EN)
import { messages } from './i18n'         // Nuestros textos en español e inglés
import App from './App.vue'               // Componente raíz (el que engloba todo)
import router from './router'             // Las rutas de la app

// ── Importaciones de Vuetify ──
import 'vuetify/styles'                              // Estilos base de Vuetify
import '@mdi/font/css/materialdesignicons.css'       // Iconos MDI (mdi-cart, mdi-home...)
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'    // Todos los componentes (v-btn, v-card...)
import * as directives from 'vuetify/directives'    // Directivas (v-ripple, v-tooltip...)
import { aliases, mdi } from 'vuetify/iconsets/mdi' // Configuración del set de iconos

// ── Creación del plugin Vuetify con temas personalizados ──
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // Usamos Material Design Icons por defecto
    aliases,
    sets: { mdi },
  },
  // TEMAS: Definimos los colores para modo claro y modo oscuro
  theme: {
    defaultTheme: 'light', // Al arrancar, empieza en modo claro
    themes: {
      light: {
        colors: {
          primary: '#6366f1',    // Índigo/violeta — color principal de botones y acentos
          secondary: '#3b82f6',  // Azul — color secundario
          background: '#f8f9fc', // Fondo general gris muy claro
          surface: '#ffffff',    // Fondo de tarjetas (blanco)
          error: '#ef4444',      // Rojo para errores
          success: '#22c55e',    // Verde para éxitos
          warning: '#f59e0b',    // Ámbar para advertencias
        },
      },
      dark: {
        colors: {
          primary: '#818cf8',    // Índigo más claro (se ve bien sobre oscuro)
          secondary: '#60a5fa',  // Azul más claro
          background: '#0d0d1a', // Azul marino muy oscuro — fondo principal
          surface: '#16162a',    // Ligeramente más claro — fondo de tarjetas
          error: '#f87171',
          success: '#4ade80',
          warning: '#fbbf24',
        },
      },
    },
  },
})

// ── Creación del plugin i18n (internacionalización) ──
const i18n = createI18n({
  legacy: false,        // Modo moderno (Composition API) — obligatorio con Vue 3
  locale: 'es',         // Idioma inicial: español
  fallbackLocale: 'en', // Si una clave no existe en 'es', busca en 'en'
  messages,             // El objeto con todos los textos { es: {...}, en: {...} }
})

// ── Creación y montaje de la app ──
const app = createApp(App) // Creamos la instancia de la app con el componente raíz

app.use(createPinia()) // Registramos Pinia (gestión de estado)
app.use(router)        // Registramos el Router (navegación)
app.use(vuetify)       // Registramos Vuetify (componentes UI y temas)
app.use(i18n)          // Registramos vue-i18n (traducciones)

// mount('#app') → Vue toma control del <div id="app"> en index.html
app.mount('#app')