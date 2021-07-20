<template>
    <div class="contain">
        <div class="item" :style="{ backgroundImage: `url(/src/assets/${types[data.type]})` }">{{data.type.indexOf('0') === 0 ? data.title : ''}}</div>
        <div v-if="data.children && data.children.length">
            <timi-skin-contain v-for="item in data.children" :data="item" :key="item.title + item.type" />
        </div>
        <div v-else>
            <img v-for="item in data.data" src="@/assets/logo.png" :title="item.name" :key="item.name + item.type" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { types } from './data'

export default defineComponent({
    name: 'TimiSkinContain',
    props: {
        data: {
            type: Object,
            default () {
                return {
                    title: '',
                    children: [],
                    data: []
                }
            }
        }
    },
    setup () {
        return {
            types
        }
    }
})
</script>

<style lang="less" scoped>
.contain {
    display: flex;
    align-items: center;
    font-size: 0;
    img {
        // margin: 5px 5px 0 0;
        height: 38px;
    }
}
.item {
    min-width: 120px;
    min-height: 38px;
    font-size: 16px;
    line-height: 38px;
    text-align: center;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    // background-color: #f9c;
    // background-color: #f9c;
}
@media screen and (max-width:600px) {
    .contain {
        img {
            height: 25.33333px;
        }
    }
    .item {
        min-width: 80px;
        min-height: 25.33333px;
    }
}
</style>