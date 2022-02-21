<template>
    <div class="contain">
        <div class="title">Layout</div>
        <div class="item">
            <ul class="layout flex1">
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
            </ul>
            <ul class="layout flex2">
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
            </ul>
            <ul class="layout flex3">
                <li>1</li>
                <li>bottom button</li>
            </ul>
            <ul class="layout flex4">
                <li v-for="i in 18" :key="i">{{i}}</li>
            </ul>
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
    > .layout {
        margin: 10px 10px 0 0;
        width: 120px;
        color: #fff;
        background-color: #f9c;
        > li {
            background-color: #03A9F3;
        }
    }
    .flex1 {
        display: flex;
        > li {
            min-width: 20px;
            text-align: center;
            border-right: 1px solid;
        }
        > li:last-child {
            margin-left: auto;
            border-left: 1px solid;
            border-right: 0;
        }
    }
    .flex2 {
        display: flex;
        flex-direction: column;
        height: 100px;
        text-align: center;
        > li {
            border-bottom: 1px solid;
        }
        > li:nth-child(2) {
            border-top: 1px solid;
            margin-top: auto;
        }
        > li:nth-child(3) {
            margin-bottom: auto;
        }
        > li:last-child {
            border-top: 1px solid;
            border-bottom: 0;
        }
    }
    .flex3 {
        display: flex;
        flex-direction: column;
        height: 100px;
        text-align: center;
        > li:first-child {
            border-bottom: 1px solid;
        }
        > li:last-child {
            margin-top: auto;
            border-top: 1px solid;
        }
    }
    @flex4-li-length: 5;
    @flex4-li-length1: @flex4-li-length + 1;
    @flex4-li-margin: 1px;
    .flex4 {
        display: flex;
        flex-wrap: wrap;
        text-align: center;
        border: 1px solid #f9c;
        > li {
            width: calc((100% - @flex4-li-margin * (@flex4-li-length - 1)) / @flex4-li-length);
            &:not(:nth-child(@{flex4-li-length}n)) {
                margin-right: @flex4-li-margin;
            }
            &:nth-child(n + @{flex4-li-length1}) {
                margin-top: @flex4-li-margin;
            }
            border: 1px solid #fff;
        }
    }
}
</style>