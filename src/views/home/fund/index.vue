<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Fund } from './data'
const data = ref<Fund[]>([])
const columns = [
    { title: '主题', key: 'theme' },
    { title: '名称', key: 'name' },
    { title: '代码', key: 'code' },
    { title: '收益', key: 'profit', align: 'right', sort: 'profit', getClass: profit => profit === 0 ? 'default' : profit > 0 ? 'red' : 'green' },
    { title: '本金', key: 'capital', align: 'right', sort: 'capital' },
]
const originList = [
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
const sortByKey = ref('')
function onSort(key) {
    if (key) {
        sortByKey.value = key
        const data = JSON.parse(JSON.stringify(originList))
        let value = sort[key] + 1
        sort[key] = value = value === 2 ? -1 : value
        list.value = data.sort((a, b) => {
            if (value === 0) return 0
            return  value === 1 ? a[key] - b[key] : b[key] - a[key]
        })
    }
}
</script>

<template>
    <section class="fund">
        <div v-for="({title, key, align, sort: sortKey, getClass}) in columns" class="fund-item theme" :class="key" :key="key">
            <ul class="fund-content" :class="[align]">
                <li @click="onSort(sortKey)" class="fund-title" :class="sortKey ? 'sort' : null">
                    <span class="fund-value">{{title}}</span>
                    <span v-if="sortKey" class="fund-sort" :class="sortKey === sortByKey ? sortColor[sort[sortKey]] : null"></span>
                </li>
                <li v-for="item in list" class="fund-text" :class="getClass ? getClass(item.profit) : null" :key="`${key}-${item.id}`">
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
    &.sort {
        cursor: pointer;
    }
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
        border: 4px solid transparent;

    }
    &::before {
        top: -1px;
        border-bottom-color: var(--border-color);
    }
    &::after {
        top: 9px;
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