<template>
    <div class="contain">
        <div class="title">特效</div>
        <div class="item">
            <div class="spotlight" :content="spotlight">{{spotlight}}</div>
            <div class="text-hollow">文字凹陷</div>
            <div class="text-bulge">文字突起</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const spotlight = '渐变色聚光灯'
</script>

<style lang="less" scoped>
.contain {
    display: flex;
    align-items: center;
    padding: 0 20px;
}
.title {
    min-width: 60px;
}
.item {
    margin-left: 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: -10px;
}
@spotLightHeight: 24px;
.spotlight {
    position: relative;
    color: transparent;
    text-shadow: 1px 1px 2px #fff, 0 0 0 rgba(0, 0, 0, 0.2), 1px 1px 2px #fff;
    font-size: @spotLightHeight;
    font-weight: bold;
    &::after {
        content: attr(content);
        position: absolute;
        left: 0;
        white-space: nowrap;
        text-shadow: none;
        color: transparent;
        background: linear-gradient(to right, #03A9F3, #f9c);
        background-clip: text;
        clip-path: ellipse(@spotLightHeight @spotLightHeight at 0 center);
        animation: 3s spotlightAnimate ease-in-out infinite alternate;
    }
}
@keyframes spotlightAnimate {
    0% {
        clip-path: ellipse(@spotLightHeight @spotLightHeight at calc(-@spotLightHeight / 2) center);
    }
    100% {
        clip-path: ellipse(@spotLightHeight @spotLightHeight at calc(100% + @spotLightHeight / 2) center);
    }
}
@text-shadow: 24px;
.text-hollow {
    color: transparent;
    font-size: @text-shadow;
    font-weight: bold;
    text-shadow: 1px 1px 2px #fff, 0 0 0 rgba(0, 0, 0, 0.2), 1px 1px 2px #fff;
}
.text-bulge {
    margin-top: -3px;
    color: transparent;
    font-size: @text-shadow;
    font-weight: bold;
    text-shadow: -1px -1px 2px #fff, 0 0 0 rgba(0, 0, 0, 0.2), -1px -1px 2px #fff;
}
</style>