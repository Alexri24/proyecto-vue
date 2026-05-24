<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useCategoryStore } from '../stores/categoryStore'

const categoryStore = useCategoryStore()

const schema = yup.object({
  nombre: yup.string().required('El nombre es obligatorio').min(3, 'Mínimo 3 caracteres'),
  descripcion: yup.string().required('La descripción es obligatoria')
})

const { handleSubmit, resetForm } = useForm({ validationSchema: schema })
const { value: nombre, errorMessage: nombreError } = useField<string>('nombre')
const { value: descripcion, errorMessage: descripcionError } = useField<string>('descripcion')

const onSubmit = handleSubmit((values) => {
  categoryStore.agregarCategoria({ nombre: values.nombre, descripcion: values.descripcion })
  resetForm()
})
</script>

<template>
  <form @submit.prevent="onSubmit">
    <v-row>
      <v-col cols="12" md="5">
        <v-text-field
          v-model="nombre"
          :error-messages="nombreError"
          label="Nombre de la categoría"
          variant="outlined"
          rounded="lg"
          density="comfortable"
          prepend-inner-icon="mdi-tag-outline"
        />
      </v-col>
      <v-col cols="12" md="7">
        <v-text-field
          v-model="descripcion"
          :error-messages="descripcionError"
          label="Descripción"
          variant="outlined"
          rounded="lg"
          density="comfortable"
          prepend-inner-icon="mdi-text"
        />
      </v-col>
    </v-row>
    <v-btn type="submit" rounded="pill" class="text-none font-weight-bold save-btn" size="large">
      <v-icon start icon="mdi-plus" />
      Guardar Categoría
    </v-btn>
  </form>
</template>

<style scoped>
.save-btn {
  background: linear-gradient(135deg, #f59e0b, #d97706) !important;
  color: white !important;
}
</style>