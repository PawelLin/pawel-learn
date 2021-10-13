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
    },
    setup() {
        let is = 'mobile'
        const orientation = window.orientation
        if (orientation !== undefined) {
            if (orientation === 90 || orientation === -90) {
                is = 'pc'
            }
        } else {
            if (window.innerHeight < window.innerWidth) {
                is = 'pc'
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
