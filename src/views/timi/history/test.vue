<template>
    <table class="table" cellspacing="0" cellpadding="0" border="0">
        <thead>
            <th :colspan="2 + NUMBER * 3">
                <div class="year">
                    <span @click="setActive(active - 1)">{{active - 1}}</span>
                    <span>{{active}}</span>
                    <span @click="setActive(active + 1)">{{active + 1}}</span>
                </div>
            </th>
        </thead>
        <tr>
            <th>月份</th>
            <template v-for="i in NUMBER" :key="i">
                <th></th>
                <th>上架时间</th>
                <th>品质</th>
            </template>
            <!-- <th>小计</th> -->
            <!-- <th>合计</th> -->
        </tr>
        <template v-for="({ data, colspan }, indexs) in list[active]">
            <tr v-for="(items, index) in data" :key="index">
                <td v-if="!index" :rowspan="data.length" class="text-center">{{indexs + 1}}月</td>
                <template v-for="({ name, icon, date, type }) in items" :key="name">
                    <td>
                        <img :src="getImageUrl(icon)">
                        {{name}}
                    </td>
                    <td>{{date}}</td>
                    <td class="text-center">{{type}}</td>
                </template>
                <td v-if="data.length - 1 === index && colspan" :colspan="colspan">{{colspan}}</td>
                <!-- <td v-if="!index" :rowspan="data.length" class="text-center">{{}}</td> -->
            </tr>
        </template>
    </table>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { history } from './history'
import { datas } from '../skin/data'
import { getImageUrl } from '@/libs/utils'

export default defineComponent({
    setup() {
        const NUMBER = 3
        const skinData = {}
        datas.forEach(list => {
            list.forEach(item => {
                skinData[item.name] = item
            })
        })
        const list = {}
        let numberIndex = 0
        history.forEach(items => {
            const date = items.date || items.start
            const [year, month] = date.split('-').map(item => Number(item))
            const type = items.content.includes('返场') ? '2' : '1'
            if (type !== '2') {
                items.name.replace(/\s|\n/g, '').split('|').forEach(key => {
                    const { icon, name, type } = skinData[key] || {}
                    if (name && type !== '0') {
                        const items = list[year]
                        if (!items) {
                            const data = Array.from(Array(12)).map(() => [])
                            numberIndex = 0
                            data[month - 1][numberIndex] = [{ icon, name, type, date }]
                            list[year] = data
                        }
                        else {
                            const item = list[year][month - 1]
                            if (item[numberIndex]) {
                                item[numberIndex].push({ icon, name, type, date })
                                if (item[numberIndex].length === 3) {
                                    numberIndex++
                                    item[numberIndex] = []
                                }
                            } else {
                                // numberIndex = 0
                                // item[numberIndex] = [{ icon, name, type, date }]
                            }
                        }
                    }
                })
            }
        })
        
        Object.keys(list).forEach(key => {
            list[key].forEach((items, index) => {
                let colspan = 0
                if (items.length) {
                    const lastIndex = items.length - 1
                    const lastItemLength = items[lastIndex].length
                    if (lastItemLength === 0) {
                        items.splice(lastIndex, 1)
                    } else if (lastItemLength !== 3) {
                        colspan = (NUMBER - lastItemLength) * NUMBER
                    }
                }
                list[key][index] = {
                    data: items,
                    colspan
                }
            })
        })
        console.log(list)
        const active = ref(2021)
        const setActive = value => {
            active.value = value
        }
        return {
            list,
            active,
            NUMBER,
            setActive,
            getImageUrl
        }
    }
})
</script>

<style lang="less" scoped>
@border: 1px solid #eaeaea;
.table {
    margin: 10px 0 0 20px;
    // border-collapse: collapse;
    font-size: 16px;
    border-top: @border;
    border-left: @border;
    th, td {
        padding: 4px;
        border-right: @border;
        border-bottom: @border;
    }
    .year {
        display: flex;
        justify-content: space-around;
        > span {
            &:nth-child(2) {
                flex: 1;
            }
            &:nth-child(1), &:nth-child(3) {
                cursor: pointer;
            }
        }
    }
    .text-center {
        text-align: center;
    }
    img {
        width: 20px;
        height: 20px;
        vertical-align: middle;
    }
}
</style>