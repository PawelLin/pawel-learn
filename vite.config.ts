import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'

const resolve = dir => {
    return path.join(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
    base: '/learn',
    server: {
        open: true
    },
    resolve: {
        alias: {
            '@': resolve('src')
        }
    },
    css: {
        postcss: {
            plugins: [autoprefixer]
        }
    },
    plugins: [vue()]
})
