<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Fund } from './data'
const data = ref<Fund[]>([])
const columns = [
    { title: '主题', key: 'theme' },
    { title: '名称', key: 'name' },
    { title: '代码', key: 'code' },
    { title: '收益', key: 'profit', align: 'right', sort: 'profit' },
    { title: '本金', key: 'capital', sort: 'capital' },
]
const originList = [
    { theme: '新能车', name: '东方新能源', code: '123456', profit: -0.4, capital: 0.9, unit: 'w', id: '1' },
    { theme: '新能车', name: '东方新能源', code: '123456', profit: 0.1, capital: 0.1, unit: 'w', id: '2' },
    { theme: '新能车', name: '东方新能源', code: '123456', profit: -0.3, capital: 0.3, unit: 'w', id: '3' },
    { theme: '新能车', name: '东方新能源', code: '123456', profit: 0.2, capital: 0.2, unit: 'w', id: '4' },
    { theme: '新能车', name: '东方新能源', code: '123456', profit: -0.3, capital: 0.4, unit: 'w', id: '5' },
    { theme: '新能车', name: '东方新能源', code: '123456', profit: 0.3, capital: 0.8, unit: 'w', id: '6' },
    { theme: '新能车', name: '东方新能源', code: '123456', profit: -0.5, capital: 0.9, unit: 'w', id: '7' },
]
const list = ref(JSON.parse(JSON.stringify(originList)))
const sortColor = {
    '-1': 'desc',
    '1': 'asc'
}
const sort = reactive({
    profit: 0,
    capital: 0
})
function onSort(key) {
    if (key) {
        const data = JSON.parse(JSON.stringify(originList))
        let value = sort[key] + 1
        sort[key] = value = value === 2 ? -1 : value
        list.value = list.value.sort((a, b) => {
            if (value === 0) return 0
            return  value === 1 ? a[key] - b[key] : b[key] - a[key]
        })
    }
}
</script>

<template>
    <section class="fund">
        <div v-for="({title, key, align, sort: sortKey}) in columns" class="fund-item theme" :class="key" :key="key">
            <ul class="fund-content" :class="[align]">
                <li @click="onSort(sortKey)" class="fund-title">
                    <span class="fund-value">{{title}}</span>
                    <span v-if="sortKey" class="fund-sort" :class="sortColor[sort[sortKey]]"></span>
                </li>
                <li v-for="item in list" class="fund-text" :key="`${key}-${item.id}`">
                    <span class="fund-value">{{item[key]}}</span>
                </li>
            </ul>
        </div>
    </section>
</template>

<style lang="less" scoped>
.fund {
    --border-color: #eaeaea;
    display: flex;
    border: 1px solid var(--border-color);
}
.fund-item {
    position: relative;
    padding: 0 5px;
    display: flex;
    justify-content: center;
    flex: 1;
    min-width: 60px;
    &.theme {
        flex: 1.5;
    }
    &.name {
        flex: 2.5;
    }
    & + .fund-item {
        border-left: 1px solid var(--border-color);
    }
}
.fund-content {
    display: inline-block;
    max-width: 100%;
    &.right {
        text-align: right;
    }
    &.center {
        text-align: center;
    }
}
.fund-title {
    text-align: center;
}
.fund-text {
    overflow-x: auto;
    &::-webkit-scrollbar {
        display: none;
    }
    &.green::before {
        background-color: #90FF90;
    }
    &.red::before {
        background-color: #FF9090;
    }
}
.fund-value {
    position: relative;
    max-width: 100%;
    display: inline-block;
    line-height: 2;
    white-space: nowrap;
    z-index: 1;
}
.fund-sort {
    position: relative;
    &::before, &::after {
        content: '';
        position: absolute;
        margin-left: 1px;
        width: 0px;
        height: 0px;
        border: 3.5px solid transparent;

    }
    &::before {
        top: -0.5px;
        border-bottom-color: var(--border-color);
    }
    &::after {
        top: 8.5px;
        border-top-color: var(--border-color);
    }
    &.asc::before {
        border-bottom-color: #90f0ff;
    }
    &.desc::after {
        border-top-color: #90f0ff;
    }
}
.fund-title, .fund-text {
    & + & {
        &::before {
            content: '占';
            position: absolute;
            left: 0;
            right: 0;
            line-height: 2;
            color: transparent;
        }
        &::after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            height: 1px;
            background-color: var(--border-color);
            transform: scaleY(0.5);
        }
    }
}
</style>