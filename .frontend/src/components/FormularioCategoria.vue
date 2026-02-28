<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useCategoryStore } from '../stores/categoryStore'

const categoryStore = useCategoryStore()

// 1. Reglas de validación
const schema = yup.object({
  nombre: yup.string().required('El nombre es obligatorio').min(3, 'Mínimo 3 letras'),
  descripcion: yup.string().required('La descripción es obligatoria')
})

// 2. Iniciamos el formulario
const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
})

// 3. Conectamos los campos
const { value: nombre, errorMessage: nombreError } = useField<string>('nombre')
const { value: descripcion, errorMessage: descripcionError } = useField<string>('descripcion')

// 4. Función para guardar en la base de datos (vía Pinia + Axios)
const onSubmit = handleSubmit((values) => {
  categoryStore.agregarCategoria({
    nombre: values.nombre,
    descripcion: values.descripcion
  })
  resetForm()
})
</script>

<template>
  <v-card title="Añadir Nueva Categoría" class="mt-4 mb-8" flat border>
    <v-card-text>
      <form @submit.prevent="onSubmit">
        <v-text-field
          v-model="nombre"
          :error-messages="nombreError"
          label="Nombre de la Categoría"
          class="mb-2"
        ></v-text-field>

        <v-textarea
          v-model="descripcion"
          :error-messages="descripcionError"
          label="Descripción"
          rows="2"
        ></v-textarea>

        <v-btn type="submit" color="cyan-darken-2" class="mt-2 text-none font-weight-bold">
          Guardar Categoría
        </v-btn>
      </form>
    </v-card-text>
  </v-card>
</template>