<template>
    <section class="container">
        <view-code
            title="行数限制"
            text="我是一串很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的字"
            code="display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;overflow: hidden;"
        />
        <view-code
            title="一行超过显示..."
            text="我是一串很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的字"
            code="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
        />
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ViewCode from './viewCode.vue'

export default defineComponent({
    name: 'Css',
    components: {
        ViewCode
    }
})
</script>

<style lang="less" scoped>
.container {
    display: flex;
    padding: 0 20px 20px;
    flex-wrap: wrap;
}
</style>
