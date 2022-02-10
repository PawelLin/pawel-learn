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
    & + .cascade {
        margin-top: @distanceY;
    }
    &.center {
        align-items: center;
    }
    .title {
        width: 100px;
        height: @height;
        border: 1px solid @borderColor;
        &.line {
            position: relative;
            &::after {
                content: '';
                position: absolute;
                top: 50%;
                right: calc(-@distanceX);
                width: @distanceX;
                height: 1px;
                background-color: @borderColor;
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
                background-color: @borderColor;
            }
            &:first-child::before {
                top: calc(@height / 2);
            }
            &:last-child::before {
                bottom: calc(100% - @height / 2 - 1px);
            }
            & + .cascade {
                margin-top: @distanceY;
            }
            &.center {
                &:first-child::before {
                    top: 50%;
                }
                &:last-child::before {
                    bottom: calc(50% - 1px);
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
                    left: calc(-@distanceX / 2);
                    width: calc(@distanceX / 2);
                    height: 1px;
                    background-color: @borderColor;
                }
            }
        }
    }
}
</style>