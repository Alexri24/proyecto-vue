import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // ✨ AÑADIMOS ESTO PARA QUE DOCKER EN WINDOWS SE ENTERE DE LOS CAMBIOS ✨
  server: {
    watch: {
      usePolling: true
    }
  }
})