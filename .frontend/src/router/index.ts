import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AdminView from '../views/AdminView.vue'
import { useAuthStore } from '../stores/authStore' // <-- NUEVO: Importamos el store de sesión

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
      // ✨ NUEVO: Le ponemos una etiqueta secreta para saber que esta ruta es privada
      meta: { requiereAutenticacion: true } 
    }
  ]
})

// ✨ NUEVO: El "Segurata" global. Se ejecuta CADA VEZ que cambias de página
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore() // Llamamos al store para ver si hay alguien logueado

  // Si la ruta a la que va necesita autenticación Y NO hay usuario logueado...
  if (to.meta.requiereAutenticacion && !authStore.usuarioActual) {
    next('/login') // ...lo mandamos de patitas a la calle (al login)
  } else {
    next() // ...si todo está bien, le dejamos pasar
  }
})

export default router