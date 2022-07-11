<script lang="ts" setup>
import gsap from 'gsap'
import { computed } from 'vue'
import svgIcon from '@/views/icon/svgIcon/svgIcon.vue'

const props = defineProps<{
    modelValue: boolean
}>()
const emit = defineEmits(['update:modelValue'])

const value = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})

function onBeforeEnter(el) {
    gsap.set(el, {
        opacity: 0,
        transform: 'translate3d(0, 15vh, 0)'
    })
}
function onEnter (el, done) {
    const delay = el.dataset.delay * 0.02
    gsap.to(el, {
        transform: 'translate3d(0, 0, 0)',
        duration: 0.3,
        ease: 'power1.out',
        delay
    })
    gsap.to(el, {
        opacity: 1,
        duration: 0.6,
        ease: 'power1.out',
        delay,
        onComplete: done
    })
}
</script>

<template>
    <aside v-show="value" class="slider-menu">
        <TransitionGroup
            tag="div"
            class="header"
            :css="false"
            @before-enter="onBeforeEnter"
            @enter="onEnter"
        >
            <div class="icon" key="icon" v-show="value" :data-delay="0"></div>
            <div class="title" key="title" v-show="value" :data-delay="1">Ai Lin</div>
            <div class="desc" key="desc" v-show="value" :data-delay="2">Jingling</div>
        </TransitionGroup>
        <TransitionGroup
            tag="ul"
            class="list"
            :css="false"
            @before-enter="onBeforeEnter"
            @enter="onEnter"
        >
            <li class="item" key="1" v-show="value" :data-delay="3">
                <svgIcon icon="svg-archive-logo" :font-size="18" class="item-icon"></svgIcon>
                Credit Cards</li>
            <li class="item" key="2" v-show="value" :data-delay="4">
                <svgIcon icon="svg-brave" :font-size="18" class="item-icon"></svgIcon>
                Bill</li>
            <li class="item" key="3" v-show="value" :data-delay="5">
                <svgIcon icon="svg-archive-logo" :font-size="18" class="item-icon"></svgIcon>
                Small Loan</li>
            <li class="item" key="4" v-show="value" :data-delay="6">
                <svgIcon icon="svg-brave" :font-size="18" class="item-icon"></svgIcon>
                Information</li>
            <li class="item" key="5" v-show="value" :data-delay="7">
                <svgIcon icon="svg-archive-logo" :font-size="18" class="item-icon"></svgIcon>
                Set Up</li>
        </TransitionGroup>
        <TransitionGroup
            tag="div"
            class="footer"
            :css="false"
            @before-enter="onBeforeEnter"
            @enter="onEnter"
        >
            <div class="out" key="out" v-show="value" :data-delay="8">
                <svgIcon icon="svg-brave" :font-size="18" class="item-icon"></svgIcon>
                Sign Out
            </div>
        </TransitionGroup>
    </aside>
</template>

<style lang="less" scoped>
.slider-menu {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 200px;
    height: calc(100vh - 64px);
}
.header {
    margin-top: 35px;
    padding-left: 30px;
}
.icon {
    display: inline-block;
    width: 70px;
    height: 70px;
    border: 3px solid #fff;
    border-radius: 35px;
    box-shadow: 5px 5px 10px #e5e5e5;
    background-image: url(@/assets/skin/155/155-smallskin-2.jpg);
    background-size: cover;
}
.title {
    margin-top: 10px;
    font-size: 18px;
    font-weight: 700;
}
.desc {
    margin-top: 3px;
    color: #787878;
}
.list {
    margin-top: 45px;
}
.item {
    display: flex;
    align-items: center;
    padding-left: 26px;
    height: 40px;
    border-left: 4px solid transparent;
    &.active {
        border-left-color: #4e69f7;
        color: #1e3590;
        background-image: linear-gradient(to right, rgba(102, 127, 255, 0.3) 30%, transparent 100%);
    }
    &-icon {
        margin-right: 10px;
    }
}
.footer {
    margin: auto 0 50px 0;
    padding-left: 30px;
}
</style>