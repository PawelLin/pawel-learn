<template>
    <div class="contain">
        <div class="title">mask</div>
        <div class="item">
            <img class="mask img" src="@/assets/source/kpl.png" alt="">
            <div class="mask icon"></div>
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
    margin-left: 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    margin-top: -10px;
    > .mask {
        margin: 10px 10px 0 0;
        width: 100px;
        &.icon {
            height: 100px;
            background-color: #03A9F3;
            -webkit-mask: url(../../assets/source/kpl.png) no-repeat;
            -webkit-mask-size: 100% auto;
        }
    }
}
</style>