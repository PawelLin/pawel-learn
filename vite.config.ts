import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const resolve = dir => {
    return path.join(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        open: true
    },
    resolve: {
        alias: {
            '@': resolve('src')
        }
    },
    plugins: [vue()]
})
