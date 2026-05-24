<script setup lang="ts">
/**
 * ══════════════════════════════════════════════════
 *  AdminView.vue — Vista del Panel de Administración
 * ══════════════════════════════════════════════════
 *
 * Esta vista actúa como un "contenedor" u organizador.
 * En lugar de tener miles de líneas de código aquí para las tablas y formularios,
 * los hemos separado en COMPONENTES (TablaVideojuegos.vue, etc.) y los importamos.
 * Esto hace el código modular, fácil de leer y fácil de mantener.
 */

import AdminLayout from '../layouts/AdminLayout.vue' // Layout propio (sin carrito, con botón Salir)
import TablaVideojuegos from '../components/TablaVideojuegos.vue'
import FormularioVideojuego from '../components/FormularioVideojuego.vue'
import TablaCategorias from '../components/TablaCategorias.vue'
import FormularioCategoria from '../components/FormularioCategoria.vue'
</script>

<template>
  <!-- Envolvemos todo el panel en su propio Layout -->
  <AdminLayout>
    <div class="admin-page">
      <v-container style="max-width: 1200px;" class="py-10">

        <!-- Cabecera de la página -->
        <div class="mb-10">
          <h1 class="page-title">Panel de Administración</h1>
          <p class="text-medium-emphasis mt-1">Gestiona el inventario de juegos y las categorías</p>
        </div>

        <!-- ══════════════════════════════
             BLOQUE 1: GESTIÓN DE VIDEOJUEGOS
             ══════════════════════════════ -->
        <div class="section-header mb-4">
          <div class="section-icon">
            <v-icon icon="mdi-controller" color="white" size="20" />
          </div>
          <div>
            <h2 class="section-title">Videojuegos</h2>
            <p class="section-sub">Inventario completo de títulos disponibles</p>
          </div>
        </div>

        <!-- Inyectamos el componente TablaVideojuegos aquí. 
             Ese archivo tiene su propia lógica, su propia conexión al store y su diseño. -->
        <TablaVideojuegos />

        <!-- Inyectamos el componente FormularioVideojuego. -->
        <div class="add-section">
          <h3 class="add-title">
            <v-icon icon="mdi-plus-circle" color="primary" class="mr-2" size="20"/>
            Añadir nuevo videojuego
          </h3>
          <FormularioVideojuego />
        </div>

        <!-- Separador visual entre Videojuegos y Categorías -->
        <div class="my-12 section-divider" />

        <!-- ══════════════════════════════
             BLOQUE 2: GESTIÓN DE CATEGORÍAS
             ══════════════════════════════ -->
        <div class="section-header mb-4">
          <!-- Este icono tiene un gradiente dorado para diferenciarlo visualmente -->
          <div class="section-icon" style="background: linear-gradient(135deg, #f59e0b, #d97706);">
            <v-icon icon="mdi-tag-multiple" color="white" size="20" />
          </div>
          <div>
            <h2 class="section-title">Categorías</h2>
            <p class="section-sub">Organización y clasificación de títulos</p>
          </div>
        </div>

        <!-- Inyectamos la tabla y el formulario de categorías -->
        <TablaCategorias />

        <div class="add-section">
          <h3 class="add-title">
            <v-icon icon="mdi-plus-circle" color="warning" class="mr-2" size="20"/>
            Añadir nueva categoría
          </h3>
          <FormularioCategoria />
        </div>

      </v-container>
    </div>
  </AdminLayout>
</template>

<style scoped>
/* 
  Estilos estructurales para el panel admin.
  Fíjate cómo usamos variables (--v-theme-*) para que todo el panel
  se adapte perfectamente si el usuario activa el modo oscuro en la navbar.
*/
.admin-page { min-height: 100vh; }

.page-title {
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: -1px;
  color: rgb(var(--v-theme-on-background));
  margin: 0;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 16px;
}
.section-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #6366f1, #3b82f6); /* Color índigo de la marca */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.section-title {
  font-size: 1.3rem;
  font-weight: 900;
  color: rgb(var(--v-theme-on-background));
  margin: 0;
}
.section-sub {
  font-size: 0.85rem;
  color: #64748b;
  margin: 2px 0 0 0;
}

/* Las cajas donde van dentro los formularios */
.add-section {
  margin-top: 24px;
  background: rgb(var(--v-theme-surface)); /* Blanco en claro, gris oscuro en modo oscuro */
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 16px;
  padding: 24px;
}
.add-title {
  font-size: 1rem;
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
}

/* Línea separadora con gradiente semitransparente */
.section-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(99,102,241,0.2), transparent);
}
</style>