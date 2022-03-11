<template>
    <div class="space"></div>
    <div class="timi-table">
        <div class="data">
            <table class="table" cellspacing="0" cellpadding="0" border="0">
                <tr class="head">
                    <th class="date">年月</th>
                    <template v-for="num in NUMBER" :key="num">
                        <th class="name"></th>
                        <th class="time">上架日期</th>
                        <th class="quality">品质</th>
                    </template>
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
                                    <!-- <span v-if="form.limit === '1' && limit" class="quality-span quality-span-blue">限定</span> -->
                                </td>
                            </template>
                            <td v-if="data.length - 1 === index && colspan" :colspan="colspan"></td>
                        </tr>
                    </template>
                </template>
            </table>
        </div>
        <form class="form">
            <div>
                <label>上架日期</label>
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
                <label>年份</label>
                <div class="multiple-checkbox">
                    <template v-for="(year, index) in years" :key="year">
                        <input v-model="form.years" :value="year" :id="`year-${year}`" type="checkbox">
                        <label :for="`year-${year}`">{{year}}</label>
                        <br v-if="!((index + 1) % 4)">
                    </template>
                </div>
            </div>
            <div>
                <label>月份</label>
                <div class="multiple-checkbox">
                    <template v-for="(month, index) in 12" :key="month">
                        <input v-model="form.months" :value="month - 1" :id="`month-${month}`" type="checkbox">
                        <label :for="`month-${month}`">{{month}}</label>
                        <br v-if="!((index + 1) % 6)">
                    </template>
                </div>
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
            </div>
            <div>
                <label for="limit">只限定</label>
                <div class="multiple-checkbox">
                    <input v-model="form.limit" value="1" id="limit-1" type="radio" name="limit">
                    <label for="limit-1">是</label>
                    <input v-model="form.limit" value="0" id="limit-0" type="radio" name="limit">
                    <label for="limit-0">否</label>
                </div>
            </div>
            <div>
                <label for="sort">排序</label>
                <select v-model="form.yearSort">
                    <option value="1">年升序</option>
                    <option value="-1">年降序</option>
                </select>
                <select v-model="form.monthSort">
                    <option value="1">月升序</option>
                    <option value="-1">月降序</option>
                </select>
                <select v-model="form.daySort">
                    <option value="1">日升序</option>
                    <option value="-1">日降序</option>
                </select>
            </div>
            <div>
                <label for="sort">列数</label>
                <div class="multiple-checkbox">
                    <template v-for="column in 4" :key="`column-${column}`">
                        <input v-model="form.columns" :value="column" :id="`column-${column}`" type="radio" name="columns">
                        <label :for="`column-${column}`">{{column}}</label>
                    </template>
                </div>
            </div>
            <div>
                <label></label>
                <button @click.prevent="handleSearch">查询</button>
            </div>
            <div class="count">
                <table class="count-table" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                        <td>年月</td>
                        <td v-for="(value, key) in qualityEnums" :class="`count-color-${key}`" :key="key">{{value}}</td>
                    </tr>
                    <tr v-for="item in resultCount" :key="item.date">
                        <td>{{item.date}}</td>
                        <td v-for="(value, key) in qualityEnums" :class="`count-color-${key}`" :key="key">{{item[key] || '-'}}</td>
                    </tr>
                </table>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue'
import { history } from './history'
import { datas } from '../skin/data'
import { getImageUrl } from '@/libs/utils'

export default defineComponent({
    setup() {
        const qualityEnums = { 0: '英雄', 1: '伴生', 2: '勇者', 3: '史诗', 4: '传说' }
        const qualityColorEnums = { 0: 'default', 1: 'default', 2: 'green', 3: 'purple', 4: 'red' }
        const skinData = {}
        datas.forEach(list => {
            list.forEach(item => {
                skinData[item.name] = item
            })
        })
        const list = {}
        history.forEach(items => {
            const limit = !!items.start
            let date = items.date || items.start
            let [year, month, day] = date.split('-').map(item => Number(item))
            date = `${month}月${day}日`
            month -= 1
            const type = items.content.includes('返场') ? '2' : '1'
            if (type !== '2') {
                items.name.replace(/\s|\n/g, '').split('|').forEach(key => {
                    let { icon, name, type, quality } = skinData[key] || {}
                    if (name) {
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
            startYear: '2022',
            startMonth: '',
            endYear: '2022',
            endMonth: '',
            years: [],
            months: [],
            name: '',
            quality: [],
            limit: '0',
            yearSort: '-1',
            monthSort: '1',
            daySort: '1',
            columns: 4
        })
        const NUMBER = computed(() => form.columns)
        const getResult = years => {
            const result = []
            const resultCount = []
            const resultCountIndex = []
            const yearLength = years.length
            const isYearDesc = form.yearSort === '-1'
            const isMonthDesc = form.monthSort === '-1'
            const isDayDesc = form.daySort === '-1'
            const _years = years.filter(year => !form.years.length || form.years.includes(year))
            isYearDesc && _years.reverse()
            _years.forEach((year, yearIndex) => {
                list[year].forEach((items, month) => {
                    const monthIndex = isMonthDesc ? list[year].length - 1 - month : month
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
                    if (monthIndex >= start && monthIndex <= end && (!form.months.length || form.months.includes(month))) {
                        const _items = items.filter(item => {
                            return (item.name ? item.name.includes(form.name) : true) &&
                            (form.quality.length ? form.quality.includes(item.quality) : true) &&
                            (form.limit === '1' ? item.limit : true)
                        })
                        isDayDesc && _items.reverse()
                        _items.forEach((item, index) => {
                            const _index = Math.floor(index / NUMBER.value)
                            data[_index] = data[_index] || []
                            data[_index].push(item)
                            if (_items.length - 1 === index) {
                                colspan = (NUMBER.value - data[_index].length) * 3
                            }
                            const countKey = `${year}${monthIndex}`
                            const countIndex = resultCountIndex.indexOf(countKey)
                            if (countIndex > -1) {
                                resultCount[countIndex][item.quality]++
                            } else {
                                const countData = Object.keys(qualityEnums).reduce((data, key) => ((data[key] = (key === item.quality ? 1 : 0)) && data) || data, {})
                                resultCount.push({ date: `${year}年${monthIndex + 1}月`, ...countData  })
                                resultCountIndex.push(countKey)
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
            return { result, resultCount }
        }
        const { result: resultData, resultCount: resultCountData } = getResult(['2022'])
        const result = ref(resultData)
        const resultCount = ref(resultCountData)
        const yearChange = (value, key) => {
            if (!value) {
                form[key] = ''
            }
        }
        const handleSearch = () => {
            const years = Object.keys(list).filter(year => (!form.startYear || (form.startYear && year >= form.startYear)) && (!form.endYear || (form.endYear && year <= form.endYear)))
            const { result: resultData, resultCount: resultCountData } = getResult(years)
            result.value = resultData
            resultCount.value = resultCountData
            console.log(result.value)
            console.log(resultCount.value)
        }
        watch(form, handleSearch)
        return {
            result,
            resultCount,
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
    padding: 0 0 10px 20px;
    display: flex;
    align-items: flex-start;
    height: calc(100vh - 74px);
}
.data {
    max-height: 100%;
    overflow-y: scroll;
    overflow-x: auto;
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
            top: 0;
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
            min-width: 22px;
            border: 1px solid;
            border-radius: 3px;
            font-size: 14px;
            & + .quality-span {
                margin-left: 5px;
            }
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
}
.form {
    position: sticky;
    top: 74px;
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    padding: 10px;
    max-height: 100%;
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
    .count {
        overflow-y: scroll;
        overflow-x: auto;
        .count-table {
            width: 100%;
            tr:first-child {
                position: sticky;
                top: 0;
                background-color: #ffffff;
            }
            tr > td {
                padding: 3px 0;
                &:not(:first-child) {
                    text-align: center;
                }
            }
            .count-color-0, .count-color-1 {
                background-color: #f7f7f7;
            }
            .count-color-2 {
                background-color: #f6ffed;
            }
            .count-color-3 {
                background-color: #f9f0ff;
            }
            .count-color-4 {
                background-color: #fff1f0;
            }
        }
    }
}
</style>