<template>
    <div ref="canvasDiv">
        <canvas ref="canvas"></canvas>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        scale: {
            type: Number,
            default: 1
        },
        color: {
            type: String,
            default: '#3d4051'
        },
        // 阴影模糊面积
        shadowBlur: {
            type: Number,
            default: 10
        }
    },
    data () {
        return {
        }
    },
    beforeCreate () {
        this.minuteAnimate = 0
        this.dandelionAnimate = 0
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
        this.dandelionHeight = this.height / 4
        this.minuteHeight = this.dandelionHeight / 8
        this.minuteHandHeight = this.height / 2.1
        this.hourHandHeight = this.height / 3.2
        // this.drawCircle()
        this.drawMinuteFive()
        // this.drawMinute()
        // this.drawDandelion()
    },
    methods: {
        // 绘制单个分钟刻度
        drawMinutePer () {
            const ctx = this.ctx
            const centerX = this.centerX
            const centerY = this.centerY
            const radius = this.height / 2
            ctx.save()
            this.minuteAnimate += 6
            const i = this.minuteAnimate
            if (i && i % 5 !== 0) {
                ctx.save()
                ctx.translate(centerX, centerY)
                ctx.strokeStyle = this.color
                // ctx.lineWidth = 2
                ctx.lineWidth = 1 * this.size
                ctx.rotate(i / 180 * Math.PI)
                ctx.beginPath()
                ctx.moveTo(0, -radius)
                ctx.lineTo(0, -radius + this.minuteHeight)
                ctx.stroke()
                ctx.restore()
            }
            ctx.restore()
            if (i <= 390) {
                this.requestAnimationFrame(this.drawMinutePer)
            } else {
                this.minuteAnimate = 360
                this.reDrawTime()
                this.setInterval = setInterval(this.reDrawTime, 1000)
            }
        },
        // 绘制5的倍数分钟刻度
        drawMinuteFive () {
            const ctx = this.ctx
            const centerX = this.centerX
            const centerY = this.centerY
            const radius = this.height / 2
            this.minuteAnimate += 6
            const i = this.minuteAnimate
            if (i && i % 5 === 0) {
                ctx.save()
                ctx.translate(centerX, centerY)
                ctx.strokeStyle = this.color
                // ctx.lineWidth = 1
                ctx.lineWidth = 0.5 * this.size
                ctx.rotate(i / 180 * Math.PI)
                ctx.beginPath()
                ctx.moveTo(0, -radius + this.minuteHeight / 2)
                ctx.lineTo(0, -radius + this.dandelionHeight)
                ctx.stroke()
                ctx.restore()
                this.drawDandelionPer(i / 30)
            }
            if (i <= 360) {
                this.requestAnimationFrame(this.drawMinuteFive)
            } else {
                this.minuteAnimate = 24
                this.drawMinutePer()
            }
        },
        // 绘制单个蒲公英
        drawDandelionPer (index) {
            const ctx = this.ctx
            const radius = this.minuteHeight / 2
            const points = this.getPoints(this.centerX, this.centerY, this.height / 2 - radius, 12)
            const { x, y } = points[index - 1]
            ctx.save()
            ctx.strokeStyle = this.color
            // ctx.lineWidth = 1
            ctx.lineWidth = 0.5 * this.size
            const initAngle = index * 30
            const angle = 360 / (index || 12)
            const extraAngle = (index % 2) ? 0 : angle / 2
            if (index !== 2) {
                for (let i = 0; i < 360 / angle; i++) {
                    ctx.save()
                    ctx.translate(x, y)
                    ctx.rotate((initAngle + i * angle - extraAngle) / 180 * Math.PI)
                    ctx.beginPath()
                    ctx.moveTo(0, -radius)
                    ctx.lineTo(0, 0)
                    ctx.stroke()
                    ctx.restore()
                }
            } else {
                ctx.save()
                ctx.translate(x, y)
                ctx.rotate((initAngle + 45) / 180 * Math.PI)
                ctx.beginPath()
                ctx.moveTo(0, -radius)
                ctx.lineTo(0, 0)
                ctx.stroke()
                ctx.restore()
                ctx.save()
                ctx.translate(x, y)
                ctx.rotate((initAngle - 45) / 180 * Math.PI)
                ctx.beginPath()
                ctx.moveTo(0, -radius)
                ctx.lineTo(0, 0)
                ctx.stroke()
                ctx.restore()
            }
            ctx.restore()
        },
        // 按时间重绘
        reDrawTime () {
            const datas = this.getHourMinute()
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.drawMinute()
            this.drawDandelion()
            this.drawMinuteHand(datas.minute)
            this.drawHourHand(datas.hour)
            this.drawCenterCircle()
        },
        // 绘制中心原点
        drawCenterCircle () {
            const ctx = this.ctx
            const centerX = this.centerX
            const centerY = this.centerY
            ctx.save()
            ctx.fillStyle = this.color
            this.drawShadow()
            ctx.beginPath()
            ctx.arc(centerX, centerY, this.width * 0.016, 0, 2 * Math.PI)
            ctx.fill()
            ctx.restore()
        },
        // 绘制分针
        drawMinuteHand (rotate) {
            const ctx = this.ctx
            const centerX = this.centerX
            const centerY = this.centerY
            ctx.save()
            ctx.strokeStyle = this.color
            ctx.translate(centerX, centerY)
            ctx.rotate(-Math.PI + rotate)
            // ctx.lineWidth = 6
            ctx.lineWidth = 2 * this.size
            this.drawShadow()
            ctx.beginPath()
            ctx.moveTo(0, -this.minuteHandHeight * 0.16)
            ctx.lineTo(0, this.minuteHandHeight * 0.84)
            ctx.stroke()
            ctx.restore()
        },
        // 绘制时针
        drawHourHand (rotate) {
            const ctx = this.ctx
            const centerX = this.centerX
            const centerY = this.centerY
            ctx.save()
            ctx.strokeStyle = this.color
            ctx.translate(centerX, centerY)
            ctx.rotate(-Math.PI + rotate)
            // ctx.lineWidth = 7
            ctx.lineWidth = 2.5 * this.size
            this.drawShadow()
            ctx.beginPath()
            ctx.moveTo(0, -this.hourHandHeight * 0.16)
            ctx.lineTo(0, this.hourHandHeight * 0.84)
            ctx.stroke()
            ctx.restore()
        },
        // 绘制分钟刻度
        drawMinute () {
            const ctx = this.ctx
            const centerX = this.centerX
            const centerY = this.centerY
            const radius = this.height / 2
            ctx.save()
            ctx.translate(centerX, centerY)
            ctx.strokeStyle = this.color
            // this.drawShadow()
            for (let i = 0; i < 360; i += 6) {
                if (i && i % 5 !== 0) {
                    ctx.save()
                    // ctx.lineWidth = 2
                    ctx.lineWidth = 1 * this.size
                    ctx.rotate(i / 180 * Math.PI)
                    ctx.beginPath()
                    ctx.moveTo(0, -radius)
                    ctx.lineTo(0, -radius + this.minuteHeight)
                    ctx.stroke()
                    ctx.restore()
                } else {
                    ctx.save()
                    // ctx.lineWidth = 1
                    ctx.lineWidth = 0.5 * this.size
                    ctx.rotate(i / 180 * Math.PI)
                    ctx.beginPath()
                    ctx.moveTo(0, -radius + this.minuteHeight / 2)
                    ctx.lineTo(0, -radius + this.dandelionHeight)
                    ctx.stroke()
                    ctx.restore()
                }
            }
            ctx.restore()
        },
        // 绘制蒲公英
        drawDandelion () {
            const ctx = this.ctx
            const radius = this.minuteHeight / 2
            const points = this.getPoints(this.centerX, this.centerY, this.height / 2 - radius, 12)
            ctx.save()
            ctx.strokeStyle = this.color
            // ctx.lineWidth = 1
            ctx.lineWidth = 0.5 * this.size
            // this.drawShadow()
            points.forEach(({ x, y }, index) => {
                index += 1
                const initAngle = index * 30
                const angle = 360 / (index || 12)
                const extraAngle = (index % 2) ? 0 : angle / 2
                if (index !== 2) {
                    for (let i = 0; i < 360 / angle; i++) {
                        ctx.save()
                        ctx.translate(x, y)
                        ctx.rotate((initAngle + i * angle - extraAngle) / 180 * Math.PI)
                        ctx.beginPath()
                        ctx.moveTo(0, -radius)
                        ctx.lineTo(0, 0)
                        ctx.stroke()
                        ctx.restore()
                    }
                } else {
                    ctx.save()
                    ctx.translate(x, y)
                    ctx.rotate((initAngle + 45) / 180 * Math.PI)
                    ctx.beginPath()
                    ctx.moveTo(0, -radius)
                    ctx.lineTo(0, 0)
                    ctx.stroke()
                    ctx.restore()
                    ctx.save()
                    ctx.beginPath()
                    ctx.translate(x, y)
                    ctx.rotate((initAngle - 45) / 180 * Math.PI)
                    ctx.moveTo(0, -radius)
                    ctx.lineTo(0, 0)
                    ctx.stroke()
                    ctx.restore()
                }
            })
            ctx.restore()
        },
        drawShadow () {
            const ctx = this.ctx
            ctx.shadowBlur = 4 * this.size
            ctx.shadowOffsetX = 3 * this.size
            ctx.shadowOffsetY = 3 * this.size
            ctx.shadowColor = 'rgba(0, 0, 0, 0.6)'
        },
        drawCircle () {
            const ctx = this.ctx
            const centerX = this.centerX
            const centerY = this.centerY
            const radius = this.height / 2
            // ctx.lineWidth = 1
            ctx.lineWidth = 0.5 * this.size
            ctx.beginPath()
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
            ctx.stroke()
        },
        // 重绘
        reDraw () {
            if (this.minuteAnimate === 360) {
                clearInterval(this.setInterval)
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                this.minuteAnimate = 0
                this.drawMinuteFive()
            }
        },
        getHourMinute () {
            const date = new Date()
            const minute = date.getMinutes()
            const hour = date.getHours()
            const second = date.getSeconds()
            return {
                minute: (minute / 60 * (2 * Math.PI)) + (second / 60 * (Math.PI / 30)),
                hour: (hour % 12 / 12 * (2 * Math.PI)) + (minute / 60 * (Math.PI / 6))
            }
        },
        getPoints (ox, oy, r, count) {
            const points = []
            const radians = (Math.PI / 180) * Math.round(360 / count) // 弧度
            const middle = Math.floor(count / 2) + 1
            for (let i = 0; i < count; i++) {
                const x = ox + r * Math.sin(radians * i)
                const y = oy + r * Math.cos(radians * i)
                points.push({ x, y })
            }
            return points.slice(0, middle - 1).reverse().concat(points.slice(middle, count).reverse()).concat(points.slice(middle - 1, middle))
        },
        requestAnimationFrame (func) {
            if (window.requestAnimationFrame) {
                window.requestAnimationFrame(func)
            } else {
                setTimeout(func, 1000 / 60)
            }
        }
    },
    beforeUnmount () {
        clearInterval(this.setInterval)
    }
})
</script>