<template>
    <div class="timi-history-pc">
        <div v-for="{ year, data } in list" class="content" :key="year">
            <p class="year">{{year}}</p>
            <div class="images">
                <div class="contain" v-for="(items, index) in data" :key="index">
                    <p class="date">{{index + 1}}</p>
                    <div class="image">
                        <img v-for="item in items" :src="getImageUrl(item.icon)" :title="item.date" :key="item.icon">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { history } from './history'
import { datas } from '../skin/data'
import { getImageUrl } from '@/libs/utils'

export default defineComponent({
    setup() {
        const skinData = {}
        datas.forEach(list => {
            list.forEach(item => {
                skinData[item.name] = item
            })
        })
        const list = []
        const years = []
        history.forEach(items => {
            const date = items.date || items.start
            const [year, month] = date.split('-').map(item => Number(item))
            const type = items.content.includes('返场') ? '2' : '1'
            if (type !== '2') {
                items.name.replace(/\s|\n/g, '').split('|').forEach(name => {
                    const item = skinData[name]
                    if (item) {
                        const index = years.indexOf(year)
                        if (index === -1) {
                            years.push(year)
                            const data = Array.from(Array(12)).map(() => [])
                            data[month - 1].push({
                                icon: item.icon,
                                name: item.name,
                                date,
                                type
                            })
                            list.push({
                                year,
                                data
                            })
                        } else {
                            list[index].data[month - 1].push({
                                icon: item.icon,
                                name: item.name,
                                date,
                                type
                            })
                        }
                    }
                })
            }
        })
        return {
            list: list.reverse(),
            getImageUrl
        }
    },
})
</script>


<style lang="less" scoped>
.timi-history-pc {
    padding: 10px;
}
.content {
    display: flex;
    font-size: 0;
    align-items: baseline;
    & + .content {
        margin-top: 10px;
    }
    .year {
        font-size: 16px;
        white-space: nowrap;
        border-bottom: 1px solid #666;
    }
    .images {
        flex: 1;
        display: flex;
    }
    .contain {
        flex: 1;
    }
    .date {
        position: relative;
        padding-top: 5px;
        font-size: 16px;
        text-align: center;
        border-bottom: 1px solid #666;
        &::before {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 1px;
            height: 5px;
            background-color: #666;
        }
    }
    .image {
        padding: 0 5px;
    }
    img {
        margin: 0 3px 3px 0;
        width: 35px;
        height: 35px;
    }
}
</style>