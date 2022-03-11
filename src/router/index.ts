import { createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/home/index.vue')
    },
    {
        path: '/css',
        name: 'Css',
        component: () => import('@/views/css/index.vue')
    },
    {
        path: '/icon',
        name: 'Icon',
        component: () => import('@/views/icon/index.vue')
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
        path: '/timi/skin',
        name: 'TimiSkin',
        component: () => import('@/views/timi/skin/index.vue')
    },
    {
        path: '/timi/history',
        name: 'TimiHistory',
        component: () => import('@/views/timi/history/index.vue')
    },
    {
        path: '/timi/kpl',
        name: 'TimiKpl',
        component: () => import('@/views/timi/kpl/index.vue')
    },
    {
        path: '/echarts',
        name: 'Echarts',
        component: () => import('@/views/echarts/index.vue')
    },
    {
        path: '/source',
        name: 'Source',
        component: () => import('@/views/source/index.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router