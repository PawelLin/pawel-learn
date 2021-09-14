<template>
    <div class="timi-all">
        <ul class="menu">
            <li v-for="(item, index) in seasons" :key="item.title" @click="type = index">
                <span :class="index === type && 'active'">{{item.title}}</span>
            </li>
        </ul>
        <div class="contain">
            <!-- <div class="title">
                {{seasons[type].list[0].year}}
            </div> -->
            <div class="list">
                <div v-for="item in seasons[type].list" class="item" :key="item.date">
                    <div class="date">
                        {{item.month}}月
                        <p class="day">{{item.day}}</p>
                    </div>
                    <div class="image">
                        <img v-for="image in item.image" :src="getImageUrl(image.icon)" alt="" :key="image.name">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { datas } from '../skin/data'
import { history } from './history'

export default defineComponent({
    setup() {
        const skinData = {}
        datas.forEach(list => {
            list.forEach(item => {
                skinData[item.name] = item
            })
        })
        const seasons = []
        let seasonIndex = 0
        history.forEach((item, index) => {
            let name = item.name
            if (!index) {
                name = item.name.split('\n').map(name => name.trim()).join('')
            }
            if (!item.content.includes('返场')) {
                name.split('|').forEach(name => {
                    if (name) {
                        const key = name.match(/S(\d+)/)
                        if (key) {
                            seasonIndex = Number(key[1]) - 1
                            const date = item.date || item.start
                            const [year, month, day] = date.split('-')
                            seasons[seasonIndex] = {
                                title: key[0],
                                list: [{
                                    date, year, month, day,
                                    image: []
                                }],
                                dates: [date]
                            }
                        } else {
                            const skinItem = skinData[name]
                            if (skinItem) {
                                const date = item.date || item.start
                                const listIndex = seasons[seasonIndex].dates.indexOf(date)
                                if (listIndex > -1) {
                                    seasons[seasonIndex].list[listIndex].image.push(skinData[name])
                                } else {
                                    const [year, month, day] = date.split('-')
                                    seasons[seasonIndex].list.push({
                                        date, year, month, day,
                                        image: [skinData[name]]
                                    })
                                    seasons[seasonIndex].dates.push(date)
                                }
                            }
                        }
                    }
                })
            }
        })
        const type = ref(2)
        const modules = import.meta.globEager('../../../assets/skin/**/*.*')
        const getImageUrl = (dir:string):string => {
            const path = `../../../assets/${dir}`
            return modules[path].default
        }
        return {
            getImageUrl,
            seasons,
            type
        }
    },
})
</script>

<style lang="less" scoped>
.timi-all {
    display: flex;
    height: calc(100vh - 64px);
    .menu {
        padding-top: 5px;
        height: 100%;
        overflow: auto;
        text-align: center;
        &::-webkit-scrollbar {
            width: 0;
            height: 0;
            opacity: 0;
        }
        > li {
            padding: 10px;
            width: 70px;
            color: #666;
            cursor: pointer;
            > span.active {
                border: 1px solid #666;
                border-radius: 5px;
            }
        }
    }
    .contain {
        position: relative;
        flex: 1;
        height: 100%;
        color: #666;
        font-size: 14px;
        .title {
            position: absolute;
            top: 6px;
            margin-bottom: 5px;
            font-weight: bold;
        }
        .list {
            padding: 13px 0 8px;
            height: 100%;
            overflow: auto;
        }
        .item {
            display: flex;
            .date {
                margin-right: 10px;
                min-width: 30px;
                text-align: right;
                white-space: nowrap;
                .day {
                    margin-top: 5px;
                    font-size: 16px;
                    font-weight: bold;
                }
            }
            .image {
                font-size: 0;
                img {
                    margin: 0 5px 5px 0;
                    width: 40px;
                    height: 40px;
                    background-image:url('@/assets/picture-icon.png');
                    background-size: contain;
                }
            }
            & + .item {
                margin-top: 5px;
            }
        }
    }
}
</style>
