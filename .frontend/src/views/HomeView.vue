<script setup lang="ts">
/**
 * ══════════════════════════════════════════════════
 *  HomeView.vue — La vista principal (el Catálogo)
 * ══════════════════════════════════════════════════
 */
import MainLayout from '../layouts/MainLayout.vue' // El layout que envuelve la página (Navbar + Footer)
import { useGameStore } from '../stores/gameStore'
import { useCartStore } from '../stores/cartStore'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n' // Hook de internacionalización

// 1. Extraemos 't' (la función de traducción) de i18n
const { t } = useI18n()

// 2. Activamos los stores
const gameStore = useGameStore()
const cartStore = useCartStore()

// 3. Estado local del componente (solo importa en esta vista)
// ref('') crea un "texto reactivo". Si el usuario escribe, esto cambia automáticamente.
const busqueda = ref('') 
const snackbar = ref(false)     // Controla si se ve o no el mensajito flotante inferior
const snackbarTitulo = ref('')  // El texto a mostrar en el mensajito

/**
 * 4. computed() → Variable calculada.
 * Filtra el array de juegos del store buscando el texto de 'busqueda'.
 * La magia de Vue: Si el usuario escribe algo en 'busqueda', 
 * esta función se re-ejecuta sola y actualiza la lista de la pantalla en tiempo real.
 */
const juegosFiltrados = computed(() =>
  gameStore.juegos.filter(j =>
    j.titulo.toLowerCase().includes(busqueda.value.toLowerCase())
  )
)

/**
 * 5. Función que se ejecuta al darle al botón "Añadir al carrito"
 */
const añadirAlCarrito = (juego: any) => {
  cartStore.agregarAlCarrito(juego) // Lo mete en el store temporal
  snackbarTitulo.value = juego.titulo // Prepara el texto del snackbar
  snackbar.value = true               // Lo hace visible
}
</script>

<template>
  <!-- Usamos nuestro MainLayout como envoltorio.
       Todo lo que pongamos dentro, irá a parar al <slot /> de MainLayout.vue -->
  <MainLayout>

    <!-- ═══ HERO (La parte grande de arriba) ═══ -->
    <section class="hero">
      <div class="hero-content">
        <!-- v-chip es un componente de Vuetify para hacer "píldoras" de texto -->
        <v-chip color="primary" variant="elevated" size="small" class="mb-4 font-weight-bold" prepend-icon="mdi-lightning-bolt">
          <!-- t('home.chip_new') busca el texto en i18n.ts (ES o EN) -->
          {{ t('home.chip_new') }}
        </v-chip>
        <h1 class="hero-title">
          {{ t('home.hero_title') }}<br>
          <span class="gradient-text">{{ t('home.hero_highlight') }}</span>
        </h1>
        <p class="hero-subtitle">{{ t('home.hero_sub') }}</p>

        <!-- Buscador. v-model="busqueda" enlaza el input con la variable reactiva 'busqueda'.
             Es un "two-way binding": si cambia el input, cambia la variable y viceversa. -->
        <v-text-field
          v-model="busqueda"
          :placeholder="t('home.search_placeholder')"
          prepend-inner-icon="mdi-magnify"
          variant="solo"
          rounded="pill"
          hide-details
          bg-color="rgba(255,255,255,0.97)"
          style="max-width: 520px; margin: 0 auto;"
          class="elevation-8"
        />

        <div class="hero-stats mt-8">
          <div class="stat">
            <!-- gameStore.juegos.length es el número total de juegos en el store -->
            <span class="stat-num">{{ gameStore.juegos.length }}</span>
            <span class="stat-label">{{ t('home.stat_titles') }}</span>
          </div>
          <div class="stat-divider" />
          <div class="stat">
            <span class="stat-num">3</span>
            <span class="stat-label">{{ t('home.stat_categories') }}</span>
          </div>
          <div class="stat-divider" />
          <div class="stat">
            <span class="stat-num">🚀</span>
            <span class="stat-label">{{ t('home.stat_shipping') }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ CATÁLOGO (Lista de juegos) ═══ -->
    <section class="catalog-section">
      <v-container style="max-width: 1280px;">

        <div class="d-flex align-center mb-8">
          <div>
            <h2 class="section-title">
              <!-- Operador ternario: si 'busqueda' tiene texto, muestra "Resultados para X", si no "Catálogo" -->
              {{ busqueda ? `${t('home.catalog_search_title')} "${busqueda}"` : t('home.catalog_title') }}
            </h2>
            <p class="text-medium-emphasis text-body-2 mt-1">
              {{ juegosFiltrados.length }}
              {{ juegosFiltrados.length === 1 ? t('home.games_available') : t('home.games_available_plural') }}
            </p>
          </div>
        </div>

        <!-- Grid de juegos (Sistema de 12 columnas) -->
        <v-row>
          <!-- v-for es como un bucle en HTML. 
               Por cada juego en 'juegosFiltrados', crea un <v-col>.
               El :key es obligatorio en Vue para saber qué elemento es cuál. -->
          <v-col
            v-for="juego in juegosFiltrados"
            :key="juego.id"
            cols="12" sm="6" md="4" lg="3"
          >
            <v-card class="game-card" rounded="xl" elevation="0">

              <!-- Imagen -->
              <div class="card-img-wrapper">
                <!-- :src se enlaza dinámicamente con la URL del juego -->
                <v-img :src="juego.imagen" height="210" cover class="card-img">
                  <!-- Fallback: Si la imagen falla (error 404), muestra el icono del mando -->
                  <template v-slot:error>
                    <div class="d-flex align-center justify-center fill-height" style="background: linear-gradient(135deg, #1a1a2e, #16213e);">
                      <v-icon color="rgba(255,255,255,0.3)" size="48">mdi-controller</v-icon>
                    </div>
                  </template>
                  <div class="img-gradient" />
                  
                  <!-- v-if="condición" renderiza este chip SOLO si el stock es 0 -->
                  <v-chip
                    v-if="Number(juego.stock) === 0"
                    color="error"
                    size="x-small"
                    class="ma-3 font-weight-bold"
                    style="position:absolute; top:0; right:0;"
                  >
                    {{ t('home.out_of_stock') }}
                  </v-chip>
                </v-img>
              </div>

              <!-- Info de la tarjeta -->
              <div class="card-content">
                <p class="card-label">{{ t('home.label_game') }}</p>
                <h3 class="card-title text-truncate">{{ juego.titulo }}</h3>

                <div class="card-footer">
                  <span class="card-price">{{ juego.precio }}€</span>
                  <v-chip
                    :color="Number(juego.stock) > 0 ? 'success' : 'error'"
                    size="x-small"
                    variant="tonal"
                  >
                    {{ Number(juego.stock) > 0 ? `${t('home.stock_label')}: ${juego.stock}` : t('home.no_stock') }}
                  </v-chip>
                </div>

                <!-- Botón de añadir al carrito. 
                     :disabled desactiva el clic si no hay stock.
                     @click="funcion()" llama a la función de JS al pulsar. -->
                <v-btn
                  color="primary"
                  block
                  rounded="pill"
                  class="add-btn text-none font-weight-bold mt-4"
                  prepend-icon="mdi-cart-plus"
                  :disabled="Number(juego.stock) === 0"
                  @click="añadirAlCarrito(juego)"
                >
                  {{ t('home.btn_add') }}
                </v-btn>
              </div>

            </v-card>
          </v-col>
        </v-row>

        <!-- v-if="juegosFiltrados.length === 0" renderiza esto si la búsqueda no encuentra nada -->
        <div v-if="juegosFiltrados.length === 0" class="text-center py-16">
          <v-icon size="64" color="grey-lighten-2" class="mb-4">mdi-magnify-close</v-icon>
          <h3 class="text-h5 font-weight-bold text-medium-emphasis">{{ t('home.no_results') }}</h3>
          <p class="text-medium-emphasis mt-2">{{ t('home.no_results_sub') }}</p>
        </div>

      </v-container>
    </section>

    <!-- Snackbar (la notificación flotante)
         v-model se enlaza a la variable booleana 'snackbar' para mostrarlo/ocultarlo. -->
    <v-snackbar v-model="snackbar" color="primary" location="bottom right" :timeout="2500" rounded="pill">
      <v-icon class="mr-2">mdi-check</v-icon>
      <strong>{{ snackbarTitulo }}</strong> {{ t('home.snackbar_added') }}
    </v-snackbar>

  </MainLayout>
</template>

<style scoped>
/* 
  <style scoped> asegura que el CSS de aquí solo afecte a HomeView.vue 
  y no se mezcle con otras páginas.
*/

/* ══ HERO ══ */
.hero {
  position: relative;
  min-height: 420px;
  background: linear-gradient(135deg, #0d0d1a 0%, #1a1a3e 40%, #0f2460 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%);
  pointer-events: none;
}
.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 60px 24px;
  width: 100%;
}
.hero-title {
  font-size: clamp(2.2rem, 5vw, 3.5rem); /* clamp() adapta el tamaño en móviles y en PC automáticamente */
  font-weight: 900;
  color: white;
  letter-spacing: -2px;
  line-height: 1.1;
  margin-bottom: 16px;
}
.gradient-text {
  background: linear-gradient(90deg, #6366f1, #3b82f6, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-subtitle {
  color: rgba(255,255,255,0.65);
  font-size: 1.05rem;
  margin-bottom: 28px;
}
.hero-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
}
.stat { display: flex; flex-direction: column; align-items: center; }
.stat-num { font-size: 1.4rem; font-weight: 900; color: white; }
.stat-label { font-size: 0.72rem; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 1px; }
.stat-divider { width: 1px; height: 36px; background: rgba(255,255,255,0.15); }

/* ══ CATÁLOGO ══ */
.catalog-section {
  padding: 56px 0;
  /* Usamos variables CSS (--v-theme-background) para soportar Modo Oscuro / Claro */
  background: rgb(var(--v-theme-background));
  min-height: 60vh;
}
.section-title {
  font-size: 1.7rem;
  font-weight: 900;
  letter-spacing: -0.5px;
  color: rgb(var(--v-theme-on-background));
}

/* ══ TARJETAS ══ */
.game-card {
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.game-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 48px rgba(0,0,0,0.13) !important;
}
.card-img-wrapper { overflow: hidden; position: relative; }
.card-img { transition: transform 0.4s ease; }
.game-card:hover .card-img { transform: scale(1.07); }
.img-gradient {
  position: absolute; bottom: 0; left: 0; right: 0;
  height: 60px;
  background: linear-gradient(to top, rgba(0,0,0,0.4), transparent);
}
.card-content { padding: 16px; }
.card-label { font-size: 0.6rem; font-weight: 700; letter-spacing: 1.5px; color: #6366f1; margin: 0 0 4px 0; }
.card-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: rgb(var(--v-theme-on-surface));
  margin: 0 0 8px 0;
}
.card-footer { display: flex; align-items: center; justify-content: space-between; }
.card-price { font-size: 1.4rem; font-weight: 900; color: #6366f1; }
.add-btn {
  letter-spacing: 0 !important;
  background: linear-gradient(135deg, #6366f1, #3b82f6) !important;
}
</style>