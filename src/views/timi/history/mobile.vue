<template>
    <div class="timi-history-mobile">
        <ul ref="menuRef" class="menu">
            <li :ref="setTabRef" v-for="(item, index) in seasons" :key="item.title" @click="handleSetScroll(index, item.title)">
                <span :class="item.title === type ? 'active' : null">{{item.title}}</span>
            </li>
        </ul>
        <div class="contain">
            <div class="title">
                {{year}}
            </div>
            <div ref="listRef" class="list" @scroll="handleScroll">
                <div v-for="season in seasons" class="season" :key="season.title">
                    <div v-for="item in season.list" class="item" :key="item.date">
                        <div class="date">
                            {{item.month}}月
                            <p class="day">{{item.day}}</p>
                        </div>
                        <div class="image">
                            <img :ref="(el) => setImageRef(el, image, item.year, season.title)" v-for="image in item.image" src="@/assets/picture-icon.png" :title="image.name" :key="image.name">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { datas } from '../skin/data'
import { history } from './history'
import { getImageUrl } from '@/libs/utils'

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
        const type = ref('S1')
        const year = ref('')
        const listRef = ref(null)
        const imageRefs = []
        const scrollTabs = []
        const setImageRef = (el, item, year, title) => {
            if (el) {
                el.imageData = { ...item, year, title }
                imageRefs.push(el)
            }
        }
        const menuRef = ref(null)
        const tabRefs = []
        const setTabRef = el => {
            el && tabRefs.push(el)
        }
        const handleScroll = e => {
            const scrollTop = listRef.value.scrollTop
            const heightTop = listRef.value.offsetHeight + scrollTop
            imageRefs.forEach((image, index) => {
                const top = image.offsetTop
                const data = image.imageData
                if (heightTop >= top && top >= scrollTop && !data.isLoaded) {
                    image.src = getImageUrl(data.icon)
                    data.isLoaded = true
                }
                if (Math.abs((scrollTop + imageRefs[0].offsetTop) - top) <= 10) {
                    year.value = data.year
                    type.value = data.title
                    const index = Number(data.title.replace('S', '')) - 1
                    const scrollTop = menuRef.value.scrollTop
                    const offsetHeight = menuRef.value.offsetHeight
                    const offsetTop = tabRefs[index].offsetTop
                    const heightTop = offsetHeight + scrollTop - tabRefs[0].offsetTop
                    if (heightTop < offsetTop) {
                        menuRef.value.scrollTop = offsetTop - offsetHeight + tabRefs[index].offsetHeight
                    }
                    if (offsetTop < scrollTop) {
                        menuRef.value.scrollTop = offsetTop
                    }
                }
                if (!e) {
                    const preImage = imageRefs[index - 1]
                    if (!preImage || (preImage.imageData.title !== data.title)) {
                        scrollTabs.push(top - imageRefs[0].offsetTop)
                    }
                }
            })
        }
        const handleSetScroll = (index, title) => {
            type.value = title
            listRef.value.scrollTop = scrollTabs[index]
        }
        onMounted(() => {
            handleScroll()
            const index = seasons.length - 1
            handleSetScroll(index, seasons[index].title)
        })
        return {
            getImageUrl,
            seasons,
            type,
            year,
            listRef,
            menuRef,
            handleScroll,
            handleSetScroll,
            setImageRef,
            setTabRef
        }
    },
})
</script>

<style lang="less" scoped>
.timi-history-mobile {
    display: flex;
    height: calc(100vh - 64px);
    .menu {
        position: relative;
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
            // top: 6px;
            padding-top: 8px;
            width: 100%;
            font-weight: bold;
            background-color: rgba(255, 255, 255, 0.8);
        }
        .list {
            padding: 23px 0 8px;
            height: 100%;
            overflow: auto;
        }
        .season {
            &:last-child {
                min-height: 100%;
            }
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
                    // background-image:url('@/assets/picture-icon.png');
                    // background-size: contain;
                }
            }
            & + .item {
                margin-top: 5px;
            }
        }
    }
}
</style>
