/**
 * ════════════════════════════════════════════════════════
 *  router/index.ts — Sistema de Rutas (Vue Router)
 * ════════════════════════════════════════════════════════
 *
 * CONCEPTO CLAVE: ¿Qué es el Router?
 * Es el sistema de navegación de la SPA (Single Page Application).
 * En vez de cargar una página nueva del servidor, Vue Router
 * muestra u oculta componentes según la URL del navegador.
 * El usuario ve que cambia la URL, pero la página NUNCA se recarga.
 *
 * RUTAS DEFINIDAS:
 *   /         → HomeView   (catálogo público)
 *   /login    → LoginView  (formulario de acceso)
 *   /admin    → AdminView  (panel privado — requiere login)
 *   /carrito  → CarritoView (carrito de compra)
 */

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AdminView from '../views/AdminView.vue'
import CarritoView from '../views/CarritoView.vue'
import { useAuthStore } from '../stores/authStore'

// ── createRouter() ──
// Crea la instancia del router con su configuración
const router = createRouter({
  // createWebHistory → URLs limpias (/admin en vez de /#/admin)
  history: createWebHistory(import.meta.env.BASE_URL),

  // Lista de rutas: cada objeto define una URL y qué componente muestra
  routes: [
    {
      path: '/',          // URL exacta
      name: 'home',       // Nombre interno (para navegar por nombre)
      component: HomeView // Componente que se renderiza
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      // meta → objeto de datos extra que podemos añadir a una ruta
      // Aquí usamos requiereAutenticacion: true como "señal privada"
      meta: { requiereAutenticacion: true }
    },
    {
      path: '/carrito',
      name: 'carrito',
      component: CarritoView
    }
  ]
})

// ════════════════════════════════════════════════════════
//  NAVIGATION GUARD — El "Segurata" de la aplicación
// ════════════════════════════════════════════════════════
//
// router.beforeEach() → se ejecuta ANTES de cada cambio de ruta
// Parámetros:
//   to   → la ruta a la que va el usuario
//   from → la ruta de la que viene
//   next → función que controla si puede pasar o no
//
router.beforeEach((to, from, next) => {
  // Accedemos al store para comprobar si hay sesión activa
  const authStore = useAuthStore()

  // Comprobación: ¿La ruta tiene la etiqueta privada Y no hay usuario logueado?
  if (to.meta.requiereAutenticacion && !authStore.usuarioActual) {
    // Si la ruta es privada y no hay sesión → redirige al login
    next('/login')
  } else {
    // En cualquier otro caso → deja pasar al usuario
    next()
  }
})

export default router