<template>
    <header class="header">
        <router-link to="/" class="icon"></router-link>
        <router-link v-for="{ path, text, key } in links" :to="path" :class="routeName === key && 'active'" class="menu" :key="key">{{text}}</router-link>
    </header>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
    setup() {
        const route = useRoute()
        const routeName = computed(() => route.name)
        return {
            routeName,
            links: [
                { path: '/css', text: '样式', key: "Css" },
                { path: '/component', text: '组件', key: 'Component' },
                { path: '/icon', text: '图标', key: 'Icon' },
                { path: '/source', text: '资源', key: 'Source' },
                { path: '/regular', text: '正则', key: 'Regular' },
                { path: '/timi', text: 'Timi', key: 'Timi' },
                { path: '/timi/skin', text: 'TimiSkin', key: 'TimiSkin' },
                { path: '/timi/history', text: 'TimiHistory', key: 'TimiHistory' },
                // { path: '/echarts', text: 'echarts', key: 'Echarts' }
            ]
        }
    }
})
</script>


<style lang="less" scoped>
.header {
    position: sticky;
    top: 0;
    // padding: 0 20px;
    display: flex;
    align-items: center;
    height: 64px;
    white-space: nowrap;
    border-bottom: 1px solid #eaeaea;
    background-color: #fff;
    overflow-x: auto;
    z-index: 1;
    &::-webkit-scrollbar {
        width: 0;
        height: 0;
        opacity: 0;
    }
    > .icon {
        position: sticky;
        left: 0;
        width: 40px;   
        height: 40px;
        background: url(@/assets/svg/shumabaobei/brave.svg) no-repeat center #ffffff;
        // background: url(@/assets/svg/shumabaobei/brave.svg), url(@/assets/svg/shumabaobei/brave.png);
        background-size: 30px;
        min-width: 70px;
    }
    > .menu {
        padding-right: 20px;
        color: #666;
        &:hover, &.active {
            color: #000;
        }
    }
}
</style>