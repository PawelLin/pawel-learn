import { ref, onMounted, onUnmounted } from 'vue'

export function useOrientation(): { device } {
    const device = ref('')
    function update () {
        const orientation = window.orientation
        if (orientation) {
            device.value = orientation === 90 || orientation === -90 ? 'pc' : 'mobile'
        } else {
            device.value = window.innerHeight < window.innerWidth ? 'pc' : 'mobile'
        }
        console.log(orientation)
    }
    onMounted(() => {
        update()
        window.addEventListener('resize', update)
    })
    onUnmounted(() => {
        window.removeEventListener('resize', update)
    })
    return { device }
}