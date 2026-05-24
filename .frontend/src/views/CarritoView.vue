<script setup lang="ts">
/**
 * ══════════════════════════════════════════════════
 *  CarritoView.vue — Pantalla del carrito de compra
 * ══════════════════════════════════════════════════
 */
import MainLayout from '../layouts/MainLayout.vue'
import { ref } from 'vue'
import { useCartStore } from '../stores/cartStore' // Store temporal local
import { useGameStore } from '../stores/gameStore' // Store principal conectado a BD
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Instanciamos los dos stores porque los vamos a necesitar a la vez
const cartStore = useCartStore()
const gameStore = useGameStore()

// Variables reactivas para el estado de la UI (Interfaz de Usuario)
const pedidoCompletado = ref(false) // Muestra el mensaje verde al final
const procesando = ref(false)       // Muestra la "ruedita" de carga en el botón

/**
 * Función principal del Checkout (Tramitar el pedido).
 * Tiene que ser 'async' porque contiene llamadas HTTP al backend (await).
 */
const tramitarPedido = async () => {
  procesando.value = true // Activa el loader en el botón para que el usuario espere
  
  // Recorremos los juegos que el usuario metió en el carrito
  for (const juego of cartStore.items) {
    // Por cada uno, le pedimos al backend que descuente el stock en la BD
    await gameStore.descontarStock(juego.id, juego.stock)
  }
  
  cartStore.vaciarCarrito() // Borra los items del store local
  procesando.value = false  // Quita el loader del botón
  pedidoCompletado.value = true // Enseña el mensajito verde "¡Pedido tramitado!"
}
</script>

<template>
  <MainLayout>
    <div class="cart-page">
      <v-container style="max-width: 1100px;" class="py-10">

        <!-- HEADER (Título de la página y botón volver) -->
        <div class="d-flex align-center mb-8">
          <div>
            <h1 class="page-title">{{ t('cart.title') }}</h1>
            <p class="text-medium-emphasis mt-1">
              {{ cartStore.totalItems }}
              <!-- t('...') carga el plural o singular en el idioma actual -->
              {{ cartStore.totalItems === 1 ? t('cart.articles') : t('cart.articles_plural') }}
            </p>
          </div>
          <v-spacer /> <!-- Elemento mágico de Vuetify que empuja el contenido hacia los lados -->
          <!-- El atributo 'to="/"' usa Vue Router para navegar sin recargar la web -->
          <v-btn to="/" variant="outlined" prepend-icon="mdi-arrow-left" class="text-none font-weight-bold" rounded="pill">
            {{ t('cart.keep_shopping') }}
          </v-btn>
        </div>

        <!-- 
          v-if / v-else:
          Vue comprueba la condición cartStore.totalItems > 0.
          Si es TRUE → renderiza el <v-row> (la tabla con productos).
          Si es FALSE → no lo renderiza, y renderiza en su lugar el <div class="empty-cart"> de abajo.
        -->
        <v-row v-if="cartStore.totalItems > 0" align="start">

          <!-- Columna Izquierda: Lista de productos -->
          <v-col cols="12" md="7">
            <!-- transition-group añade una animación CSS cuando se elimina un item (borrado del carrito) -->
            <transition-group name="slide-fade" tag="div">
              <!-- El bucle v-for crea una caja por cada item en el carrito -->
              <div
                v-for="(juego, index) in cartStore.items"
                :key="index"
                class="cart-item mb-4"
              >
                <!-- Imagen en miniatura -->
                <v-img :src="juego.imagen" width="110" height="90" cover rounded="lg" class="flex-shrink-0">
                  <template v-slot:error>
                    <div class="d-flex align-center justify-center fill-height" style="background:#1a1a2e;">
                      <v-icon color="rgba(255,255,255,0.3)">mdi-controller</v-icon>
                    </div>
                  </template>
                </v-img>

                <!-- Detalles del juego -->
                <div class="flex-grow-1 ml-4">
                  <p class="item-label">{{ t('cart.label_game') }}</p>
                  <h3 class="item-title">{{ juego.titulo }}</h3>
                  <v-chip size="x-small" color="success" variant="tonal" class="mt-1">
                    {{ t('cart.stock_label') }}: {{ juego.stock }}
                  </v-chip>
                </div>

                <!-- Bloque de Precio y Borrar -->
                <div class="d-flex flex-column align-end justify-center ml-4">
                  <span class="item-price mb-2">{{ juego.precio }}€</span>
                  <v-btn
                    icon="mdi-delete-outline"
                    size="small"
                    variant="tonal"
                    color="error"
                    @click="cartStore.eliminarDelCarrito(index)"
                  />
                </div>
              </div>
            </transition-group>
          </v-col>

          <!-- Columna Derecha: Tarjeta de Resumen (Sticky) -->
          <v-col cols="12" md="5">
            <div class="summary-card">
              <h2 class="summary-title">{{ t('cart.summary_title') }}</h2>
              <p class="text-body-2 text-medium-emphasis mt-1 mb-6">{{ t('cart.summary_sub') }}</p>

              <!-- El cartStore.precioTotal es una propiedad "computed" del store. 
                   Si borras un item, esto cambia solo al momento -->
              <div class="summary-row">
                <span>{{ t('cart.subtotal') }} ({{ cartStore.totalItems }})</span>
                <span class="font-weight-bold">{{ cartStore.precioTotal }}€</span>
              </div>
              <div class="summary-row mt-3 mb-4">
                <span>{{ t('cart.shipping') }}</span>
                <span class="text-success font-weight-bold">{{ t('cart.shipping_free') }}</span>
              </div>

              <v-divider class="my-4" /> <!-- Línea separadora -->

              <div class="d-flex justify-space-between align-center mb-6">
                <span class="text-h6 font-weight-bold">{{ t('cart.total') }}</span>
                <span class="total-price">{{ cartStore.precioTotal }}€</span>
              </div>

              <!-- BOTÓN FINAL DE COMPRA
                   :loading="procesando" dibuja el spinner si procesando es true -->
              <v-btn
                size="x-large"
                block
                rounded="pill"
                class="checkout-btn text-none font-weight-black mb-3"
                prepend-icon="mdi-check-circle-outline"
                :loading="procesando"
                @click="tramitarPedido"
              >
                {{ t('cart.checkout_btn') }}
              </v-btn>

              <!-- Vaciar de golpe -->
              <v-btn variant="text" block class="text-none text-medium-emphasis" @click="cartStore.vaciarCarrito()">
                {{ t('cart.clear_btn') }}
              </v-btn>
            </div>
          </v-col>
        </v-row>

        <!-- Bloque del v-else: Solo aparece si el carrito está a 0 -->
        <div v-else class="empty-cart">
          <v-icon size="90" class="mb-6" style="color: rgba(99,102,241,0.25);">mdi-cart-off</v-icon>
          <h2 class="page-title mb-2">{{ t('cart.empty_title') }}</h2>
          <p class="text-medium-emphasis mb-8">{{ t('cart.empty_sub') }}</p>
          <v-btn to="/" size="large" rounded="pill" class="checkout-btn text-none font-weight-bold px-10" prepend-icon="mdi-storefront">
            {{ t('cart.empty_btn') }}
          </v-btn>
        </div>

      </v-container>
    </div>

    <!-- Snackbar verde al confirmar el pedido -->
    <v-snackbar v-model="pedidoCompletado" color="success" location="bottom right" :timeout="4000" rounded="pill">
      <v-icon class="mr-2">mdi-check-circle</v-icon>
      {{ t('cart.snackbar_success') }}
    </v-snackbar>

  </MainLayout>
</template>

<style scoped>
/* 
  Uso de rgb(var(--v-theme-*)) 
  Esto pilla el color de Vuetify dependiendo de si estamos en modo oscuro o claro. 
*/
.cart-page {
  background: rgb(var(--v-theme-background));
  min-height: 100vh;
}
.page-title {
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: -1px;
  color: rgb(var(--v-theme-on-background));
  margin: 0;
}
.cart-item {
  background: rgb(var(--v-theme-surface));
  border-radius: 16px;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  padding: 16px;
  display: flex;
  align-items: center;
  transition: box-shadow 0.2s ease;
}
.cart-item:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.09); }
.item-label { font-size: 0.6rem; font-weight: 700; letter-spacing: 1.5px; color: #6366f1; margin: 0; }
.item-title { font-size: 1rem; font-weight: 800; color: rgb(var(--v-theme-on-surface)); margin: 2px 0 0 0; }
.item-price { font-size: 1.25rem; font-weight: 900; color: #6366f1; }

.summary-card {
  background: rgb(var(--v-theme-surface));
  border-radius: 20px;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  padding: 28px;
  /* position: sticky hace que el resumen te persiga al hacer scroll hacia abajo */
  position: sticky;
  top: 80px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.07);
}
.summary-title { font-size: 1.25rem; font-weight: 900; color: rgb(var(--v-theme-on-surface)); }
.summary-row { display: flex; justify-content: space-between; color: rgb(var(--v-theme-on-surface)); opacity: 0.75; font-size: 0.95rem; }
.total-price {
  font-size: 2rem; font-weight: 900;
  background: linear-gradient(135deg, #6366f1, #3b82f6);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.checkout-btn {
  background: linear-gradient(135deg, #6366f1, #3b82f6) !important;
  color: white !important;
  letter-spacing: 0 !important;
  font-size: 1rem;
}
.empty-cart {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; padding: 80px 0; text-align: center;
}

/* Animaciones de Vue para transition-group (nombre "slide-fade") */
.slide-fade-enter-active, .slide-fade-leave-active { transition: all 0.35s ease; }
.slide-fade-enter-from, .slide-fade-leave-to { opacity: 0; transform: translateX(20px); }
</style>
