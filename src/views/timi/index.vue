<template>
    <section class="timi">
        <section class="contain" :style="{ transform: `translate3d(${translateX}%, 0, 0)` }">
            <div v-for="({ year, months, skinsLength, herosLength }, index1) in list" :key="year">
                <p>
                    <a v-if="index1" @click="handleTransform(1, year - 1)" href="javascript:;">{{year - 1}}</a>
                    <span>[{{skinsLength}}]</span>
                    {{year}}
                    <span>[{{herosLength}}]</span>
                    <a v-if="index1 < list.length - 1" @click="handleTransform(-1, year + 1)" href="javascript:;">{{year + 1}}</a>
                </p>
                <div v-for="({ skins, title, heros, isKing }, index2) in months" :key="`${year}${index2}`" v-show="showYears.includes(year)">
                    <div class="skin">
                        <template v-for="({ src, alt }, index3) in skins" >
                            <!-- <div v-for="(img, index4) in src" class="image" :style="{ backgroundImage: `url(${getImageUrl(img)})` }" :title="alt[index4]" :key="`${year}${index2}${index3}${index4}`"></div> -->
                            <img v-for="(img, index4) in src" class="image" :src="getImageUrl(img)" :title="alt[index4]" :key="`${year}${index2}${index3}${index4}`">
                        </template>
                    </div>
                    <div class="timeline">
                        <div class="month" :class="isKing && 'king'" :title="isKing">{{title}}</div>
                    </div>
                    <div class="hero">
                        <template v-for="({ src, alt }, index3) in heros" >
                            <!-- <div v-for="(img, index4) in src" class="image" :style="{ backgroundImage: `url(${getImageUrl(img)})` }" :title="alt[index4]" :key="`${year}${index2}${index3}${index4}`"></div> -->
                            <img v-for="(img, index4) in src" class="image" :src="getImageUrl(img)" :title="alt[index4]" :key="`${year}${index2}${index3}${index4}`">
                        </template>
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { skins, heros, kings } from './data'
import { getImageUrl } from '@/libs/utils'

export default defineComponent({
    setup() {
        interface Month {
            skins: { src:string[], alt:string[], day:number }[],
            title: string,
            heros: { src:string[], alt:string[], day:number }[]
        }
        interface Item {
            year: number,
            months: Month[],
            skinsLength?: number,
            herosLength?: number
        }
        interface Index {
            [propName: string]: number
        }
        const kingMonths = Object.keys(kings).map(date => ({ date: date.replace(/(\d+)-(\d+)-(.*)/, '$1-$2'), season: kings[date].alt })).reduce((item, { date, season }) => (item[date] = season) && item || item, {})
        const list: Item[] = []
        const yearIndex: Index = {}
        const NAME = ['寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子', '丑']
        Object.keys(skins).forEach(key => {
            let [year, month, day] = key.replace(/(\d+)-(\d+)-(\d+)/, '$1,$2,$3').split(',').map(value => Number(value))
            month = month - 1
            if (yearIndex[year] === undefined) {
                yearIndex[year] = list.length
                // list.push({ year, months: Array.from(Array(12)).map((item, index) => ({ skins: [], title: index + 1, heros: [] })) })
                list.push({ year, months: Array.from(Array(12)).map((item, index) => ({ skins: [], title: NAME[index], isKing: kingMonths[`${year}-${index + 1}`], heros: [] })) })
            }
            let { src, alt } = skins[key]
            list[yearIndex[year]].months[month].skins.push({ src: ([] as string[]).concat(src), alt: ([] as string[]).concat(alt), day })
        })
        Object.keys(heros).forEach(key => {
            let [year, month, day] = key.replace(/(\d+)-(\d+)-(\d+)/, '$1,$2,$3').split(',').map(value => Number(value))
            month = month - 1
            if (yearIndex[year] === undefined) {
                yearIndex[year] = list.length
                list.push({ year, months: Array.from(Array(12)).map((item, index) => ({ skins: [], title: NAME[index], heros: [] })) })
            }
            let { src, alt } = heros[key]
            list[yearIndex[year]].months[month].heros.push({ src: ([] as string[]).concat(src), alt: ([] as string[]).concat(alt), day })
        })
        list.forEach(({ months }, index) => {
            let skinsLength = 0
            let herosLength = 0
            months.forEach(({ skins, heros }) => {
                skins.sort((a, b) => a.day - b.day).forEach(({ src }) => {
                    skinsLength += src.length
                })
                heros.sort((a, b) => a.day - b.day).forEach(({ src }) => {
                    herosLength += src.length
                })
            })
            list[index].skinsLength = skinsLength
            list[index].herosLength = herosLength
        })
        list.sort((a, b) => a.year - b.year)
        const start = Math.max(0, list.length - 1)
        let translateX = ref(-100 * start)
        const handleTransform = (value:number, year: number):void => {
            if (!showYears.includes(year)) {
                showYears.push(year)
            }
            translateX.value += value * 100
        }
        const allYear = list.map(item => item.year)
        const showYears = document.body.clientWidth > 600 ? allYear : [allYear[start]]
        return {
            list,
            translateX,
            handleTransform,
            getImageUrl,
            showYears
        }
    },
})
</script>

<style lang="less" scoped>
@imgWidth: 30px;
.timi {
    > .contain {
        display: flex;
        > div {
            // padding: 0 5px;
            flex: 1;
            > p {
                position: relative;
                padding: 10px 0;
                font-size: 18px;
                text-align: center;
                > span, > a {
                    font-size: 12px;
                }
                > a {
                    display: none;
                    position: absolute;
                    bottom: 12px;
                    &:first-child {
                        left: 10px;
                    }
                    &:last-child {
                        right: 10px;
                    }
                }
            }
            > div {
                display: flex;
                font-size: 0;
                > .skin, .hero {
                    flex: 1;
                    > .image {
                        margin-top: 5px;
                        width: @imgWidth;
                        height: @imgWidth;
                        background-image:url('@/assets/picture-icon.png');
                        background-size: contain;
                    }
                }
                .skin {
                    text-align: right;
                    > .image {
                        margin-left: 5px;
                    }
                }
                .hero {
                    text-align: left;
                    > .image:not(:last-child) {
                        margin-right: 5px;
                    }
                }
                > .timeline {
                    margin: 0 10px;
                    > .month {
                        position: relative;
                        margin-top: 5px;
                        width: @imgWidth;
                        height: @imgWidth;
                        line-height: @imgWidth;
                        font-size: 14px;
                        text-align: center;
                        border: 1px solid #eaeaea;
                        border-radius: 50%;
                        &.king {
                            border: 0;
                            &::after {
                                content: '';
                                position: absolute;
                                top: -7px;
                                right: -5px;
                                bottom: -7px;
                                left: -5px;
                                background-image: url(@/assets/rank/rank16.png);
                                background-size: cover;
                                z-index: 1;
                            }
                        }
                    }
                }
                & + div {
                    margin-top: 5px;
                }
                &:not(:last-child) {
                    position: relative;
                    &:after {
                        content: '';
                        position: absolute;
                        top: @imgWidth + 5px;
                        bottom: -10px;
                        left: 50%;
                        width: 1px;
                        background-color: #eaeaea;
                    }
                }
            }
        }
    }
}
@media screen and (orientation: portrait) {
    .timi {
        overflow-x: hidden;
        > .contain {
            transition: 0.3s transform ease-in-out;
            > div {
                padding: 44px 0 10px;
                min-width: 100%;
                max-width: 100%;
                max-height: calc(100vh - 64px);
                overflow-y: auto;
                > p {
                    position: absolute;
                    top: 0;
                    width: 100%;
                    background-color: #fff;
                    box-shadow: 0 2px 10px rgb(255, 255, 255, 0.8);
                    z-index: 2;
                    > a {
                        display: block;
                    }
                }
            }
        }
    }
}
</style>
