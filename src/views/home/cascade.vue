<template>
    <section>
        <div v-for="{ title, children, link } in data" class="cascade" :class="center ? 'center' : null">
            <div class="left">
                <p class="title" :class="children ? 'line' : null">{{title}}</p>
            </div>
            <div class="right" v-if="children">
                <Cascade :data="children" :center="center" />
            </div>
        </div>
    </section>
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
.cascade {
    display: flex;
    color: @borderColor;
    & + .cascade {
        margin-top: @distanceY;
    }
    &.center {
        align-items: center;
    }
    .title {
        width: 100px;
        height: @height;
        border: 1px solid;
        &.line {
            position: relative;
            &::after {
                content: '';
                position: absolute;
                top: 50%;
                right: calc(-@distanceX - 1px);
                width: @distanceX;
                border-top: 1px solid;
            }
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
                width: 1px;
                border-left: 1px solid;
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
                    bottom: calc(50%);
                }
            }
        }
        .left {
            .title {
                position: relative;
                &::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: calc(-@distanceX / 2 - 1px);
                    width: calc(@distanceX / 2);
                    border-top: 1px solid;
                }
            }
        }
    }
}
</style>