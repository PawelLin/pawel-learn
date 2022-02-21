<template>
    <div class="tabs" v-for="(items, indexs) in list" :key="`items${indexs}`">
        <span v-if="items.title" class="title">{{items.title}}</span>
        <div>
            <img v-for="(item, index) in items.data" class="icon" :src="getImageUrl(item.icon)" @click="handleShow(item)" :title="item.name" :key="`items${indexs}${index}`">
        </div>
        <img v-if="items.type" class="type" :src="getImageUrl(items.type)">
    </div>
</template>

<script lang="ts">

import { datas, types } from '../data'
import * as tabs from './tabs'
import { defineComponent } from 'vue'
import { getImageUrl } from '@/libs/utils'

export default defineComponent({
    props: {
        type: {
            type: String
        }
    },
    emits: ['modal-show'],
    setup(props, { emit }) {
        let number = 0
        const tabsData = []
        Object.keys(tabs).forEach(key => {
            if (!['six', 'lovers', 'series'].includes(key)) {
                tabs[key].forEach(item => {
                    number += item.data.length
                    tabsData.push(...item.data)
                })
            }
        })
        console.log(number)
        const list = JSON.parse(JSON.stringify(tabs[props.type]))
        const data = Array.prototype.concat.apply([], datas).filter(item => !item.name.includes('-旧'))
        console.log(data.length)
        if (number !== data.length) {
            const dataNames = data.map(item => item.name)
            dataNames.forEach(name => {
                if (!tabsData.includes(name)) {
                    console.log(name)
                } else if (dataNames.indexOf(name) !== dataNames.lastIndexOf(name)) {
                    console.log(name)
                }
            })
        }
        list.forEach(items => {
            items.data.forEach((name, index) => {
                items.data[index] = data.filter(item => item.name === name)[0]
                if (index === 0 && items.type) {
                    const type = items.type === 'self' ? items.data[index].type : items.type
                    items.type = types[type]
                }
            })
        })
        const handleShow = item => {
            emit('modal-show', item)
        }
        return {
            list,
            getImageUrl,
            handleShow
        }
    },
})
</script>

<style lang="less" scoped>
.tabs {
    font-size: 0;
    display: flex;
    .title {
        margin: auto 0;
        padding-right: 10px;
        min-width: 52px;
        font-size: 14px;
        color: #666;
        text-align: right;
        vertical-align: middle;
    }
    .icon {
        margin: 5px 5px 0 0;
        width: 40px;
        height: 40px;
        background-image:url('@/assets/picture-icon.png');
        background-size: contain;
    }
    .type {
        margin: auto 0;
        max-height: 30px;
    }
    img {
        vertical-align: middle;
    }
    & + .tabs {
        margin-top: 5px;
    }
}
</style>
