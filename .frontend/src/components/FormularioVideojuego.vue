<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()

const schema = yup.object({
  titulo: yup.string().required('El título es obligatorio').min(3, 'Mínimo 3 caracteres'),
  precio: yup.number().required('El precio es obligatorio').positive('Debe ser mayor a 0'),
  stock: yup.number().required('El stock es obligatorio').integer('Sin decimales').min(0, 'No puede ser negativo'),
  imagen: yup.string().url('Debe ser una URL válida').nullable()
})

const { handleSubmit, resetForm } = useForm({ validationSchema: schema })
const { value: titulo, errorMessage: tituloError } = useField<string>('titulo')
const { value: precio, errorMessage: precioError } = useField<number>('precio')
const { value: stock, errorMessage: stockError } = useField<number>('stock')
const { value: imagen, errorMessage: imagenError } = useField<string>('imagen')

const onSubmit = handleSubmit((values) => {
  gameStore.agregarJuego({
    titulo: values.titulo,
    precio: values.precio,
    stock: values.stock,
    categoriaId: 1,
    imagen: values.imagen || ''
  })
  resetForm()
})
</script>

<template>
  <form @submit.prevent="onSubmit">
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="titulo"
          :error-messages="tituloError"
          label="Título del juego"
          variant="outlined"
          rounded="lg"
          density="comfortable"
          prepend-inner-icon="mdi-gamepad-variant"
        />
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="precio"
          :error-messages="precioError"
          label="Precio (€)"
          type="number"
          variant="outlined"
          rounded="lg"
          density="comfortable"
          prepend-inner-icon="mdi-currency-eur"
        />
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="stock"
          :error-messages="stockError"
          label="Stock"
          type="number"
          variant="outlined"
          rounded="lg"
          density="comfortable"
          prepend-inner-icon="mdi-package-variant"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="imagen"
          :error-messages="imagenError"
          label="URL de la portada (Opcional)"
          variant="outlined"
          rounded="lg"
          density="comfortable"
          prepend-inner-icon="mdi-image-outline"
        />
      </v-col>
    </v-row>
    <v-btn type="submit" rounded="pill" class="text-none font-weight-bold save-btn" size="large">
      <v-icon start icon="mdi-plus" />
      Guardar Videojuego
    </v-btn>
  </form>
</template>

<style scoped>
.save-btn {
  background: linear-gradient(135deg, #6366f1, #3b82f6) !important;
  color: white !important;
}
</style>