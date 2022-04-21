<template>
    <i class="svg-icon" :class="icon">
        <span class="svg-icon-seize">占</span>
    </i>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
type ICONS = 'svg-brave' | 'svg-archive-logo' | 'svg-archive-build-success'
const props = defineProps<{
    icon: ICONS
    color?: string
    fontSize?: number | string
}>()
const fontSize = computed(() => typeof props.fontSize === 'number' ? `${props.fontSize}px` : props.fontSize || '60px')
const color = computed(() => props.color || 'black')
</script>

<style lang="less" scoped>
.svg-icon {
    display: inline-block;
    font-size: v-bind(fontSize);
    mask-size: 100% 100%;
    background: v-bind(color);
}
.svg-icon-seize {
    visibility: hidden;
}
.svg-brave {
    mask-image: url(./svg/brave.svg);
}
.svg-archive-logo {
    mask-image: url(./svg/archive/logo.svg);
}
.svg-archive-build-success {
    mask-image: url(./svg/archive/build-success.svg);
}
</style>
