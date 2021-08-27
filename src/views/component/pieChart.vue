<template>
    <div ref="canvasDiv">
        <canvas ref="canvas" @click="showActive"></canvas>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    inheritAttrs: false,
    props: {
        // 各圆环占比列表
        datas: {
            type: Array,
            default () {
                return [0.2, 0.2, 0.2, 0.2, 0.2]
            }
        },
        // 各圆环色系列表
        colors: {
            type: Array,
            default () {
                return ['#4FBBFD', '#FD642E', '#8BC44C', '#FFB508', '#3A84FD', '#FD642E']
            }
        },
        // 圆环宽度占比
        land: {
            type: Number,
            default: 0.4
        },
        // 圆环旋转角度0°~360°
        rotate: {
            type: Number,
            default: 30
        },
        // 圆环缩放比例
        scale: {
            type: Number,
            default: 0.8
        },
        // 选中圆环缩放比例(需大于1)
        activeScale: {
            type: Number,
            default: 1.1
        },
        // 空白块颜色
        spaceColor: {
            type: String,
            default: 'white'
        },
        // 阴影模糊面积
        shadowBlur: {
            type: Number,
            default: 16
        }
    },
    data () {
        return {
        }
    },
    computed: {
        ratios () {
            return this.countRatio(this.datas)
        }
    },
    beforeCreate () {
        this.animateSize = 0
        this.animateIndex = 0
        this.start = 0
        this.end = 0
        this.active = 0
    },
    created () {
    },
    mounted () {
        const canvas = this.canvas = this.$refs.canvas
        this.ctx = canvas.getContext('2d')
        this.size = (window.devicePixelRatio || 1) / (this.ctx.backingStorePixelRatio ||
            this.ctx.webkitBackingStorePixelRatio ||
            this.ctx.mozBackingStorePixelRatio ||
            this.ctx.msBackingStorePixelRatio ||
            this.ctx.oBackingStorePixelRatio || 1)
        const width = this.$refs.canvasDiv.offsetWidth || document.body.offsetWidth
        canvas.style.width = width + 'px'
        canvas.style.height = width + 'px'
        canvas.width = width * this.size
        canvas.height = width * this.size
        this.centerX = canvas.width / 2
        this.centerY = canvas.height / 2
        this.width = canvas.width * this.scale
        this.height = canvas.height * this.scale
        this.drawPie()
    },
    methods: {
        showActive (e) {
            if (this.animateSize === 360) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                this.drawShadow()
                this.drawPointPies(this.getEventPosition(e))
                this.drawActivePie()
                this.drawSpacePie()
            }
        },
        // 绘制可点击的圆环
        drawPointPies (point) {
            const ctx = this.ctx
            const centerX = this.centerX
            const centerY = this.centerY
            const radius = this.height / 2
            let start = 0
            let end = 0
            const isSpace = point && this.drawSpacePie().isPointInPath(point.x, point.y)
            this.ratios.forEach((item, index) => {
                end = item * 2 * Math.PI
                ctx.beginPath()
                ctx.moveTo(centerX, centerY)
                ctx.fillStyle = this.colors[index]
                this.drawArc(centerX, centerY, radius, start, end)
                ctx.closePath()
                ctx.fill()
                if (point && ctx.isPointInPath(point.x, point.y) && !isSpace) {
                    this.active = index
                }
                start = end
            })
        },
        // 绘制选中的圆环
        drawActivePie () {
            const ctx = this.ctx
            const centerX = this.centerX
            const centerY = this.centerY
            const radius = this.height / 2
            const start = this.active - 1 < 0 ? 0 : this.ratios[this.active - 1] * 2 * Math.PI
            const end = this.ratios[this.active] * 2 * Math.PI
            ctx.beginPath()
            ctx.moveTo(centerX, centerY)
            ctx.fillStyle = this.colors[this.active]
            this.drawArc(centerX, centerY, radius * this.activeScale, start, end)
            ctx.closePath()
            ctx.fill()
        },
        // 绘制动画圆环
        drawPie () {
            this.animateSize += 6
            this.end = 2 * Math.PI * (this.animateSize / 360)
            const ctx = this.ctx
            const centerX = this.centerX
            const centerY = this.centerY
            const radius = this.height / 2
            ctx.beginPath()
            ctx.moveTo(centerX, centerY)
            ctx.fillStyle = this.colors[this.getPieColorIndex(this.animateSize / 360)]
            this.drawArc(centerX, centerY, radius, this.start, this.end)
            ctx.closePath()
            ctx.fill()
            this.drawSpacePie()
            if (this.animateSize < 360) {
                this.start = this.end - 0.002
                this.requestAnimationFrame(this.drawPie)
            } else {
                this.drawShadow()
                this.drawPointPies()
                this.drawActivePie()
                this.drawSpacePie()
            }
        },
        // 绘制中间圆环
        drawSpacePie () {
            const ctx = this.ctx
            const centerX = this.centerX
            const centerY = this.centerY
            const radius = this.height / 2
            ctx.beginPath()
            ctx.moveTo(centerX, centerY)
            ctx.fillStyle = this.spaceColor
            this.drawArc(centerX, centerY, radius * (1 - this.land), 0, 2 * Math.PI)
            ctx.closePath()
            ctx.fill()
            return ctx
        },
        // 绘制阴影
        drawShadow () {
            const ctx = this.ctx
            const centerX = this.centerX
            const centerY = this.centerY
            const radius = this.height / 2
            ctx.beginPath()
            ctx.shadowBlur = this.shadowBlur * this.size
            ctx.shadowColor = '#999999'
            ctx.fillStyle = this.spaceColor
            ctx.arc(centerX, centerY, radius, Math.PI / 4, Math.PI - Math.PI / 4)
            ctx.closePath()
            ctx.fill()
            ctx.shadowBlur = 0
        },
        // 重绘
        reDraw () {
            if (this.animateSize === 360) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                this.animateSize = 0
                this.animateIndex = 0
                this.start = 0
                this.end = 0
                this.drawPie()
            }
        },
        drawArc (x, y, radius, start, end) {
            this.ctx.arc(x, y, radius, this.getAngle(start), this.getAngle(end))
        },
        countRatio (data) {
            let total = 0
            return data.map(item => (total += item))
        },
        getPieColorIndex (ratio) {
            return ratio > this.ratios[this.animateIndex] ? Math.min((this.animateIndex += 1), this.ratios.length - 1) : this.animateIndex
        },
        getAngle (angle) {
            return (this.rotate - 90) / 360 * 2 * Math.PI + angle
        },
        // 获取当前点击的坐标
        getEventPosition (e) {
            const size = this.size
            const x = e.offsetX || e.layerX
            const y = e.offsetY || e.layerY
            return { x: x * size, y: y * size }
        },
        requestAnimationFrame (func) {
            if (window.requestAnimationFrame) {
                window.requestAnimationFrame(func)
            } else {
                setTimeout(func, 1000 / 60)
            }
        }
    }
})
</script>
