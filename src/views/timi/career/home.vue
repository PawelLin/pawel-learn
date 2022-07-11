<script lang="ts" setup>
import gsap from 'gsap'
import { ref, onMounted } from 'vue'
import Header from './components/Header.vue'
import SliderMenu from './components/SliderMenu.vue'
const list = ref([])
const homeRef = ref(null)
const menuVisible = ref(false)
onMounted(() => {
    setTimeout(() => {
        list.value = [1,2,3,4,5,6]
    }, 0)
})
const handleLeft = () => {
    if (menuVisible.value) {
        gsap.to(homeRef.value, {
            transform: '',
            boxShadow: '',
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => {
                menuVisible.value = false
            }
        })
    } else {
        gsap.to(homeRef.value, {
            transform: 'translate3d(59vw, 0, 0) scale(0.8)',
            boxShadow: '-20px 0px 100px #e5e5e5',
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => {
                menuVisible.value = true
            }
        })
    }
}
function onBeforeEnter(el) {
    gsap.set(el, {
        opacity: 0,
        transform: 'translateY(calc(100vh - 84px))'
    })
}
function onEnter (el, done) {
    const delay = (el.dataset.index - 1) * 0.05
    gsap.to(el, {
        transform: 'translateY(0)',
        duration: 0.5,
        ease: 'power2.out',
        delay
    })
    gsap.to(el, {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        delay,
        onComplete: done
    })
}
</script>

<template>
    <Slider-Menu v-model="menuVisible" />
    <div ref="homeRef" class="career-home">
        <Header @left="handleLeft" />
        <TransitionGroup
            tag="ul"
            class="contain"
            :css="false"
            @before-enter="onBeforeEnter"
            @enter="onEnter"
            appear
        >
            <li class="item" v-for="i in list" :key="i" :data-index="i">{{i}}</li>
        </TransitionGroup>
    </div>
</template>

<style lang="less" scoped>
.career-home {
    height: 100%;
    background-color: #fafafa;
}
.contain {
    height: calc(100% - 40px);
    overflow: auto;
}
.slide-enter-active, .slide-leave-active {
    transition: transform 0.5s ease-out, opacity 0.8s ease-out;
}

.slide-enter-from, .slide-leave-to {
    position: absolute;
    opacity: 0;
    transform: translateY(calc(100vh - 84px));
}
.item {
    margin: 10px 15px;
    height: 167px;
    border-radius: 5px;
    background-color: #f9c;
}
</style>