<template>
    <div class="timi-skin">
        <ul class="menu">
            <li v-for="item in types" :key="item.type" @click="type = item.type">
                <span :class="item.type === type && 'active'">{{item.name}}</span>
            </li>
        </ul>
        <div class="contain">
            <keep-alive>
                <component :is="type" />
            </keep-alive>
        </div>
    </div>
    <!-- <pc /> -->
</template>

<script lang="ts">

import self from './component/self.vue'
import my from './component/my.vue'
import brave from './component/brave.vue'
import epic from './component/epic.vue'
import legend from './component/legend.vue'
import limit from './component/limit.vue'
import season from './component/season.vue'
import anniversary from './component/anniversary.vue'
import festival from './component/festival.vue'
import warOrder from './component/warOrder.vue'
import linkage from './component/linkage.vue'
import match from './component/match.vue'
import vip from './component/vip.vue'
import activity from './component/activity.vue'
import growUp from './component/growUp.vue'
// import pc from './pc.vue'

import { defineComponent, ref } from 'vue'

export default defineComponent({
    components: {
        self,
        my,
        brave,
        epic,
        legend,
        limit,
        season,
        anniversary,
        festival,
        warOrder,
        linkage,
        match,
        vip,
        activity,
        growUp,
        // pc
    },
    setup() {
        const type = ref('season')
        const types = [
            { type: 'self', name: '原皮', key: [] },
            { type: 'my', name: '伴生', key: [] },
            { type: 'brave', name: '勇者', key: [] },
            { type: 'epic', name: '史诗', key: [] },
            { type: 'legend', name: '传说', key: [] },
            { type: 'limit', name: '限定', key: [] },
            { type: 'season', name: '赛季', key: [] },
            { type: 'anniversary', name: '周年', key: [] },
            { type: 'festival', name: '节日', key: [] },
            // { type: 'newYear', name: '新年限定', key: [] },
            // { type: 'spring', name: '新春专属', key: [] },
            // { type: 'valentine', name: '情人节', key: [] },
            // { type: 'christmas', name: '圣诞节', key: [] },
            { type: 'warOrder', name: '战令', key: [] },
            { type: 'linkage', name: '联动', key: [] },
            { type: 'match', name: '赛事', key: [] },
            { type: 'vip', name: 'VIP', key: [] },
            { type: 'activity', name: '活动', key: [] },
            { type: 'growUp', name: '成长', key: [] },
        ]
        return {
            types,
            type
        }
    },
})
</script>

<style lang="less" scoped>
.timi-skin {
    display: flex;
    height: calc(100vh - 64px);
    .menu {
        padding-top: 5px;
        height: 100%;
        text-align: center;
        > li {
            padding: 10px;
            width: 80px;
            color: #666;
            cursor: pointer;
            > span.active {
                border: 1px solid #666;
                border-radius: 5px;
            }
        }
    }
    .contain {
        padding: 10px 0;
        flex: 1;
        height: 100%;
        overflow: auto;
    }
}
</style>
