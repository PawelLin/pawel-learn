import { createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/css',
        name: 'Css',
        component: () => import('@/views/css/index.vue')
    },
    {
        path: '/component',
        name: 'Component',
        component: () => import('@/views/component/index.vue')
    },
    {
        path: '/regular',
        name: 'Regular',
        component: () => import('@/views/regular/index.vue')
    },
    {
        path: '/timi',
        name: 'Timi',
        component: () => import('@/views/timi/index.vue')
    },
    {
        path: '/echarts',
        name: 'Echarts',
        component: () => import('@/views/echarts/index.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router