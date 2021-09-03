<template>
    <div class="view-code">
        <div class="title">
            <span>{{title}}</span>
            <a @click="handleCopy" class="copy" href="javascript:;">复制代码</a>
        </div>
        <div class="contain">
            <div class="view">
                <div :style="value.replace(/\n/g, '')">{{text}}</div>
            </div>
            <textarea v-model="value" class="code"></textarea>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
    props: {
        title: {
            type: String,
            default: ''
        },
        text: {
            type: String,
            default: ''
        },
        code: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        const value = ref(props.code.replace(/;/g, ';\n'))
        const handleCopy = () => {
            const copyTextarea = document.getElementById('copyTextarea') as HTMLTextAreaElement
            if (copyTextarea) {
                copyTextarea.value = value.value
                setTimeout(() => {
                    copyTextarea.select()
                    document.execCommand('copy')
                }, 0)
            }
        }
        onMounted(() => {
            if (!document.getElementById('copyTextarea')) {
                const copyTextarea = document.createElement('textarea')
                copyTextarea.id = 'copyTextarea'
                copyTextarea.style.width = '0'
                copyTextarea.style.height = '0'
                // copyTextarea.style.border = 'none'
                document.body.append(copyTextarea)
            }
        })
        return {
            value,
            handleCopy
        }
    },
})
</script>


<style lang="less" scoped>
.view-code {
    margin: 20px 20px 0 0;
    width: 16.6666%;
    min-width: 200px;
    border: 1px solid #eaeaea;
    border-radius: 8px;
    > .title {
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #eaeaea;
        > .copy {
            font-size: 14px;
        }
    }
    > .contain {
        display: flex;
        > .view {
            width: 40%;
            padding: 10px 5px 5px 10px;
            font-size: 14px;
        }
        > .code {
            width: 60%;
            padding: 10px 10px 5px 5px;
            height: 100px;
            border: none;
            border-left: 1px solid #eaeaea;
            border-bottom-right-radius: 8px;
            outline: none;
            resize: none;
        }
    }
}
@media screen and (orientation: portrait) {
    .view-code {
        margin-right: 0;
        width: 100%;
        min-width: 100%;
    }
}
</style>