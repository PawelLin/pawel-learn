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
                { path: '/regular', text: '正则', key: 'Regular' }
            ]
        }
    }
})
</script>


<style lang="less" scoped>
.header {
    padding: 0 20px;
    display: flex;
    align-items: center;
    height: 64px;
    border-bottom: 1px solid #eaeaea;
    > .icon {
        width: 40px;
        height: 40px;
        background: url(@/assets/svg/shumabaobei/brave.svg);
        background-size: 100%;
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