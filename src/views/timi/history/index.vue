<template>
    <div class="timi-history">
        <component :is="is"></component>
    </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, computed  } from 'vue'
import { useOrientation } from '@/libs/use'

export default defineComponent({
    components: {
        mobile: defineAsyncComponent(() => import('./mobile.vue')),
        pc: defineAsyncComponent(() => import('./pc.vue')),
        pcTable: defineAsyncComponent(() => import('./table.vue'))
    },
    setup() {
        const { device } = useOrientation()
        const is = computed(() => device.value === 'mobile' ? 'mobile' : 'pcTable')
        return {
            is
        }
    },
})
</script>

<style lang="less" scoped>
</style>
