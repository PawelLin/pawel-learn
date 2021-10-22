<template>
    <section class="container">
        <ul class="list">
            <p class="title">Vue</p>
            <li class="vue">
                <a href="https://cn.vuejs.org/" target="_blank">Vue2</a>
            </li>
            <li class="vue">
                <a href="https://v3.cn.vuejs.org/" target="_blank">Vue3</a>
            </li>
        </ul>
        <ul class="list">
            <p class="title">图片</p>
            <li class="tinypng">
                <a href="https://tinypng.com/" target="_blank">Tinypng</a>
            </li>
        </ul>
        <ul class="list">
            <p class="title">颜色</p>
            <li class="color">
                <a href="http://color.oulu.me/" target="_blank">渐变背景</a>
            </li>
            <li class="zhongguose">
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
        img {
            margin-right: 5px;
            height: 17px;
            vertical-align: middle;
        }
        li::before {
            content: '';
            margin-right: 5px;
            display: inline-block;
            width: 16px;
            height: 16px;
            vertical-align: middle;
            background-size: contain;
        }
        li.vue::before {
            background-image: url(@/assets/source/vue.png);
        }
        li.tinypng::before {
            background-image: url(@/assets/source/tinypng.ico);
        }
        li.color::before {
            background-image: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
        }
        li.zhongguose::before {
            background-image: url(@/assets/source/texture.png),url(@/assets/source/zhongguose.png);
        }
        li:hover a {
            color: #000;
        }
        li + li {
            margin-top: 3px;
        }
        a {
            color: #666;
        }
        & + .list {
            margin-top: 15px;
        }
    }
    .title {
        margin-bottom: 5px;
        color: #000;
    }
}
</style>
