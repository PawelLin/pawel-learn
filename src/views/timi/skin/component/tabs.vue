<template>
    <div class="tabs" v-for="(items, indexs) in list" :key="`items${indexs}`">
        <img v-for="(item, index) in items.data" class="icon" :src="getImageUrl(item.icon)" @click="handleShow(item)" :title="item.name" :key="`items${indexs}${index}`">
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
        Object.keys(tabs).forEach(key => {
            if (!['self', 'six', 'lovers'].includes(key)) {
                tabs[key].forEach(item => {
                    number += item.data.length
                })
            }
        })
        console.log(number)
        const list = JSON.parse(JSON.stringify(tabs[props.type]))
        const data = Array.prototype.concat.apply([], datas)
        console.log(data.length - 107)
        list.forEach(items => {
            items.data.forEach((name, index) => {
                items.data[index] = data.filter(item => item.name === name)[0]
                if (index === 0 && items.type) {
                    const type = items.type === 'self' ? items.data[index].type : items.type
                    items.type = types[type]
                }
            })
        })
        // const getImageUrl = (dir:string):string => {
        //     const path = `../../../../assets/${dir}`
        //     return new URL(path, import.meta.url).href
        // }
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
    .icon {
        margin: 5px 5px 0 0;
        width: 40px;
        height: 40px;
        background-image:url('@/assets/picture-icon.png');
        background-size: contain;
    }
    .type {
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
