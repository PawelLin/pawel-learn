<template>
    <section class="component">
        <div class="item">
            <p class="title">飞行棋盘</p>
            <flight-chess class="content" />
        </div>
        <div class="item">
            <p class="title">蒲公英时钟</p>
            <clock class="content" />
        </div>
        <div class="item">
            <p class="title">环形进度条</p>
            <circular-progress class="content" :percent="0.8" />
        </div>
        <div class="item">
            <p class="title">环形饼图</p>
            <pie-chart class="content" />
        </div>
        <div class="item">
            <p class="title">级联树</p>
            <cascade :data="cascadeData" align="center" class="content" />
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import flightChess from './flightChess.vue'
import clock from './clock.vue'
import circularProgress from './circularProgress.vue'
import pieChart from './pieChart.vue'
import cascade from '../home/cascade.vue'

export default defineComponent({
    name: 'Component',
    components: {
        flightChess,
        clock,
        circularProgress,
        pieChart,
        cascade
    },
    data () {
        return {
            cascadeData:[{
                title: '1',
                leftChildren: [
                    { title: '2', children: [
                        { title: '3' },
                        { title: '3' },
                    ] },
                    { title: '2', children: [
                        { title: '3' },
                        { title: '3' },
                    ] },
                ],
                rightChildren: [
                    { title: '2', children: [
                        { title: '3' },
                        { title: '3' },
                    ] },
                    { title: '2', children: [
                        { title: '3' },
                        { title: '3' },
                    ] },
                ]
            }]
        }
    }
})
</script>

<style lang="less" scoped>
.component {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    text-align: center;
    .item {
        margin: 0 20px;
        width: 200px;
    }
    .title {
        padding: 10px 0;
    }
    .content {
        height: 200px;
    }
}
@media screen and (orientation: portrait) {
    .component {
        padding: 2vw;
        justify-content: space-between;
        .item {
            margin: 0;
            width: 46vw;
        }
        .title {
            display: none;
        }
        .content {
            width: 46vw;
            height: 46vw;
        }
    }
}
</style>