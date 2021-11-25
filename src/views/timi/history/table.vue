<template>
    <div class="space"></div>
    <div class="timi-table">
        <table class="table" cellspacing="0" cellpadding="0" border="0">
            <tr class="head">
                <th class="date">年月</th>
                <template v-for="i in NUMBER" :key="i">
                    <th class="name"></th>
                    <th class="time">上架时间</th>
                    <th class="quality">品质</th>
                </template>
                <!-- <th>小计</th> -->
                <!-- <th>合计</th> -->
            </tr>
            <template v-for="list in result">
                <template v-for="({ data, colspan, year, month }) in list">
                    <tr v-for="(items, index) in data" :key="index">
                        <td v-if="!index" :rowspan="data.length" class="text-center">{{year}}年{{month + 1}}月</td>
                        <template v-for="({ name, icon, date, limit, quality }) in items" :key="name">
                            <td>
                                <img :src="getImageUrl(icon)">
                                {{name}}
                            </td>
                            <td class="text-center">{{date}}</td>
                            <td class="text-center">
                                <span class="quality-span" :class="`quality-span-${qualityColorEnums[quality]}`">{{qualityEnums[quality]}}</span>
                                <span v-if="form.limit === '1' && limit" class="quality-span quality-span-blue">限定</span>
                            </td>
                        </template>
                        <td v-if="data.length - 1 === index && colspan" :colspan="colspan">{{colspan}}</td>
                        <!-- <td v-if="!index" :rowspan="data.length" class="text-center">{{}}</td> -->
                    </tr>
                </template>
            </template>
        </table>
        <form class="form">
            <div>
                <label>上架时间</label>
                <select v-model="form.startYear" @change="yearChange(form.startYear, 'startMonth')">
                    <option value="">全部</option>
                    <option v-for="year in years" :value="year" :key="year">{{year}}年</option>
                </select>
                <select v-model="form.startMonth" :disabled="!form.startYear">
                    <option value="">全部</option>
                    <option v-for="i in 12" :value="i" :key="i">{{i}}月</option>
                </select>
                <select v-model="form.endYear" @change="yearChange(form.endYear, 'endMonth')">
                    <option value="">全部</option>
                    <option v-for="year in years" :value="year" :key="year">{{year}}年</option>
                </select>
                <select v-model="form.endMonth" :disabled="!form.endYear">
                    <option value="">全部</option>
                    <option v-for="i in 12" :value="i" :key="i">{{i}}月</option>
                </select>
            </div>
            <div>
                <label for="name">名称</label>
                <input v-model="form.name" type="text" maxlength="30" placeholder="请输入">
            </div>
            <div>
                <label for="quality">品质</label>
                <div class="multiple-checkbox">
                    <template v-for="(value, key, index) in qualityEnums" :key="key">
                        <input v-model="form.quality" :value="key" :id="`quality-${key}`" type="checkbox">
                        <label :for="`quality-${key}`">{{value}}</label>
                        <br v-if="!((index + 1) % 3)">
                    </template>
                </div>
                <!-- <select v-model="form.quality">
                    <option value="">全部</option>
                    <option v-for="(value, key) in typeEnums" :value="key" :key="key">{{value}}</option>
                </select> -->
            </div>
            <div>
                <label for="limit">限定</label>
                <select v-model="form.limit">
                    <option value="1">是</option>
                    <option value="0">否</option>
                </select>
            </div>
            <div>
                <label for="sort">排序</label>
                <select v-model="form.sort">
                    <option value="-1">降序</option>
                    <option value="2">升序</option>
                </select>
            </div>
            <div>
                <label></label>
                <button @click.prevent="handleSearch">查询</button>
            </div>
        </form>
    </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import { history } from './history'
import { datas, limits } from '../skin/data'
import { getImageUrl } from '@/libs/utils'

export default defineComponent({
    setup() {
        const qualityEnums = { '01': '英雄', '02': '伴生', 1: '勇者', 2: '史诗', 3: '传说' }
        const qualityColorEnums = { '01': 'default', '02': 'default', 1: 'green', 2: 'purple', 3: 'red' }
        const NUMBER = 4
        const skinData = {}
        const heroNames = []
        const skinMyNames = []
        datas.forEach(list => {
            list.forEach(item => {
                skinData[item.name] = item
            })
            console.log(list)
            let index = 0
            const firstName = list[index++].name
            heroNames.push(firstName)
            if (firstName.match(/-旧$/)) {
                heroNames.push(list[index++].name)
            }
            if (list[index]) {
                skinMyNames.push(list[index].name)
            }
        })
        const list = {}
        const getQuality = (type, name, quality) => {
            if (type === '0') {
                return heroNames.includes(name) ? '01' : skinMyNames.includes(name) ? '02' : quality
            }
            return quality
        }
        const getLimit = type => {
            return limits.includes(type)
        }
        history.forEach(items => {
            let date = items.date || items.start
            let [year, month, day] = date.split('-').map(item => Number(item))
            date = `${month}月${day}日`
            month -= 1
            const type = items.content.includes('返场') ? '2' : '1'
            if (type !== '2') {
                items.name.replace(/\s|\n/g, '').split('|').forEach(key => {
                    let { icon, name, type, quality } = skinData[key] || {}
                    if (name) {
                        quality = getQuality(type, name, quality)
                        const limit = getLimit(type)
                        const items = list[year]
                        const item = { icon, name, date, limit, quality }
                        if (!items) {
                            const data = Array.from(Array(12)).map(() => [])
                            data[month] = [item]
                            list[year] = data
                        }
                        else {
                            list[year][month] = list[year][month] || []
                            list[year][month].push(item)
                        }
                    }
                })
            }
        })
        const years = Object.keys(list)
        const form = reactive({
            startYear: '2021',
            startMonth: '',
            endYear: '2021',
            endMonth: '',
            name: '',
            quality: [],
            limit: '0',
            sort: '-1'
        })
        const getResult = years => {
            const result = []
            const yearLength = years.length
            const isDesc = form.sort === '-1'
            const _years = [...years]
            isDesc && _years.reverse()
            _years.forEach((year, yearIndex) => {
                list[year].forEach((items, month) => {
                    const monthIndex = isDesc ? list[year].length - 1 - month : month
                    let colspan = 0
                    const data = []
                    const { startMonth, endMonth } = form
                    let start = 0
                    let end = list[year].length - 1
                    if (yearLength === 1) {
                        start = startMonth ? startMonth - 1 : start
                        end = endMonth ? endMonth - 1 : end
                    }
                    if (!yearIndex && startMonth) {
                        start = startMonth - 1
                    }
                    if (yearLength - 1 === yearIndex && endMonth) {
                        end = endMonth - 1
                    }
                    if (monthIndex >= start && monthIndex <= end) {
                        const _items = items.filter(item => {
                            return (item.name ? item.name.includes(form.name) : true) &&
                            (form.quality.length ? form.quality.includes(item.quality) : true) &&
                            (form.limit === '1' ? item.limit : true)
                        })
                        isDesc && _items.reverse()
                        _items.forEach((item, index) => {
                            const _index = Math.floor(index / NUMBER)
                            data[_index] = data[_index] || []
                            data[_index].push(item)
                            if (_items.length - 1 === index) {
                                colspan = (NUMBER - data[_index].length) * NUMBER
                            }
                        })
                    }
                    result[yearIndex] = result[yearIndex] || []
                    result[yearIndex][monthIndex] = {
                        data,
                        colspan,
                        year,
                        month
                    }
                })
            })
            return result
        }
        const result = ref(getResult(['2021']))
        const yearChange = (value, key) => {
            if (!value) {
                form[key] = ''
            }
        }
        const handleSearch = () => {
            const years = Object.keys(list).filter(year => (!form.startYear || (form.startYear && year >= form.startYear)) && (!form.endYear || (form.endYear && year <= form.endYear)))
            result.value = getResult(years)
        }
        return {
            result,
            years,
            form,
            NUMBER,
            qualityEnums,
            qualityColorEnums,
            yearChange,
            handleSearch,
            getImageUrl
        }
    }
})
</script>

<style lang="less" scoped>
@gray: #eaeaea;
@border: 1px solid @gray;
.space {
    position: sticky;
    top: 64px;
    width: 100%;
    height: 10px;
    background-color: #fff;
}
.timi-table {
    margin: 0 0 20px 20px;
    display: flex;
    align-items: flex-start;
}
.table {
    // border-collapse: collapse;
    font-size: 16px;
    border-left: @border;
    th, td {
        padding: 4px;
        border-right: @border;
        border-bottom: @border;
    }
    .head {
        position: sticky;
        top: 74px;
        background-color: #fff;
        th {
            border-top: @border;
        }
    }
    .date {
        min-width: 95px;
    }
    .name {
        min-width: 185px;
    }
    .time {
        min-width: 75px;
    }
    .quality {
        min-width: 45px;
    }
    .quality-span {
        padding: 2px;
        display: inline-block;
        border: 1px solid;
        border-radius: 3px;
        font-size: 14px;
        &-default {
            color: #515a6e;
            border-color: #e8eaec;
            background-color: #f7f7f7;
        }
        &-green {
            color: #52c41a;
            border-color: #b7eb8f;
            background-color: #f6ffed;
        }
        &-purple {
            color: #722ed1;
            border-color: #d3adf7;
            background-color: #f9f0ff;
        }
        &-red {
            color: #f5222d;
            border-color: #ffa39e;
            background-color: #fff1f0;
        }
        &-blue {
            color: #1890ff;
            border-color: #91d5ff;
            background-color: #e6f7ff;
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
.form {
    position: sticky;
    top: 74px;
    margin-left: 20px;
    padding: 10px;
    border: @border;
    > div {
        display: flex;
        > label {
            padding-right: 10px;
            width: 80px;
        }
        .multiple-checkbox {
            input {
                vertical-align: middle;
            }
            label {
                margin-right: 5px;
                vertical-align: middle;
                font-size: 15px;
                cursor: pointer;
            }
        }
        select, input {
            outline: none;
        }
        & + div {
            margin-top: 10px;
        }
    }
}
</style>