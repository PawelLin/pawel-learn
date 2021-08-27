<template>
    <div class="circular-progress">
        <svg :viewBox="viewBox">
            <path
                ref="circlePath"
                :d="d"
                :stroke="color"
                :stroke-width="width"
                :stroke-opacity="opacity"
                :stroke-linecap="linecap"
                :style="circlePath"
                fill-opacity="0"
            ></path>
            <path
                :d="d"
                :stroke="color"
                :stroke-width="width"
                :style="circleFill"
                fill-opacity="0"
            ></path>
        </svg>
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        padding: {
            type: Number,
            default: 10
        },
        width: {
            type: Number,
            default: 8
        },
        color: {
            type: String,
            default: '#e7923c'
        },
        angle: {
            type: Number,
            default: 280
        },
        percent: {
            type: Number,
            default: 0
        },
        opacity: {
            type: Number,
            default: 0.3
        },
        linecap: {
            type: String,
            default: 'round'
        },
        time: {
            type: Number,
            default: 0.3
        }
    },
    data () {
        return {
            viewBoxWidth: Math.min(375, document.body.clientWidth),
            circlePath: {
                strokeDasharray: '',
                strokeDashoffset: ''
            },
            circleFill: {
                strokeDasharray: '',
                strokeDashoffset: '',
                strokeLinecap: ''
            }
        }
    },
    computed: {
        d () {
            const width = this.viewBoxWidth / 2
            const radius = width - this.width - this.padding
            return `
                M ${width},${width} m 0,${radius}
                a ${radius},${radius} 0 1 1 0,-${radius * 2}
                a ${radius},${radius} 0 1 1 0,${radius * 2}
            `
        },
        viewBox () {
            return `0 0 ${this.viewBoxWidth} ${this.viewBoxWidth}`
        }
    },
    watch: {
        percent () {
            this.setCircle()
        }
    },
    mounted () {
        this.setCircle()
    },
    methods: {
        setCircle () {
            if (this.length === undefined) {
                const noneAngle = 360 - this.angle
                const allLength = this.allLength = this.$refs.circlePath.getTotalLength()
                const noneLength = noneAngle / 360 * allLength
                const length = this.length = allLength - noneLength
                this.circlePath.strokeDasharray = `${length} ${noneLength}`
                this.circlePath.strokeDashoffset = -noneLength / 2
                this.circleFill.strokeDasharray = `0 ${allLength}`
                this.circleFill.strokeDashoffset = -noneLength / 2
                this.circleFill.transition = `stroke-dasharray ${this.time}s ease`
            }
            if (this.percent > 0) {
                this.circleFill.strokeLinecap = this.linecap
            }
            setTimeout(() => {
                const value = this.length * this.percent
                this.circleFill.strokeDasharray = `${value} ${this.allLength}`
                if (value <= 0) {
                    setTimeout(() => {
                        this.circleFill.strokeLinecap = ''
                    }, this.time * 1000)
                }
            })
        }
    }
})
</script>

<style lang="less" scoped>
.circular-progress {
    overflow: hidden;
}
</style>