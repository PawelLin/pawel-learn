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
            <div v-show="modalOpen && modal.image" class="modal">
                <div class="modal-filter" :style="{ backgroundImage: `url(${modal.image})` }"></div>
                <div class="modal-image">
                    <img :src="modal.image" :alt="modal.title" @load="imageLoaded">
                    <div v-show="modal.content" class="modal-content" v-html="modal.content"></div>
                    <div class="modal-title">{{modal.title}}</div>
                    <div class="modal-close" @click="closeModal"></div>
                </div>
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

import { defineComponent, reactive, ref } from 'vue'

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
            title: '',
            content: ''
        })
        const modalImageCover = ref(null)
        const closeModal = () => {
            modalOpen.value = false
        }
        const isPortrait = window.innerWidth < window.innerHeight
        const openModal = item => {
            if (modal.title === item.name) {
                modalOpen.value = true
                return
            }
            const image = isPortrait ? item.mobile : item.url
            modal.title = item.name
            modal.content = item.content
            modal.image = `//game.gtimg.cn/images/yxzj/img201606/${image.replace('skin', 'skin/hero-info')}`
        }
        const imageLoaded = e => {
            modalOpen.value = true
        }
        return {
            types,
            type,
            modalImageCover,
            modal,
            modalOpen,
            openModal,
            closeModal,
            imageLoaded
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
    z-index: 1;
    &-filter {
        position: absolute;
        top: 0;
        left: 0;
        right: -10px;
        height: 100%;
        background-size: cover;
        background-position: center top;
        filter: blur(10px);
        &::before {
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
        }
    }
    &-image {
        position: relative;
        margin: 0 20px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        img {
            max-width: 100%;
            max-height: 90%;
            border-radius: 5px;
        }
    }
    &-content {
        margin-top: 10px;
        width: 100%;
        text-align: left;
        color: rgba(255, 255, 255, 0.8);
    }
    &-title {
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 20px;
        color: rgba(255, 255, 255, 0.8);
        text-align: right;
    }
    &-close {
        position: absolute;
        top: 20px;
        right: -7px;
        width: 30px;
        height: 30px;
        cursor: pointer;
        &::before, &::after {
            content: '';
            position: absolute;
            top: 8px;
            right: 13px;
            width: 2px;
            height: 13px;
            background-color: rgba(255, 255, 255, 0.8);
        }
        &::before {
            transform: skew(45deg, 0);
        }
        &::after {
            transform: skew(-45deg, 0);
        }
    }
}
</style>
