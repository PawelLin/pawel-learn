<script lang="ts" setup>
import { datas } from '../skin/data'
import { getImageUrl } from '@/libs/utils'
import { data } from './data'

const skinData = {}
datas.forEach(list => {
    skinData[list[0].name.split('-')[0]] = list[0].icon
})
console.log(skinData)

const list = JSON.parse(JSON.stringify(data))
list.forEach(team => {
    team.list.forEach(item => {
        item.hero = item.hero.split(',').map(name => getImageUrl(skinData[name]))
    })
})
const modules = import.meta.globEager('./images/**')
console.log(modules)
console.log(list)

</script>


<template>
    <div>
        <div v-for="team in list" class="list">
            <p style="text-align: center; font-weight: bold;margin: 10px 0;">{{team.name}}</p>
            <ul v-for="item in team.list">
                <li class="item">
                    <div style="flex:1;">{{item.name}}</div>
                    <img :src="modules[`./images/${item.level}.png`].default" alt="" style="width: 45px;height: auto;">
                    <div style="width: 70px;text-align: center;">{{item.position}}
                    </div>
                    <div>
                        <img v-for="src in item.hero" :src="src" alt="" class="hero-icon" />
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="less" scoped>
.list{
    margin: 10px 0;
}
.item {
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.hero-icon {
    width: 40px;
    height: 40px;
}
</style>