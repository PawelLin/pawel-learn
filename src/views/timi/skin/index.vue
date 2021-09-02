<template>
    <div class="timi-skin">
        <ul class="menu">
            <li v-for="item in types" :key="item.type" @click="type = item.type">
                <span :class="item.type === type && 'active'">{{item.name}}</span>
            </li>
        </ul>
        <div class="contain">
            <keep-alive>
                <component :is="type" @modal-show="openModal" />
            </keep-alive>
        </div>
        <teleport to="body">
            <div v-show="modalOpen" class="modal" @click="closeModal">
                <div v-show="isCover" ref="modalImageCover" @click.stop="changeCover(false)" class="modal-image-cover">
                    <img v-show="modal.image" :src="modal.image">
                </div>
                <div v-show="!isCover" @click.stop="changeCover(true)" class="modal-image-content">
                    <img v-show="modal.image" :src="modal.image">
                </div>
                <div class="modal-title">{{modal.title}}</div>
            </div>
        </teleport>
    </div>
    <!-- <pc /> -->
</template>

<script lang="ts">

import self from './component/self.vue'
import my from './component/my.vue'
import brave from './component/brave.vue'
import epic from './component/epic.vue'
import rare from './component/rare.vue'
import limit from './component/limit.vue'
import season from './component/season.vue'
import anniversary from './component/anniversary.vue'
import newYear from './component/newYear.vue'
import festival from './component/festival.vue'
import warOrder from './component/warOrder.vue'
import linkage from './component/linkage.vue'
import match from './component/match.vue'
import vip from './component/vip.vue'
import activity from './component/activity.vue'
import growUp from './component/growUp.vue'
import six from './component/six.vue'
import lovers from './component/lovers.vue'
// import pc from './pc.vue'

import { defineComponent, reactive, ref, nextTick } from 'vue'

export default defineComponent({
    components: {
        self,
        my,
        brave,
        epic,
        rare,
        limit,
        season,
        anniversary,
        newYear,
        festival,
        warOrder,
        linkage,
        match,
        vip,
        activity,
        growUp,
        six,
        lovers,
        // pc
    },
    setup() {
        const type = ref('season')
        const modalOpen = ref(false)
        const types = [
            { type: 'self', name: '原皮', key: [] },
            { type: 'my', name: '伴生', key: [] },
            { type: 'brave', name: '勇者', key: [] },
            { type: 'epic', name: '史诗', key: [] },
            { type: 'rare', name: '传说', key: [] },
            { type: 'limit', name: '限定', key: [] },
            { type: 'season', name: '赛季', key: [] },
            { type: 'anniversary', name: '周年', key: [] },
            { type: 'newYear', name: '新年', key: [] },
            { type: 'festival', name: '节日', key: [] },
            // { type: 'newYear', name: '新年限定', key: [] },
            // { type: 'spring', name: '新春专属', key: [] },
            // { type: 'valentine', name: '情人节', key: [] },
            // { type: 'christmas', name: '圣诞节', key: [] },
            { type: 'warOrder', name: '战令', key: [] },
            { type: 'linkage', name: '联动', key: [] },
            { type: 'match', name: '赛事', key: [] },
            { type: 'vip', name: '贵族', key: [] },
            { type: 'activity', name: '活动', key: [] },
            { type: 'growUp', name: '成长', key: [] },
            { type: 'six', name: '六元', key: [] },
            { type: 'lovers', name: '恋人', key: [] },
        ]
        const modal = reactive({
            image: '',
            title: ''
        })
        const isCover = ref(false)
        const modalImageCover = ref(null)
        const closeModal = () => {
            modalOpen.value = false
        }
        const openModal = item => {
            modal.title = item.name
            modal.image = `//game.gtimg.cn/images/yxzj/img201606/${item.url.replace('skin', 'skin/hero-info')}`
            modalOpen.value = true
        }
        const changeCover = show => {
            isCover.value = show
            if (show) {
                nextTick(() => {
                    modalImageCover.value.scrollLeft = document.body.offsetWidth + modalImageCover.value.offsetWidth / 2
                })
            }
        }
        return {
            types,
            type,
            modalImageCover,
            modal,
            modalOpen,
            openModal,
            closeModal,
            isCover,
            changeCover
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
        overflow: auto;
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
        padding: 8px 0;
        flex: 1;
        height: 100%;
        overflow: auto;
    }
}
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    &-image-cover {
        height: 100%;
        overflow-x: auto;
        overflow-y: hidden;
        img {
            height: 100%;
        }
    }
    &-image-content {
        img {
            width: 100%;
        }
    }
    &-title {
        position: absolute;
        padding: 10px 20px;
        width: 100%;
        left: 0;
        bottom: 0;
        color: rgba(255, 255, 255, 0.8);
        text-align: right;
    }
}
</style>
