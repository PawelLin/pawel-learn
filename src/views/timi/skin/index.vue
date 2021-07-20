<template>
    <skin-contain v-for="(item, index) in list" :data="item" :key="`index${index}`" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SkinContain from './contain.vue'
import { datas } from './data'

export default defineComponent({
    components: {
        SkinContain
    },
    setup() {
        const list = [
            { title: '原皮', type: '01', data: [] },
            { title: '伴生', type: '02', data: [] },
            { title: '勇者', type: '1', data: [] },
            { title: '史诗', type: '12', data: [] },
            { title: '传说', type: '15', data: [] },
            { title: '限定', type: '5', data: [] },
            {
                title: '赛季', type: '0',
                children: [
                    { title: 'S3', type: '13', data: [] },
                    { title: 'S4', type: '14', data: [] },
                    { title: 'S5', type: '56', data: [] },
                    { title: 'S6', type: '57', data: [] },
                    { title: 'S7', type: '58', data: [] },
                    { title: 'S8', type: '59', data: [] },
                    { title: 'S9', type: '60', data: [] },
                    { title: 'S10', type: '61', data: [] },
                    { title: 'S11', type: '62', data: [] },
                    { title: 'S12', type: '63', data: [] },
                    { title: 'S13', type: '54', data: [] },
                    { title: 'S14', type: '39', data: [] },
                    { title: 'S15', type: '46', data: [] },
                    { title: 'S16', type: '48', data: [] },
                    { title: 'S17', type: '52', data: [] },
                    { title: 'S18', type: '66', data: [] },
                    { title: 'S19', type: '70', data: [] },
                    { title: 'S20', type: '74', data: [] },
                    { title: 'S21', type: '78', data: [] },
                    { title: 'S22', type: '80', data: [] },
                    { title: 'S23', type: '83', data: [] },
                    { title: 'S24', type: '85', data: [] },
                ]
            },
            {
                title: '周年限定', type: '0',
                children: [
                    { title: '1周年', type: '18', data: [] },
                    { title: '2周年', type: '23', data: [] },
                    { title: '3周年', type: '36', data: [] },
                    { title: '4周年', type: '53', data: [] },
                    { title: '5周年', type: '77', data: [] },
                ]
            },
            {
                title: '节日', type: '0',
                children: [
                    {
                        title: '新年限定', type: '0',
                        children: [
                            { title: '猴年', type: '2', data: [] },
                            { title: '鸡年', type: '20', data: [] },
                            { title: '狗年', type: '25', data: [] },
                            { title: '猪年', type: '43', data: [] },
                            { title: '鼠年', type: '67', data: [] },
                            { title: '牛年', type: '81', data: [] },
                        ]
                    },
                    { title: '新春专属', type: '16', data: [] },
                    {
                        title: '情人节', type: '0',
                        children: [
                            { title: '真爱至上', type: '11', data: [] },
                            { title: '至尊宝', type: '21', data: [] },
                            { title: '武陵仙君', type: '24', data: [] },
                            { title: '紫霞仙子', type: '44', data: [] },
                            { title: '大圣', type: '45', data: [] },
                            { title: '如梦令', type: '68', data: [] },
                            { title: '如梦令', type: '69', data: [] },
                            { title: '默契刀锋', type: '82', data: [] },
                        ]
                    },
                    { title: '圣诞节', type: '37', data: [] },
                ]
            },
            { title: '战令限定', type: '40', data: [] },
            {
                title: '联动', type: '0',
                children: [
                    { title: '御龙在天', type: '17', data: [] },
                    { title: '梅西', type: '28', data: [] },
                    { title: '浪一夏', type: '29', data: [] },
                    { title: 'DC', type: '32', data: [] },
                    { title: '圣斗士', type: '33', data: [] },
                    { title: 'SNK', type: '64', data: [] },
                    { title: '五虎上将', type: '72', data: [] },
                    { title: '仙剑', type: '84', data: [] },
                ]
            },
            {
                title: '赛事', type: '0',
                children: [
                    { title: '赏金赛', type: '8', data: [] },
                    { title: '战队赛', type: '9', data: [] },
                    { title: 'KPL', type: '19', data: [] },
                    {
                        title: '团战精神', type: '0',
                        children: [
                            { title: '坚韧', type: '35', data: [] },
                            { title: '敏锐', type: '30', data: [] },
                            { title: '掌控', type: '31', data: [] },
                            { title: '沉稳', type: '27', data: [] },
                            { title: '守护', type: '34', data: [] },
                        ]
                    },
                    {
                        title: '世冠', type: '0',
                        children: [
                            { title: '2019', type: '49', data: [] },
                            { title: '2020', type: '75', data: [] },
                        ]
                    },
                    {
                        title: 'FMVP', type: '0',
                        children: [
                            { title: 'FMVP', type: '38', data: [] },
                            { title: 'FMVP', type: '51', data: [] },
                        ]
                    }
                ]
            },
            {
                title: 'VIP', type: '0',
                children: [
                    { title: '贵族', type: '6', data: [] },
                    { title: '荣耀典藏', type: '26', data: [] },
                    { title: '贵族', type: '79', data: [] },
                ]
            },
            {
                title: '活动', type: '0',
                children: [
                    { title: '五五开黑节', type: '71', data: [] },
                    { title: '活动专属', type: '50', data: [] },
                    { title: '活动专属', type: '73', data: [] },
                    { title: '源梦', type: '65', data: [] },
                ]
            },
            {
                title: '成长', type: '0',
                children: [
                    { title: '成就限定', type: '3', data: [] },
                    { title: '信誉专属', type: '47', data: [] },
                    { title: '2020王者之证', type: '76', data: [] },
                ]
            }
        ]
        interface Data {
            name: string,
            icon: string,
            url: string,
            type: string
        }
        interface Datas {
            [propName: string]: Data[]
        }
        const data: Datas = {}
        datas.forEach(list => {
            list.forEach((item, index) => {
                const _index = index === 0 ? '01' : item.type === '0' ? '02' : item.type
                data[_index] = data[_index] || []
                data[_index].push(item)
            })
        })
        interface Item {
            title: string,
            type: string,
            children?: Item[],
            data?: Data[]
        }
        const setData = (list: Item[]) => {
            list.forEach(item => {
                if (item.children && item.children.length) {
                    setData(item.children)
                } else {
                    item.data = data[item.type] || []
                }
            })
        }
        setData(list)
        return {
            list
        }
    }
})
</script>
