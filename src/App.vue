<template>
    <my-header />
    <!-- <div class="shadow"></div> -->
    <router-view />
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
.shadow {
    pointer-events: none;
}
.shadow::before{
    content: '';
    position: fixed;
    width: 100%;
    box-shadow: 0 0 10px 1px #333;
}
.shadow::after{
    content: '';
    position: absolute;
    width: 100%;
    height: 30px;
    background: linear-gradient(to bottom, #fff 50% , transparent);
}
</style>
