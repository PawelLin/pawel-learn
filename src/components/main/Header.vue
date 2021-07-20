<template>
    <header class="header">
        <div class="icon"></div>
        <router-link v-for="{ path, text, key } in links" :to="path" :class="routeName === key && 'active'" :key="key">{{text}}</router-link>
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
                { path: '/timi-skin', text: 'TimiSkin', key: 'TimiSkin' }
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
    padding: 0 20px;
    display: flex;
    align-items: center;
    height: 64px;
    white-space: nowrap;
    border-bottom: 1px solid #eaeaea;
    background-color: #fff;
    z-index: 2;
    overflow-x: auto;
    > .icon {
        position: sticky;
        left: 0;
        width: 40px;   
        height: 40px;
        background: url(@/assets/svg/shumabaobei/brave.svg) no-repeat center #ffffff;
        // background: url(@/assets/svg/shumabaobei/brave.svg), url(@/assets/svg/shumabaobei/brave.png);
        background-size: 100%;
        min-width: 30px;
    }
    > a {
        margin-left: 20px;
        color: #666;
        &:hover, &.active {
            color: #000;
        }
    }
}
</style>