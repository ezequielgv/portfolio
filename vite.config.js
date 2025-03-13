import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    base: './', 
    server: { port: 5173, },
    build: { 
        chunkSizeWarningLimit: 2000,
        outDir: 'docs', 
    },
    resolve: {
        alias: {'@': '/src',}
    }
})