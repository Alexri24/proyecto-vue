<script setup lang="ts">
import AuthLayout from '../layouts/AuthLayout.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore' // Importamos el store

const router = useRouter()
const authStore = useAuthStore() // Activamos el store

const email = ref('')
const password = ref('')
const mensajeError = ref('') // Para mostrar un aviso si falla

const hacerLogin = async () => {
  mensajeError.value = '' // Limpiamos el error previo
  
  if (email.value && password.value) {
    // Llamamos al store y esperamos su respuesta
    const exito = await authStore.login(email.value, password.value)
    
    if (exito) {
      router.push('/admin') // ¡Pa' dentro!
    } else {
      mensajeError.value = 'Email o contraseña incorrectos ❌'
    }
  }
}
</script>

<template>
  <AuthLayout>
    <v-container class="fill-height" fluid style="min-height: 100vh; background-color: #f5f5f5;">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card elevation="8" class="pa-6 rounded-lg">
            
            <div class="text-center mb-6">
              <h2 class="text-h4 font-weight-bold text-primary">Bienvenido</h2>
              <p class="text-grey">Introduce tus credenciales para acceder</p>
            </div>

            <v-form @submit.prevent="hacerLogin">
              <v-text-field
                v-model="email"
                label="Correo electrónico"
                type="email"
                variant="outlined"
                required
                class="mb-2"
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Contraseña"
                type="password"
                variant="outlined"
                required
              ></v-text-field>

              <v-btn type="submit" color="primary" block size="x-large" class="mt-4 text-none">
                Entrar al Panel Admin
              </v-btn>

              <p v-if="mensajeError" class="text-error mt-4 text-center font-weight-bold">
                {{ mensajeError }}
              </p>

            </v-form>

            <v-btn to="/" variant="text" block class="mt-4 text-none text-grey">
              Volver a la tienda
            </v-btn>
            
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </AuthLayout>
</template>