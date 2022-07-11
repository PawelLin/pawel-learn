<script lang="ts" setup>
import { reactive, ref } from 'vue'
const isDark = ref(false)
const list = reactive(Array.from(Array(5)).map((item, index) => ({ selected: false, key: index })))
const changeSelected = item => {
    item.selected = !item.selected
}

</script>

<template>
    <section class="soft-ui" :class="isDark ? 'dark': null">
        <div class="switch">
            <div @click="isDark = !isDark" class="switch-light" :class="isDark ? 'selected' : null"></div>
        </div>
        <ul class="buttons">
            <li v-for="item in list" @click="changeSelected(item)" class="button" :class="item.selected ? 'selected' : null" :key="item.key"></li>
        </ul>
    </section>
</template>

<style lang="less" scoped>
@background-color: #e8f2fb;
@background-color-card: #e3edf7;
@shadow-color-left: #ffffff;
@shadow-color-right: #d3e0ec;
@background-color-dark: #535a61;
@background-color-card-dark: #545a61;
@shadow-color-left-dark: rgba(255, 255, 255, 0.12);
@shadow-color-right-dark: rgba(0, 0, 0, 0.36);
.soft-ui {
    --background-color: @background-color;
    --background-color-card: @background-color-card;
    --shadow-color-left: @shadow-color-left;
    --shadow-color-right: @shadow-color-right;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 64px);
    background-color: var(--background-color);
    &.dark {
        --background-color: @background-color-dark;
        --background-color-card: @background-color-card-dark;
        --shadow-color-left: @shadow-color-left-dark;
        --shadow-color-right: @shadow-color-right-dark;
    }
}
.switch {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}
.switch-light, .switch-dark {
    width: 30px;
    height: 30px;
    border-radius: 15px;
}
.switch-light {
    background-color: @background-color-card;
    box-shadow: inset 3px 3px 6px @shadow-color-right,
                inset -3px -3px 6px @shadow-color-left;
    &.selected {
        background-color: @background-color-card-dark;
        box-shadow: inset 3px 3px 6px @shadow-color-right-dark,
                    inset -3px -3px 6px @shadow-color-left-dark;
    }
}
.buttons {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
}
.button {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    background-color: var(--background-color-card);
    box-shadow:  3px 3px 6px var(--shadow-color-right),
                -3px -3px 6px var(--shadow-color-left);
    &.selected {
        box-shadow: inset 3px 3px 6px var(--shadow-color-right),
                    inset -3px -3px 6px var(--shadow-color-left);
    }
}
</style>