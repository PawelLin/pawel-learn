<template>
    <div class="timi-kpl" @scroll="handleScroll">
        <ul class="count">
            <li v-for="i in 5" @click="setCount(i - 1)" :class="(i - 1) === form.count ? 'active' : null" :key="i">
                <span>组合{{i}}</span>
            </li>
        </ul>
        <table class="table" cellspacing="0" cellpadding="0" border="0">
            <tr>
                <th @click="showHeroModal(index)" v-for="(item, index) in (form.count + 1)" :key="index">
                    {{heros[heroSelected[index]] || `英雄${index + 1}`}}
                    <i class="arrow" :class="modalHeroIndex === index ? 'show' : null"></i>
                </th>
                <th @click="setSelected('pick')" :class="form.selected === 'pick' ? 'selected' : null" class="pick">
                    {{!form.count ? '被pick次数' : '场次'}}
                    <i class="arrow" :class="!form.pick ? 'up' : null"></i>
                </th>
                <th @click="setSelected('rate')" :class="form.selected === 'rate' ? 'selected' : null" class="rate">
                    胜率
                    <i class="arrow" :class="!form.rate ? 'up' : null"></i>
                </th>
                <template v-if="!form.count">
                    <th @click="setSelected('ban')" :class="form.selected === 'ban' ? 'selected' : null" class="ban">
                        被ban次数
                        <i class="arrow" :class="!form.ban ? 'up' : null"></i>
                    </th>
                </template>
            </tr>
            <tr v-for="(item, index) in result" :key="index">
                <td v-for="(key, inde) in item.key" :key="`${index}${inde}`"><img class="image" :src="getImageUrl(key)"></td>
                <td>{{item.pick}}</td>
                <td>{{item.rate}}</td>
                <template v-if="!form.count">
                    <td>{{item.ban}}</td>
                </template>
            </tr>
        </table>
        <teleport to="body">
            <div v-show="modal" class="hero-modal" @click.self="modal = false">
                <ul class="content">
                    <li v-for="(value, key, index) in allPositions" :key="key">
                        <p>{{value}}</p>
                        <div>
                            <div v-for="(item, inde) in allHeros[key]"
                                @click="setHero(item)"
                                :style="{ backgroundImage: `url(${getImageUrl(item)})` }"
                                :index="heroSelectedList.indexOf(item) + 1"
                                class="img pic"
                                :class="heroSelectedList.includes(item) ? 'selected' : null"
                                :key="`${index}${inde}`"
                            ></div>
                            <img v-if="index === 6" @click="setHero('')" class="img clear" src="@/assets/clear.png" alt="">
                        </div>
                    </li>
                </ul>
            </div>
        </teleport>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'
import { data } from './kpl'
import { datas as heroData, positions } from '../skin/data'
import { getImageUrl as getImageUrlUtils } from '@/libs/utils'

export default defineComponent({
    setup() {
        const list = []
        const getConcatData = context => {
            var contexts = context.split('|')
            for (var a = []; a.push([]) < contexts.length;);
            var b = Math.pow(2, contexts.length) - 1;
            for (var i = 1; i <= b; i++) {
                var c = [];
                for (var s = i, k = 0; s > 0; s >>= 1, k++) {
                    if ((s & 1) == 1) {
                        c.push(contexts[k]);
                    }
                }
                a[c.length - 1].push(c.join('|'));
            }
            return a
        }
        data.forEach(game => {
            if (game.pick_heros) {
                const pickData = getConcatData(game.pick_heros)
                const banData = game.ban_heros.split('|')
                const isWin = game.is_win == '1'
                for (let i = 0; i < 5; i++) {
                    list[i] = list[i] || {}
                    pickData[i].forEach(key => {
                        key = key.split('|').sort((a, b) => Number(a) - Number(b))
                        list[i][key] = list[i][key] || { pick: 0, win: 0, lose: 0, ban: 0, key }
                        list[i][key].pick++
                        isWin ? list[i][key].win++ : list[i][key].lose++
                    })
                    if (i === 0) {
                        banData.forEach(key => {
                            if (key && key !== '0') {
                                list[i][key] = list[i][key] || { pick: 0, win: 0, lose: 0, ban: 0, key: [key] }
                                list[i][key].ban++
                            }
                        })
                    }
                }
            }
        })

        const dataList = []
        const result = ref([])
        list.forEach(item => {
            const items = Object.keys(item).map(key => item[key])
            items.forEach(item => {
                item.rate = `${(item.win / (item.pick || 1) * 100).toFixed(2)}%`
            })
            dataList.push(items)
        })
        const heros = {}
        const allHeros = { none: [] }
        const allPositions = { ...positions, none: '未选' }
        heroData.forEach(hero => {
            const item = hero[0]
            const icon = item.icon.match(/\d+/)[0]
            heros[icon] = item.name.split('-')[0]
            if (item.position) {
                if (list[0][icon]) {
                    allHeros[item.position] = allHeros[item.position] || []
                    allHeros[item.position].push(icon)
                } else {
                    allHeros.none.push(icon)
                }
            }
        })
        const form = reactive({ count: 0, pick: true, rate: false, ban: false, selected: 'pick' })
        const heroSelected = ref(['', '', '', '', ''])
        const heroSelectedList = computed(() => {
            return Object.values(heroSelected.value)
        })
        const page = 15
        const setCount = count => {
            form.count = count
            setSelected(form.selected, true)
        }
        const sortFun = (a, b, selected) => {
            const isDesc = form[selected]
            const first = (isDesc ? parseFloat(b[selected]) - parseFloat(a[selected]) : parseFloat(a[selected]) - parseFloat(b[selected])) * 1000
            let second = 0
            if (selected === 'pick') {
                second = parseFloat(b['rate']) - parseFloat(a['rate'])
            }
            if (selected === 'rate') {
                second = parseFloat(b['pick']) - parseFloat(a['pick'])
            }
            return first + second
        }
        const setSelected = (selected, notSetSelect) => {
            modal.value = false
            modalHeroIndex.value = ''
            if (!notSetSelect) {
                form[selected] = selected !== form.selected ? true : !form[selected]
                form.selected = selected
            }
            const _heroSelected = heroSelected.value.slice(0, form.count + 1)
            dataList[form.count].sort((a, b) => {
                return sortFun(a, b, selected)
            })
            const nextData = dataList[form.count].filter(item => _heroSelected.map(key => !key || item.key.includes(key)).reduce((a, b) => b = a && b)).slice(0, page)
            nextData.forEach(item => {
                _heroSelected.forEach((key, index) => {
                    if (key) {
                        const _index = item.key.indexOf(key)
                        if (index !== _index) {
                            [item.key[index], item.key[_index]] = [item.key[_index], item.key[index]]
                        }
                    }
                })
            })
            result.value = nextData
        }
        const setHero = icon => {
            const index = heroSelectedList.value.indexOf(icon)
            if (index === -1 || !icon) {
                heroSelected.value[modalHeroIndex.value] = icon
                setSelected(form.selected, true)
            } else {
                if (index === Number(modalHeroIndex.value)) {
                    heroSelected.value[modalHeroIndex.value] = ''
                    setSelected(form.selected, true)
                }
            }
        }
        const getImageUrl = number => {
            const url = `skin/${number}/${number}-smallskin-1.jpg`
            return getImageUrlUtils(url)
        }
        const handleScroll = e => {
            const { scrollHeight, offsetHeight, scrollTop } = e.target
            if (scrollHeight === (offsetHeight + scrollTop)) {
                const length = result.value.length
                const _heroSelected = heroSelected.value.slice(0, form.count + 1)
                const nextData = dataList[form.count].filter(item => _heroSelected.map(key => !key || item.key.includes(key)).reduce((a, b) => b = a && b)).slice(length, length + page)
                nextData.forEach(item => {
                    _heroSelected.forEach((key, index) => {
                        if (key) {
                            const _index = item.key.indexOf(key)
                            if (index !== _index) {
                                [item.key[index], item.key[_index]] = [item.key[_index], item.key[index]]
                            }
                        }
                    })
                })
                result.value.push(...nextData)
            }
        }
        const modal = ref(false)
        const modalHeroIndex = ref('')
        const showHeroModal = index => {
            modalHeroIndex.value = !modal.value ? index : ''
            modal.value = !modal.value
        }
        setSelected(form.selected, true)
        return {
            heros,
            heroSelected,
            heroSelectedList,
            result,
            form,
            allPositions,
            allHeros,
            modal,
            modalHeroIndex,
            getImageUrl,
            setCount,
            setSelected,
            setHero,
            handleScroll,
            showHeroModal,
        }
    },
})
</script>


<style lang="less" scoped>
.timi-kpl {
    height: calc(100vh - 64px);
    overflow: auto;
}
.count {
    margin: 10px 0;
    display: flex;
    font-size: 14px;
    color: #666;
    text-align: center;
    li {
        flex: 1;
        cursor: pointer;
        user-select: none;
        &.active span {
            border: 1px solid #666;
            border-radius: 5px;
        }
    }
}
.table {
    width: 100%;
    color: #666;
    text-align: center;
    th {
        position: relative;
        padding: 5px 0;
        font-weight: normal;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 14px;
        max-width: 60px;
        cursor: pointer;
        user-select: none;
        &.pick {
            min-width: 35px;
        }
        &.rate {
            min-width: 53px;
        }
        &.selected {
            .arrow {
                display: inline;
            }
        }
        .arrow {
            display: none;
            position: absolute;
            margin: -5px 0 0 2px;
            top: 50%;
            width: 6px;
            height: 6px;
            border-top: 1px solid #666;
            border-right: 1px solid #666;
            transform: rotate(135deg);
            &.up {
                margin-top: -2px;
                transform: rotate(-45deg);
            }
            &.show {
                display: inline;
            }
        }
    }
    td {
        padding: 5px 0 0;
        font-size: 14px;
    }
    tr {
        padding-top: 5px;
    }
}
.image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.hero-modal {
    position: fixed;
    top: 121px;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    .content {
        padding: 5px 20px;
        color: #666;
        background-color: #fff;
        > li {
            display: flex;
            font-size: 0;
            p {
                padding: 5px 5px 0 0 ;
                font-size: 14px;
                white-space: nowrap;
            }
            .img {
                margin: 0 2px 2px 0;
                width: 30px;
                height: 30px;
                cursor: pointer;
                &.pic {
                    position: relative;
                    display: inline-block;
                    background-size: contain;
                }
                &.selected:after {
                    content: attr(index);
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    font-size: 14px;
                    color: #fff;
                    background-color: rgba(0, 0, 0, 0.5);
                }
                &.clear {
                    padding: 4px;
                }
            }
            & + li {
                margin-top: 5px;
            }
        }
    }
}
</style>