<template>
    <div class="code" :class="[!title && 'not-title']">
        <div class="title">
            <span>{{title}}</span>
            <a @click="handleCopy" class="copy" href="javascript:;">复制代码</a>
        </div>
        <div ref="codeRef" v-html="html"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'

export default defineComponent({
    props: {
        title: {
            type: String,
            default: ''
        }
    },
    setup(props, { slots }) {
        let html = slots.default()[0].children
        if (typeof html !== 'string') {
            html = html[0].children
        }
        html = `<pre class="pre"><code>${html}</code></pre>`
        const codeRef: Ref = ref(null)
        const handleCopy = () => {
            alert(codeRef.value.innerText)
        }
        return {
            handleCopy,
            codeRef,
            html
        }
    },
})
</script>

<style lang="less" scoped>
.code {
    position: relative;
    > .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 1;
        > .copy {
            font-size: 14px;
        }
    }
    &.not-title {
        > .title {
            position: absolute;
            right: 0;
        }
        .hljs {
            padding: 0;
        }
    }
    :deep(.hljs) {
        padding: 0;
    }
    :deep(pre) {
        position: relative;
        top: -20px;
    }
}
</style>
