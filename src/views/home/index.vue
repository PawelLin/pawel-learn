<template>
    <div class="home" @scroll="handleScroll">
        <h1>JavaScript Learning</h1>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
})
</script>


<style lang="less" scoped>
h1 {
    margin: 0;
    padding: 0;
    height: calc(100vh - 64px);
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>