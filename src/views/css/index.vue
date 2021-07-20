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
    <div class="contain">
        <div class="title">Tooltips</div>
        <div class="item">
            <div class="tooltip1">clip-path 裁剪</div>
            <div class="tooltip2"></div>
        </div>
    </div>
    <div class="contain">
        <div class="title">Border</div>
        <div class="item">
            <div class="border border1">border</div>
            <div class="border border2">线性渐变</div>
            <div class="border border2 border3">Hover Me</div>
            <div class="border border4">线性渐变</div>
            <div class="border border5">线性渐变</div>
            <div class="border border6">
                <div>
                    <span>角向渐变</span>
                </div>
            </div>
            <div class="border border7">clip-path</div>
            <div class="border border8">clip-path</div>
            <div class="border border9">filter</div>
        </div>
    </div>
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
.contain {
    display: flex;
    align-items: center;
    padding: 0 20px;
    & + .contain {
        margin-top: 20px;
    }
}
.title {
    min-width: 60px;
}
.item {
    margin-left: 10px;
    display: flex;
    flex-wrap: wrap;
    margin-top: -10px;
    > div {
        margin: 10px 10px 0 0;
    }
}
.tooltip1 {
    --bg: linear-gradient(45deg, #ff3c41, #ff9800);
    --hight: 5px;
    position: relative;
    padding: 5px;
    color: #ffffff;
    &::before, &::after {
        content: '';
        position: absolute;
        width: 100%;
        top: 0;
        bottom: calc(0px - var(--hight));
        left: 0;
        background: var(--bg);/*完全相同的背景*/
        z-index: -1;
    }
    &::before {
        clip-path: inset(0 0 var(--hight) 0 round 5px);
        /*round 可以设置圆角*/
    }
    &::after {
        clip-path: polygon(calc(50% - var(--hight)) calc(100% - var(--hight)), calc(50% + var(--hight)) calc(100% - var(--hight)), 50% 100%);
        /* 实现小三角，只需要3个点的坐标就可以了 */
    }
}
.border {
    position: relative;
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
}
.border1 {
    --borderColor: #03A9F3;
    --distance: 4px;
    border: 1px solid var(--borderColor);
    @keyframes borderMove {
        20% {
            width: 10px;
            height: 10px;
        }
        50%, 80% {
            width: calc(100% + var(--distance) * 2 - 1px);
            height: calc(100% + var(--distance) * 2 - 1px);
        }
        100% {
            width: 10px;
            height: 10px;
        }
    }
    &::before, &::after {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        // transition: .3s linear;
        animation: borderMove 3s infinite linear;
    }
    &::before {
        top: calc(0px - var(--distance));
        left: calc(0px - var(--distance));
        border-top: 1px solid var(--borderColor);
        border-left: 1px solid var(--borderColor);
    }
    &::after {
        right: calc(0px - var(--distance));
        bottom: calc(0px - var(--distance));
        border-bottom: 1px solid var(--borderColor);
        border-right: 1px solid var(--borderColor);
    }
    // &:hover::before, &:hover::after {
    //     width: calc(100% + var(--distance) * 2 - 1px);
    //     height: calc(100% + var(--distance) * 2 - 1px);
    // }
}
.border2 {
    @keyframes linearGradientMove {
        100% {
            background-position: 4px 0, -4px 100%, 0 -4px, 100% 4px;
        }
    }
    background: 
        linear-gradient(90deg, #333 50%, transparent 0) repeat-x,
        linear-gradient(90deg, #333 50%, transparent 0) repeat-x,
        linear-gradient(0deg, #333 50%, transparent 0) repeat-y,
        linear-gradient(0deg, #333 50%, transparent 0) repeat-y;
    background-size: 4px 1px, 4px 1px, 1px 4px, 1px 4px;
    background-position: 0 0, 0 100%, 0 0, 100% 0;
    animation: linearGradientMove .3s infinite linear;
}
.border3 {
    outline: 1px solid #333;
    outline-offset: -1px;
    &:hover {
        outline: none;
    }
}
.border4 {
    overflow: hidden;
    --border: 1px;
    &::before, &::after {
        z-index: -1;
    }
    &::before {
        content: '';
        position: absolute;
        left: -150%;
        top: -150%;
        width: 400%;
        height: 400%;
        background-repeat: no-repeat;
        background-size: 50% 50%;
        background-position: 0 0, 100% 0, 100% 100%, 0 100%;
        background-image: linear-gradient(#399953, #399953), linear-gradient(#fbb300, #fbb300), linear-gradient(#d53e33, #d53e33), linear-gradient(#377af5, #377af5);
        @keyframes rotate {
            100% {
                transform: rotate(1turn);
            }
        }
        animation: rotate 4s linear infinite;
    }
    &::after {
        content: '';
        position: absolute;
        top: var(--border);
        right: var(--border);
        bottom: var(--border);
        left: var(--border);
        background-color: #ffffff;
    }
}
.border5 {
    overflow: hidden;
    --border: 1px;
    &::before, &::after {
        z-index: -1;
    }
    &::before {
        content: '';
        position: absolute;
        left: -150%;
        top: -150%;
        width: 400%;
        height: 400%;
        background-color: #fff;
        background-repeat: no-repeat;
        background-size: 50% 50%;
        background-position: 0 0;
        background-image: linear-gradient(#399953, #399953);
        animation: rotate 4s linear infinite;
    }
    &::after {
        content: '';
        position: absolute;
        top: var(--border);
        right: var(--border);
        bottom: var(--border);
        left: var(--border);
        background-color: #ffffff;
    }
}
.border6 {
    padding: 5px;
    line-height: inherit;
    background-color: #000;
    > div {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        outline: 1px solid rgba(168, 239, 255, 0.2);
        outline-offset: -1px;
        --border: 1px;
        line-height: 30px;
        > span {
            position: relative;
            color: #fff;
            z-index: 1;
        }
        &::before {
            content: '';
            position: absolute;
            left: -150%;
            top: -150%;
            width: 400%;
            height: 400%;
            background: conic-gradient(transparent, rgba(168, 239, 255, 1), transparent 30%);
            animation: rotate 4s linear infinite;
        }
        &::after {
            content: '';
            position: absolute;
            top: var(--border);
            right: var(--border);
            bottom: var(--border);
            left: var(--border);
            background-color: #000;
        }
    }
}
.border7 {
    @keyframes clippath {
        0%,
        100% {
            clip-path: inset(0 0 95% 0);
        }
        25% {
            clip-path: inset(0 0 0 95%);
        }
        50% {
            clip-path: inset(95% 0 0 0);
        }
        75% {
            clip-path: inset(0 95% 0 0 );
        }
    }
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 1px solid gold;
        border-radius: 5px;
        animation: clippath 4s infinite linear;
    }
}
.border8 {
    @keyframes clippath1 {
        0%,
        100% {
            clip-path: inset(0 0 95% 0);
        }
        25% {
            clip-path: inset(0 0 0 95%);
        }
        50% {
            clip-path: inset(95% 0 0 0);
        }
        75% {
            clip-path: inset(0 95% 0 0 );
        }
    }
    @keyframes clippath2 {
        0%,
        100% {
            clip-path: inset(95% 0 0 0);
        }
        25% {
            clip-path: inset(0 95% 0 0);
        }
        50% {
            clip-path: inset(0 0 95% 0);
        }
        75% {
            clip-path: inset(0 0 0 95%);
        }
    }
    &::before, &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 1px solid gold;
        border-radius: 5px;
    }
    &::before {
        animation: clippath1 4s infinite linear;
    }
    &::after {
        animation: clippath2 4s infinite linear;
    }
}
.border9 {
    line-height: 32px;
    @keyframes huerotate {
        0% {
            filter: hue-rotate(0deg);
        }
        100% {
            filter: hue-rotate(360deg);
        }
    }
    border: 4px solid;
    border-image: linear-gradient(45deg, gold, deeppink) 1;
    clip-path: inset(0px round 4px);
    animation: huerotate 6s infinite linear;
    filter: hue-rotate(360deg);
}
</style>