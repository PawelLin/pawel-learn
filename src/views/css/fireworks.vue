<template>
    <div class="contain">
        <div class="title">fireworks</div>
        <div class="item">
            <div class="fireworks" style="left: 15%; top: 5%;"></div>
            <div class="fireworks" style="right: 30%; top: 13%; animation-delay: -0.4s;"></div>
            <div class="fireworks" style="left: 5%; top: 23%; animation-delay: -1.7s;"></div>
            <div class="fireworks" style="right: 45%; top: 8%; animation-delay: -3.1s;"></div>
        </div>
    </div>
</template>

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
    position: relative;
    margin-left: 10px;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    overflow: hidden;
    background-color: black;
}
.fireworks {
    // position: absolute;
    width: 100px;
    height: 100px;
    background: #FFEFAD;
    mask: url('@/assets/fireworks.png') right top no-repeat;
    mask-size: auto 100px;
    animation: fireworks 2s steps(24) infinite, random 8s steps(1) infinite, random_color 1s infinite;
}
@keyframes fireworks {
    0% {
        -webkit-mask-position: 0%;
    }
    50%,
    100% {
        -webkit-mask-position: 100% 100%;
    }
}

@keyframes random {
    0% {
        transform: translate(0, 0);
    }
    25% {
        transform: translate(200%, 0) scale(0.8);
    }
    50% {
        transform: translate(80%, 0) scale(1.2);
    }
    75% {
        transform: translate(20%, 0) scale(0.65);
    }
}
@keyframes random_color {
    0% {
        background-color: #FFEFAD;
    }
    25% {
        background-color: #ffadad;
    }
    50% {
        background-color: #aeadff;
    }
    75% {
        background-color: #adffd9;
    }
}
@media screen and (prefers-reduced-motion) { 
    /* 禁用不必要的动画 */ 
    .fireworks { 
        animation: none; 
    } 
}
</style>