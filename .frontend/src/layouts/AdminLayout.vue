<template>
  <v-app-bar color="blue-grey-darken-4" elevation="3" border="bottom">
    <v-app-bar-title class="text-h6 font-weight-bold text-cyan-accent-3">
      ⚙️ Panel de Control
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn to="/" variant="text" color="cyan-lighten-4" class="mr-4">
      <v-icon start>mdi-store</v-icon>
      Ver Tienda
    </v-btn>
    <v-btn to="/login" color="error" variant="flat" class="font-weight-bold">
      Cerrar Sesión
    </v-btn>
  </v-app-bar>

  <v-main class="bg-blue-grey-lighten-5">
    <slot />
  </v-main>

  <v-footer color="blue-grey-darken-4" class="text-center py-3 border-top" app>
    <v-spacer></v-spacer>
    <span class="text-cyan-accent-3 text-caption font-weight-bold">
      AdminSystem v1.0 • Acceso Restringido
    </span>
  </v-footer>
</template>