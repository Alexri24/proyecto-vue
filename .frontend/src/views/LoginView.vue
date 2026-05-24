<script setup lang="ts">
/**
 * ══════════════════════════════════════════════════
 *  LoginView.vue — Pantalla de acceso al panel
 * ══════════════════════════════════════════════════
 */
import { ref } from 'vue'
import { useRouter } from 'vue-router'     // Hook para cambiar de URL desde código
import { useAuthStore } from '../stores/authStore' // El store que maneja la sesión

// 1. Instanciamos router y store
const router = useRouter()
const authStore = useAuthStore()

// 2. Variables reactivas para el formulario
// Lo que el usuario escriba en los inputs se guardará automáticamente aquí (gracias a v-model)
const email = ref('')
const password = ref('')
const mensajeError = ref('') // Texto del mensaje de error rojo
const cargando = ref(false)  // Controla el spinner del botón "Entrar"

/**
 * Función que se ejecuta cuando el usuario pulsa "Entrar al Panel"
 * o le da al "Enter" en el teclado (gracias al @submit.prevent del formulario)
 */
const hacerLogin = async () => {
  mensajeError.value = '' // Limpiamos el error previo por si acaso
  
  // Validación básica: si no ha escrito nada, no hacemos nada
  if (!email.value || !password.value) return

  cargando.value = true // Activamos el spinner de carga
  
  // Llamamos a la función login del store. Esta función devuelve TRUE si el login es correcto o FALSE si falla.
  const exito = await authStore.login(email.value, password.value)
  
  cargando.value = false // Quitamos el spinner

  if (exito) {
    // Si el login fue bien, redirigimos a la zona privada usando Vue Router
    // Esto funciona porque ahora el authStore tiene los datos y el router.beforeEach (el "segurata") le dejará pasar.
    router.push('/admin')
  } else {
    // Si falló (credenciales incorrectas), mostramos el error
    mensajeError.value = 'Email o contraseña incorrectos'
  }
}
</script>

<template>
  <div class="login-page">

    <!-- PANEL IZQUIERDO: Branding (Solo decorativo)
         Usamos puro CSS para ocultarlo en móviles (ver @media en style) -->
    <div class="login-left">
      <div class="brand">
        <v-icon icon="mdi-controller-classic" size="48" color="white" class="mb-4" />
        <h1 class="brand-title">GameStore</h1>
        <p class="brand-sub">La mejor tienda de videojuegos</p>
      </div>

      <div class="brand-footer">
        <!-- v-for básico para mostrar las "ventajas" de la tienda en forma de chips -->
        <v-chip
          v-for="item in ['🎮 +4 títulos', '🚀 Envío gratis', '⭐ Calidad premium']"
          :key="item"
          size="small"
          variant="tonal"
          color="white"
          class="mr-2 mb-2"
        >{{ item }}</v-chip>
      </div>
    </div>

    <!-- PANEL DERECHO: Formulario funcional -->
    <div class="login-right">
      <div class="login-form-wrapper">

        <div class="mb-8">
          <h2 class="login-title">Bienvenido de nuevo</h2>
          <p class="login-sub">Introduce tus credenciales para acceder al panel</p>
        </div>

        <!-- 
          @submit.prevent intercepta el comportamiento natural de HTML 
          (que recargaría la página) y llama a nuestra función hacerLogin() en su lugar.
        -->
        <form @submit.prevent="hacerLogin">
          
          <label class="field-label">Correo electrónico</label>
          <!-- v-model="email" enlaza este campo de texto con la variable reactiva 'email' -->
          <v-text-field
            v-model="email"
            type="email"
            placeholder="admin@gamestore.com"
            variant="outlined"
            rounded="lg"
            hide-details
            class="mb-4 mt-1"
            density="comfortable"
            prepend-inner-icon="mdi-email-outline"
            required
          />

          <label class="field-label">Contraseña</label>
          <!-- v-model="password" enlaza con la variable 'password' -->
          <v-text-field
            v-model="password"
            type="password"
            placeholder="••••••••"
            variant="outlined"
            rounded="lg"
            hide-details
            class="mb-6 mt-1"
            density="comfortable"
            prepend-inner-icon="mdi-lock-outline"
            required
          />

          <!-- Alerta de Error
               Solo se renderiza si 'mensajeError' tiene texto (v-if). -->
          <v-alert
            v-if="mensajeError"
            type="error"
            variant="tonal"
            rounded="lg"
            density="compact"
            class="mb-4"
            :text="mensajeError"
          />

          <!-- Botón de envío (type="submit" hace que funcione al darle al Enter en los campos)
               :loading="cargando" activa el icono giratorio si estamos esperando al servidor -->
          <v-btn
            type="submit"
            block
            size="x-large"
            rounded="pill"
            class="login-btn text-none font-weight-black"
            :loading="cargando"
          >
            Entrar al Panel
          </v-btn>
        </form>

        <v-btn
          to="/"
          variant="text"
          block
          class="text-none text-medium-emphasis mt-4"
          prepend-icon="mdi-arrow-left"
        >
          Volver a la tienda
        </v-btn>

        <!-- Tarjeta informativa con credenciales de prueba
             (En un proyecto real, esto obviamente no estaría aquí) -->
        <v-card variant="tonal" color="primary" rounded="lg" class="mt-8 pa-4">
          <p class="text-body-2 font-weight-bold mb-2">
            <v-icon size="16" class="mr-1">mdi-information</v-icon>
            Credenciales de prueba
          </p>
          <p class="text-body-2 mb-0"><strong>Admin:</strong> admin@gamestore.com · 123</p>
          <p class="text-body-2 mb-0"><strong>Empleado:</strong> empleado@gamestore.com · 123</p>
        </v-card>

      </div>
    </div>

  </div>
</template>

<style scoped>
/* Contenedor principal: ocupa toda la altura de la pantalla usando flexbox */
.login-page {
  display: flex;
  min-height: 100vh;
}

/* ══ Panel izquierdo ══ */
.login-left {
  width: 42%;
  background: linear-gradient(145deg, #0d0d1a 0%, #1a1a3e 50%, #0f2460 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 60px 48px;
  position: relative;
  overflow: hidden;
}
/* Efectos de luz circulares en el fondo del panel izquierdo */
.login-left::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 20% 80%, rgba(99,102,241,0.2) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(59,130,246,0.15) 0%, transparent 50%);
}
.brand { position: relative; z-index: 1; }
.brand-title {
  font-size: 2.8rem;
  font-weight: 900;
  color: white;
  letter-spacing: -2px;
  margin: 0 0 8px 0;
}
.brand-sub {
  color: rgba(255,255,255,0.55);
  font-size: 1rem;
  margin: 0;
}
.brand-footer { position: relative; z-index: 1; }

/* ══ Panel derecho ══ */
.login-right {
  flex: 1;
  /* El panel derecho respeta el modo oscuro gracias a las variables de Vuetify */
  background: rgb(var(--v-theme-background));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
}
.login-form-wrapper {
  width: 100%;
  max-width: 420px;
}
.login-title {
  font-size: 1.9rem;
  font-weight: 900;
  letter-spacing: -1px;
  color: rgb(var(--v-theme-on-background));
  margin: 0;
}
.login-sub {
  color: #64748b;
  margin: 8px 0 0 0;
  font-size: 0.95rem;
}
.field-label {
  font-size: 0.82rem;
  font-weight: 700;
  color: #374151;
  letter-spacing: 0.3px;
}
.login-btn {
  background: linear-gradient(135deg, #6366f1, #3b82f6) !important;
  color: white !important;
  font-size: 1rem;
  letter-spacing: 0 !important;
}

/* Media Query: Si la pantalla es más estrecha de 768px (móviles/tablets), ocultamos la parte izquierda */
@media (max-width: 768px) {
  .login-left { display: none; }
}
</style>