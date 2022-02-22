<template>
    <div v-for="{ title, children, link } in data" class="cascade" :class="center ? 'center' : null">
        <div class="left" :class="children ? 'line' : null">
            {{title}}
            <div class="left-border"></div>
        </div>
        <div class="right" v-if="children">
            <Cascade :data="children" :center="center" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import Cascade from './cascade.vue'
const props = defineProps({
    data: Array,
    center: Boolean
})
</script>

<style lang="less" scoped>
@borderColor: #666;
@height: 30px;
@distanceX: 30px;
@distanceY: 10px;
@lineWidth: 1px;
.cascade {
    display: flex;
    color: @borderColor;
    & + .cascade {
        margin-top: @distanceY;
    }
    &.center {
        align-items: center;
    }
    .left {
        position: relative;
        width: 100px;
        height: @height;
        // @todo 测试为啥用border会影响before，after的位置
        &.line {
            position: relative;
            &::after {
                content: '';
                position: absolute;
                top: 50%;
                right: calc(-@distanceX / 2);
                width: calc(@distanceX / 2);
                transform: translateY(-50%);
                border-top: @lineWidth solid;
            }
        }
        > .left-border {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            border: 1px solid;
        }
    }
    .right {
        margin-left: @distanceX;
        .cascade {
            position: relative;
            &::before {
                content: '';
                position: absolute;
                top: 0;
                bottom: calc(-@distanceY);
                left: calc(-@distanceX / 2);
                border-left: @lineWidth solid;
            }
            &:first-child::before {
                top: calc(@height / 2);
            }
            &:last-child::before {
                bottom: calc(100% - @height / 2);
            }
            & + .cascade {
                margin-top: @distanceY;
            }
            &.center {
                &:first-child::before {
                    top: 50%;
                }
                &:last-child::before {
                    bottom: 50%;
                }
            }
        }
        .left {
            position: relative;
            &::before {
                content: '';
                position: absolute;
                top: 50%;
                left: calc(-@distanceX / 2);
                width: calc(@distanceX / 2);
                transform: translateY(-50%);
                border-top: @lineWidth solid;
            }
        }
    }
}
</style>