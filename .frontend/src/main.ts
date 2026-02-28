import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Importaciones de Vuetify obligatorias
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

app.use(createPinia()) // Activamos Pinia
app.use(router)        // Activamos las rutas
app.use(vuetify)       // Activamos Vuetify

app.mount('#app')