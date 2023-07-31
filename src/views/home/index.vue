<template>
    <div class="home">
        <!-- <h1>JavaScript Learning</h1> -->
        <!-- <InputNumber v-model="number"/> -->
        <!-- <Fund /> -->
        <!-- <Cascade :data="object" /> -->abc
        <Cascade :data="data" />
        <Cascade :data="data" align="center" />
        <Cascade :data="data" align="bottom" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Cascade from './cascade.vue'
import InputNumber from '@/components/input/number.vue'
import Fund from './fund/index.vue'
const number = ref('1')
const object = [{
    title: 'Object',
    rightChildren: [
        { title: 'Reflect' }
    ]
}]
const data = 
    [{
        title: '1-1',
        leftChildren: [
            { title: '1-2', children: [
                { title: '1-2-1' },
                { title: '1-2-2' },
            ] },
            { title: '1-4', children: [
                { title: '1-4-1' },
                { title: '1-4-2' },
            ] },
        ],
        rightChildren: [
            { title: '1-3', children: [
                { title: '1-3-1' },
                { title: '1-3-2' },
            ] },
            { title: '1-5', children: [
                { title: '1-5-1' },
                { title: '1-5-2' },
            ] },
        ]
    }]

</script>


<style lang="less" scoped>
.home {
    padding: 20px;
    text-align: center;
}
</style>