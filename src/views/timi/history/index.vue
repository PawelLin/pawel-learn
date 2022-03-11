<template>
    <div class="timi-history">
        <component :is="is"></component>
    </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref, onUnmounted, onMounted  } from 'vue'

export default defineComponent({
    components: {
        mobile: defineAsyncComponent(() => import('./mobile.vue')),
        pc: defineAsyncComponent(() => import('./pc.vue')),
        pcTable: defineAsyncComponent(() => import('./table.vue'))
    },
    setup() {
        const is = ref('mobile')
        const windowListen = () => {
            const orientation = window.orientation
            if (orientation !== undefined) {
                is.value = orientation === 90 || orientation === -90 ? 'pcTable' : 'mobile'
            } else {
                is.value = window.innerHeight < window.innerWidth ? 'pcTable' : 'mobile'
            }
        }
        onMounted(() => {
            windowListen()
            window.addEventListener('resize', windowListen)
        })
        onUnmounted(() => {
            window.removeEventListener('resize', windowListen)
        })
        return {
            is
        }
    },
})
</script>

<style lang="less" scoped>
</style>
