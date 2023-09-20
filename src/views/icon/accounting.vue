<template>
    <div class="accounting">
        <div class="line line1"></div>
    </div>
</template>

<style lang="less" scoped>
.accounting {
    --red-color: #ed4014;
    --green-color: #19be6b;
    --orange-color: #ff9900;
    --gray-color: #7A7E83;
    --theme-switch-duration: 0.3s;
    --theme-switch-timing-function: ease-in-out;
    /* .page-var-light */
    --primary-color: #e8f2fb;
    --soft-text-color: #000;
    --soft-box-shadow: 1px 1px 2px #d3e0ec, -1px -1px 2px #fff;
    --soft-box-shadow-inset: inset 1px 1px 2px #d3e0ec, inset -1px -1px 2px #fff;
    --soft-text-shadow: 1px 1px 2px #fff, 0 0 0 rgba(0, 0, 0, 0.2), 1px 1px 2px #fff;
    --soft-text-skeleton: 1px 1px 2px rgba(211, 224, 236, 0.6), -1px -1px 2px rgba(255, 255, 255, 0.6);
    position: relative;
    margin-left: 100px;
    width: 144px;
    height: 144px;
    background-color: var(--primary-color);
}
.line {
    position: absolute;
    width: 100%;
    height: 16px;
    border-radius: 8px;
    // background-color: var(--green-color);
    // box-shadow: var(--soft-box-shadow-inset);
    &.line1 {
        margin-top: -6px;
        margin-left: -35%;
        top: 50%;
        left: 50%;
        width: 70%;
        transform-origin: center;
        transform: rotate(-45deg);
        &::after {
            content: '';
            position: absolute;
            top: 3px;
            left: 3px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: var(--green-color);
            // box-shadow: var(--soft-box-shadow-inset);
            box-shadow: var(--soft-box-shadow);
        }
        &::before {
            content: '';
            position: absolute;
            top: 2px;
            right: 3px;
            width: calc(100% - 18px);
            height: 12px;
            border-radius: 6px;
            background-color: var(--green-color);
            box-shadow: var(--soft-box-shadow);
        }
    }
}
.word {
    color: var(--primary-color);
    font-weight: bold;
    font-size: 80px;
    text-shadow: 1px 1px 1px #fff, -1px -1px 1px #d3e0ec;
}
</style>