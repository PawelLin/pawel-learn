<template>
    <div class="home" @scroll="handleScroll">
        <!-- <h2>挥剑笑 斩怒风</h2> -->
        <ul class="count">
            <li v-for="i in 5" @click="setCount(i - 1)" :class="(i - 1) === form.count ? 'active' : null" :key="i">
                <span>组合{{i}}</span>
            </li>
        </ul>
        <table class="table" cellspacing="0" cellpadding="0" border="0">
            <tr>
                <th v-for="(item, index) in (form.count + 1)">英雄{{index + 1}}</th>
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
            <template v-for="(items, indexs) in result">
                <tr v-for="(item, index) in items" v-show="form.count === indexs && index < pages[indexs]">
                    <td v-for="key in item.key"><img class="image" :src="getImageUrl(key)"></td>
                    <td>{{item.pick}}</td>
                    <td>{{item.rate}}</td>
                    <template v-if="!form.count">
                        <td>{{item.ban}}</td>
                    </template>
                </tr>
            </template>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { data } from './kpl'
import { datas as heroData } from '../timi/skin/data'
import { getImageUrl as getImageUrlUtils } from '@/libs/utils'

export default defineComponent({
    setup() {
        const heros = {}
        heroData.forEach(hero => {
            const item = hero[0]
            heros[item.icon.match(/\d+/)[0]] = item.name.split('-')[0]
        })
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
            const pickData = getConcatData(game.pick_heros)
            const banData = game.ban_heros.split('|')
            const isWin = game.is_win == '1'
            for (let i = 0; i < 5; i++) {
                list[i] = list[i] || {}
                pickData[i].forEach(key => {
                    key = key.split('|').sort((a, b) => Number(a) - Number(b))
                    const name = key.map(key => heros[key])
                    list[i][key] = list[i][key] || { pick: 0, win: 0, lose: 0, ban: 0, name, key }
                    list[i][key].pick++
                    isWin ? list[i][key].win++ : list[i][key].lose++
                })
                if (i === 0) {
                    banData.forEach(key => {
                        const name = heros[key]
                        if (name) {
                            list[i][key] = list[i][key] || { pick: 0, win: 0, lose: 0, ban: 0, name: [name], key: [key] }
                            list[i][key].ban++
                        }
                    })
                }
            }
        })

        const result = reactive([])
        list.forEach(item => {
            const items = Object.keys(item).map(key => item[key])
            items.forEach(item => {
                item.rate = `${(item.win / (item.pick || 1) * 100).toFixed(2)}%`
            })
            result.push(items)
        })
        const form = reactive({ count: 0, pick: true, rate: false, ban: false, selected: 'pick' })
        const pages = reactive({ 0: 14, 1: 14, 2: 14, 3: 14, 4: 14 })
        const setCount = count => {
            pages[count] = 14
            form.count = count
            setSelected(form.selected, true)
        }
        const setSelected = (selected, notSetSelect) => {
            if (!notSetSelect) {
                form[selected] = selected !== form.selected ? true : !form[selected]
                form.selected = selected
            }
            result[form.count].sort((a, b) => {
                if (form[selected]) {
                    return parseFloat(b[selected]) - parseFloat(a[selected])
                } else {
                    return parseFloat(a[selected]) - parseFloat(b[selected])
                }
            })
        }
        const getImageUrl = number => {
            const url = `skin/${number}/${number}.jpg`
            return getImageUrlUtils(url)
        }
        const handleScroll = e => {
            const { scrollHeight, offsetHeight, scrollTop } = e.target
            if (scrollHeight === (offsetHeight + scrollTop)) {
                pages[form.count] += 15
            }
        }
        setSelected(form.selected, true)
        return {
            result,
            form,
            pages,
            getImageUrl,
            setCount,
            setSelected,
            handleScroll,
        }
    },
})
</script>


<style lang="less" scoped>
.home {
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
            margin: -3px 0 0 2px;
            top: 50%;
            width: 6px;
            height: 6px;
            border-top: 1px solid #666;
            border-right: 1px solid #666;
            transform: rotate(135deg);
            &.up {
                margin-top: -1px;
                transform: rotate(-45deg);
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
    border-radius: 50%;
}
</style>