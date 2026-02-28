<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()

// 1. Definimos las reglas estrictas con Yup (Requisito obligatorio)
const schema = yup.object({
  titulo: yup.string().required('El título es obligatorio').min(3, 'Mínimo 3 letras'),
  precio: yup.number().required('El precio es obligatorio').positive('Debe ser mayor a 0'),
  stock: yup.number().required('El stock es obligatorio').integer('Sin decimales').min(0, 'No puede ser negativo')
})

// 2. Iniciamos el formulario con VeeValidate
const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
})

// 3. Conectamos los campos del formulario con la validación
const { value: titulo, errorMessage: tituloError } = useField<string>('titulo')
const { value: precio, errorMessage: precioError } = useField<number>('precio')
const { value: stock, errorMessage: stockError } = useField<number>('stock')

// 4. Función para guardar (usa la Acción de Pinia)
const onSubmit = handleSubmit((values) => {
  
  // Calculamos el siguiente ID disponible
  const nuevoId = gameStore.juegos.length > 0 
    ? Math.max(...gameStore.juegos.map(j => j.id)) + 1 
    : 1;

  gameStore.agregarJuego({
    id: nuevoId, // Usamos el ID calculado
    titulo: values.titulo,
    precio: values.precio,
    stock: values.stock,
    categoriaId: 1, 
    imagen: ''
  })
  resetForm() // Limpiamos el formulario tras guardar
})
</script>

<template>
  <v-card title="Añadir Nuevo Videojuego" class="mt-6" flat border>
    <v-card-text>
      <form @submit.prevent="onSubmit">
        <v-text-field
          v-model="titulo"
          :error-messages="tituloError"
          label="Título del Juego"
          class="mb-2"
        ></v-text-field>

        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="precio"
              :error-messages="precioError"
              label="Precio (€)"
              type="number"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="stock"
              :error-messages="stockError"
              label="Stock"
              type="number"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-btn type="submit" color="primary" class="mt-4">
          Guardar Juego
        </v-btn>
      </form>
    </v-card-text>
  </v-card>
</template>