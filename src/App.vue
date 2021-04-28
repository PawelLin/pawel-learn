<template>
    <my-header />
    <keep-alive>
        <router-view />
    </keep-alive>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MyHeader from '@/components/main/Header.vue'

export default defineComponent({
    name: 'App',
    components: {
        MyHeader
    }
})
</script>
