<template>
    <flight-chess />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import flightChess from './flightChess.vue'

export default defineComponent({
    name: 'Component',
    components: {
        flightChess
    }
})
</script>
