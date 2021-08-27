<template>
    <my-header />
    <keep-alive>
        <router-view />
    </keep-alive>
    <!-- <background-music class="background-music" /> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MyHeader from '@/components/main/Header.vue'
// import BackgroundMusic from '@/components/main/BackgroundMusic.vue'

export default defineComponent({
    name: 'App',
    components: {
        MyHeader,
        // BackgroundMusic
    }
})
</script>

<style lang="less" scoped>
.background-music {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
}
</style>
