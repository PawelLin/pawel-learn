<template>
    <div v-for="{ title, children, leftChildren, rightChildren, link } in data" class="cascade" :class="align">
        <div class="list left" v-if="(leftChildren || children) && (!direction || direction === 'left')">
            <Cascade :data="leftChildren || children" :align="align" :level="level + 1" direction="left" />
        </div>
        <div class="title" :class="getClass(children)">
            {{title}}
        </div>
        <div class="list right" v-if="(rightChildren || children) && (!direction || direction === 'right')">
            <Cascade :data="rightChildren || children" :align="align" :level="level + 1" direction="right" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { provide, inject, computed, reactive } from 'vue'
import Cascade from './cascade.vue'
const props = defineProps({
    data: Array,
    align: {
        type: String,
        default: 'top'
    },
    direction: {
        type: String
    },
    level: {
        type: Number,
        default: 1
    }
})
let maxLevel = reactive({ left: 0, right: 0 })
const number = computed(() => {
    if (props.level === 1) {
        const extra = maxLevel.left && maxLevel.right ? 1 : 0
        return maxLevel.left + maxLevel.right - props.level - extra
    } else {
        return maxLevel[props.direction] - props.level
    }
})
const getClass = children => {
    if (props.level === 1) {
        return [!maxLevel.left && 'not-left', !maxLevel.right && 'not-right']
    }
    return [
        props.direction === 'left' && !children && 'not-left',
        props.direction === 'right' && !children && 'not-right',
    ]
}
if (props.level === 1) {
    provide('maxLevel', maxLevel)
} else {
    maxLevel = inject('maxLevel')
    maxLevel[props.direction] = Math.max(maxLevel[props.direction], props.level)
}
</script>

<style lang="less" scoped>
@borderColor: #666;
@borderWidth: 1px;
@lineWidth: 1px;
@border: @lineWidth solid;
@height: 30px;
@distanceX: 15px;
@distanceY: 10px;
@topBottom: calc(50% - @lineWidth / 2);
// 0.98 8 7 6 4 3
// 0.97 9
// 0.95 5
// 0.93 2
// 0.73 1
@leftWidth: @distanceX * 2 + @lineWidth * if((@lineWidth = 1px), 0.73, if((@lineWidth = 2px), 0.93, if((@lineWidth = 5px), 0.95, 0.97)));
.cascade {
    display: flex;
    color: @borderColor;
    & + .cascade {
        margin-top: @distanceY;
    }
    &.center {
        align-items: center;
    }
    &.bottom {
        align-items: flex-end;
        .title {
            &:not(.not-left)::before, &:not(.not-right)::after {
                border-top: 0;
                border-bottom: @border;
            }
        }
    }
    .title {
        position: relative;
        width: calc((100% - v-bind(number) * @leftWidth) / (v-bind(number) + 1));
        height: @height;
        max-width: 100px;
        border: @borderWidth solid;
        // @todo 测试为啥用border会影响before，after的位置
        &:not(.not-left)::before {
            content: '';
            position: absolute;
            top: @topBottom;
            left: calc(-@distanceX);
            margin-left: calc(-@borderWidth);
            width: calc(@distanceX);
            border-top: @border;
        }
        &:not(.not-right)::after {
            content: '';
            position: absolute;
            top: @topBottom;
            right: calc(-@distanceX);
            margin-right: calc(-@borderWidth);
            width: calc(@distanceX);
            border-top: @border;
        }
    }
    .list {
        flex: 1;
        .cascade {
            position: relative;
            &::before {
                content: '';
                position: absolute;
                top: 0;
                bottom: calc(-@distanceY);
            }
            &:first-child::before {
                top: calc((@height - @lineWidth) / 2);
            }
            &:last-child::before {
                bottom: calc(100% - (@height + @lineWidth) / 2);
            }
            &:first-child:last-child::before {
                height: calc(@lineWidth * 0.73);
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
            &.bottom {
                &:first-child::before {
                    top: calc(100% - (@height + @lineWidth) / 2);
                    bottom: calc(-@distanceY);
                }
                &:last-child::before {
                    bottom: calc((@height - @lineWidth) / 2);
                }
                &:first-child:last-child::before {
                    top: calc(100% - @height / 2);
                }
            }
        }
        &.left {
            padding-right: @leftWidth;
            .cascade {
                justify-content: flex-end;
                &::before {
                    right: calc(-@distanceX - @lineWidth);
                    border-left: @border;
                }
                &.bottom:not(:last-child) > .title:not(.not-right)::after {
                    border-top: @border;
                    border-bottom: 0;
                }
                &:not(.bottom):nth-child(n + 2):last-child> .title::after {
                    border-top: 0;
                    border-bottom: @border;
                }
            }
        }
        &.right {
            padding-left: @leftWidth;
            .cascade {
                &::before {
                    left: calc(-@distanceX - @lineWidth);
                    border-right: @border;
                }
                &.bottom:not(:last-child) > .title:not(.not-left)::before {
                    border-top: @border;
                    border-bottom: 0;
                }
                &:not(.bottom):nth-child(n + 2):last-child > .title::before {
                    border-top: 0;
                    border-bottom: @border;
                }
            }
        }
    }
}
</style>