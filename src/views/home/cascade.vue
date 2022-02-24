<template>
    <div v-for="{ title, children, link } in data" class="cascade" :class="center ? 'center' : null">
        <div class="left" :class="children ? 'line' : null">
            {{title}}
        </div>
        <div class="right" v-if="children">
            <Cascade :data="children" :center="center" :level="level + 1" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, provide, inject, computed } from 'vue'
import Cascade from './cascade.vue'
const props = defineProps({
    data: Array,
    center: Boolean,
    level: {
        type: Number,
        default: 1
    }
})
let maxLevel = ref(1)
const number = computed(() => maxLevel.value - props.level)
if (props.level === 1) {
    provide('maxLevel', maxLevel)
} else {
    maxLevel = inject('maxLevel')
    maxLevel.value = Math.max(maxLevel.value, props.level)
}
</script>

<style lang="less" scoped>
@borderColor: #666;
@borderWidth: 1px;
@lineWidth: 1px;
@height: 30px;
@distanceX: 15px;
@distanceY: 10px;
@topBottom: calc(50% - @lineWidth / 2);
// 0.98 8 7 6 4 3
// 0.97 9
// 0.96 5
// 0.95 2
// 0.81 1
@leftWidth: @distanceX * 2 + @lineWidth * if((@lineWidth = 1px), 0.81, if((@lineWidth = 2px), 0.95, if((@lineWidth = 5px), 0.96, if((@lineWidth = 9px), 0.97, 0.98))));
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
        // width: 100px;
        width: calc((100% - v-bind(number) * @leftWidth) / (v-bind(number) + 1));
        height: @height;
        max-width: 100px;
        border: @borderWidth solid;
        // @todo 测试为啥用border会影响before，after的位置
        &.line {
            position: relative;
            &::after {
                content: '';
                position: absolute;
                top: @topBottom;
                right: calc(-@distanceX);
                margin-right: calc(-@borderWidth);
                width: calc(@distanceX);
                border-top: @lineWidth solid;
            }
        }
    }
    .right {
        flex: 1;
        padding-left: @leftWidth;
        .cascade {
            position: relative;
            &::before {
                content: '';
                position: absolute;
                top: 0;
                bottom: calc(-@distanceY);
                left: calc(-@distanceX - @lineWidth);
                border-right: @lineWidth solid;
            }
            &:first-child::before {
                top: calc((@height - @lineWidth) / 2);
            }
            &:last-child {
                &::before {
                    bottom: calc(100% - (@height + @lineWidth) / 2);
                }
                > .left::before {
                    border-top-width: 0;
                    border-bottom: @lineWidth solid;
                }
            }
            & + .cascade {
                margin-top: @distanceY;
            }
            &.center {
                &:first-child::before {
                    top: @topBottom;
                }
                &:last-child::before {
                    bottom: @topBottom;
                }
            }
        }
        .left {
            position: relative;
            &::before {
                content: '';
                position: absolute;
                top: @topBottom;
                left: calc(-@distanceX - @borderWidth);
                width: calc(@distanceX);
                border-top: @lineWidth solid;
            }
        }
    }
}
</style>