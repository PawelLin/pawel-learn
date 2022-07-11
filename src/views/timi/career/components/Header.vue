<script lang="ts" setup>
const emit = defineEmits(['left', 'right'])
</script>

<template>
    <header class="header">
        <div class="header-left" @click="emit('left')">&lt;</div>
        <div class="header-title">Credit Cards</div>
        <div class="header-right" @click="emit('right')">&gt;</div>
    </header>
</template>

<style lang="less" scoped>
.header {
    padding: 0 15px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 1px 10px #f0f0f0;
    &-left {
        display: flex;
        align-items: center;
        width: 30px;
        height: 100%;
    }
    &-title {

    }
    &-right {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 30px;
        height: 100%;
    }
}
</style>