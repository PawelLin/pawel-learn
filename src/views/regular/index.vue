<template>
    <div class="regular">
        <ul class="menu">
            <li v-for="{ title, id } in list" :key="id">
                <a @click="handleClick(id)" :class="[active === id && 'active']" href="javascript:;">{{title}}</a>
            </li>
        </ul>
        <div class="function">
            <view-code id="regular-phone">
                <pre><code>
/**
* 简单手机号
*/
/^1\d{10}$/
                </code></pre>
            </view-code>
            <view-code id="regular-number-letter">
                <pre><code>
/**
* 数字+字母组成6位以上
*/
/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/
                </code></pre>
            </view-code>
            <view-code id="regular-email">
                <pre><code>
/**
* 邮箱
*/
/^[0-9a-zA-Z_-]{1,30}@([0-9a-zA-Z_-]{1,28}\.[0-9a-zA-Z_-]+)+$/
                </code></pre>
            </view-code>
            <view-code id="regular-series-letter">
                <pre><code>
/**
* 获取判断连续字母的正则表达式
* @params {number} num 连续字母的长度
*/
function getLetterRegx (num) {
    const A_BIG_CODE = 'A'.charCodeAt()
    const A_SMALL_CODE = 'a'.charCodeAt()
    let arr = Array.from(new Array(25).keys())
    let arrReverse = Array.from(new Array(25).keys()).reverse()
    let AZ = arr.map(index => `${String.fromCharCode(index + A_BIG_CODE)}(?=${String.fromCharCode(index + A_BIG_CODE + 1)})`).join('|')
    let ZA = arrReverse.map(index => `${String.fromCharCode(index + A_BIG_CODE + 1)}(?=${String.fromCharCode(index + A_BIG_CODE)})`).join('|')
    let az = arr.map(index => `${String.fromCharCode(index + A_SMALL_CODE)}(?=${String.fromCharCode(index + A_SMALL_CODE + 1)})`).join('|')
    let za = arrReverse.map(index => `${String.fromCharCode(index + A_SMALL_CODE + 1)}(?=${String.fromCharCode(index + A_SMALL_CODE)})`).join('|')
    let regx = [AZ, ZA, az, za].map(item => `((${item}){${num - 1}}[a-zA-Z])`).join('|')
    return new RegExp(regx)
}
                </code></pre>
            </view-code>
            <view-code id="regular-series-number">
                <pre><code>
/**
 * 获取判断连续数字的正则表达式
 * @params {number} num 连续数字的长度
*/
function getNumberRegx (num) {
    let arr = Array.from(new Array(9).keys())
    let forward = arr.map(index => `${index}(?=${index + 1})`).join('|')
    let reverse = arr.map(index => `${9 - index}(?=${9 - index - 1})`).join('|')
    let regx = [forward, reverse].map(item => `((${item}){${num - 1}}\\d)`).join('|')
    return new RegExp(regx)
}
                </code></pre>
            </view-code>
            <view-code id="regular-same-letter">
                <pre><code>
/**
 * 获取判断连续相同字母的正则表达式
 * @params {number} num 连续相同字母的长度
*/
function getCommonLetterRegx (num) {
    return new RegExp('([a-zA-Z])\\1{' + (num - 1) + '}');
}
                </code></pre>
            </view-code>
            <view-code id="regular-same-number">
                <pre><code>
/**
 * 获取判断连续相同数字的正则表达式
 * @params {number} num 连续相同数字的长度
*/
function getCommonNumberRegx (num) {
    return new RegExp('(\\d)\\1{' + (num - 1) + '}');
}
                </code></pre>
            </view-code>
        </div>
        <div class="">

        </div>
    </div>
</template>

<script lang="ts">
import hljs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript'
import ruby from 'highlight.js/lib/languages/ruby'
import 'highlight.js/styles/a11y-light.css';
import { defineComponent, onMounted, ref } from 'vue'
import ViewCode from './viewCode.vue'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('ruby', ruby)

export default defineComponent({
    name: 'Regular',
    components: {
        ViewCode
    },
    setup () {
        const list = [
            { title: '简单手机号', id: 'regular-phone' },
            { title: '数字+字母组成6位以上', id: 'regular-number-letter' },
            { title: '邮箱', id: 'regular-email' },
            { title: '连续字母', id: 'regular-series-letter' },
            { title: '连续数字', id: 'regular-series-number' },
            { title: '连续相同字母', id: 'regular-same-letter' },
            { title: '连续相同数字', id: 'regular-same-number' },
        ]
        let active = ref('regular-phone')
        const handleClick = (id:string) => {
            active.value = id
            document.documentElement.scrollTop = (document.getElementById(id) as HTMLElement).offsetTop - 84
        }
        onMounted(() => {
            hljs.highlightAll()
        })
        return {
            list,
            active,
            handleClick
        }
    }
})
</script>

<style lang="less" scoped>
.regular {
    padding: 20px;
    display: flex;
    > .menu {
        position: sticky;
        top: 84px;
        min-width: 200px;
        height: 100%;
        > li {
            cursor: pointer;
            &:hover > a {
                color: #000;
            }
            > a {
                color: #666;
                &.active {
                    color: #000;
                }
            }
        }
        > li + li {
            margin-top: 10px;
        }
    }
    > .function {
        margin-left: 20px;
        padding-bottom: 100%;
        overflow: auto;
    }
}
@media screen and (orientation: portrait) {
    .regular {
        > .menu {
            display: none;
        }
        > .function {
            margin-left: 0;
            padding-bottom: 0;
            max-width: 100%;
        }
    }
}
</style>
