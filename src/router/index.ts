import { createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/css',
        name: 'Css',
        component: () => import('@/views/css/index.vue')
    },
    {
        path: '/regular',
        name: 'Regular',
        component: () => import('@/views/regular/index.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router