<template>
    <div class="timi-history">
        <component :is="is"></component>
    </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent  } from 'vue'

export default defineComponent({
    components: {
        mobile: defineAsyncComponent(() => import('./mobile.vue')),
        pc: defineAsyncComponent(() => import('./pc.vue')),
        pcTable: defineAsyncComponent(() => import('./table.vue'))
    },
    setup() {
        let is = 'mobile'
        const orientation = window.orientation
        if (orientation !== undefined) {
            if (orientation === 90 || orientation === -90) {
                is = 'pcTable'
            }
        } else {
            if (window.innerHeight < window.innerWidth) {
                is = 'pcTable'
            }
        }
        return {
            is
        }
    },
})
</script>

<style lang="less" scoped>
</style>
