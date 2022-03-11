<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: '请输入'
    },
    maxlength: {
        type: Number,
        default: 9
    },
    point: {
        type: Number,
        default: 2
    },
    inMax: {
        type: Boolean,
        default: true
    }
})
const emit = defineEmits(['update:modelValue'])
const regExp = computed(() => new RegExp(`(^(\\d{0,${props.maxlength}})?(\\.\\d{0,${props.point}})?$)${props.inMax ? `|(^${ 10 ** props.maxlength }$)` : ''}`))
const value = computed({
    get () {
        return props.modelValue
    },
    set (value) {
        emit('update:modelValue', value)
    }
})
let selectionEnd
function _input (e) {
    selectionEnd = e.target.selectionEnd
    const _value = e.target.value
    if (_value && !regExp.value.test(_value)) {
        e.target.value = _value.match(/\d/) ? value.value : ''
        selectionEnd -= (_value.length - value.value.length)
    } else {
        value.value = e.target.value
    }
    e.target.setSelectionRange(selectionEnd, selectionEnd)
}
function _blur (e) {
    const _value = e.target.value
    value.value = _value.match(/\d/) ? Number(_value).toString() : ''
}
</script>

<template>
    <input :value="value" @input="_input" @blur="_blur" type="text" inputmode="decimal" :placeholder="placeholder">
    <p>{{value}}{{typeof value}}</p>
</template>