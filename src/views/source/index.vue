<template>
    <section class="container">
        <ul class="list">
            <p class="title">颜色</p>
            <li>
                <a href="http://color.oulu.me/" target="_blank">渐变背景CSS3样式</a>
            </li>
            <li>
                <a href="http://zhongguose.com/" target="_blank">中国色</a>
            </li>
        </ul>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
})
</script>

<style lang="less" scoped>
.container {
    padding: 20px;
    .list {
        padding-left: 20px;
        list-style: disc;
        li + li {
            margin-top: 3px;
        }
        a {
            color: #666;
        }
    }
    .title {
        margin-bottom: 5px;
        color: #000;
    }
}
</style>
