<template>
  <v-app-bar color="deep-purple-darken-4" elevation="6">
    <v-app-bar-title class="text-h5 font-weight-black text-uppercase">
      <span class="text-amber-accent-3">🎮 Game</span>Store
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn to="/" variant="text" class="text-subtitle-1 font-weight-bold mx-2">
      Tienda
    </v-btn>
    <v-btn to="/login" color="amber-accent-3" variant="outlined" class="font-weight-bold mx-2">
      Acceder
    </v-btn>
  </v-app-bar>

  <v-main class="bg-grey-lighten-4">
    <slot />
  </v-main>

  <v-footer color="deep-purple-darken-4" class="text-center d-flex flex-column mt-auto" elevation="10" app>
    <div class="px-4 py-3 bg-deep-purple-darken-3 w-100 text-subtitle-1 font-weight-medium">
      Tus mejores videojuegos al mejor precio.
    </div>
    <div class="py-4 text-body-2 text-grey-lighten-1">
      © {{ new Date().getFullYear() }} — <strong class="text-amber-accent-3">GameStore</strong>. Todos los derechos reservados.
    </div>
  </v-footer>
</template>