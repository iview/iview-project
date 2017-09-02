<template lang="html">
    <Input v-model="value" @on-change="changeValue" placeholder="请输入..."></Input>
</template>

<script>
import bus from '../libs/bus.js'

export default {
    data: function () {
        return {
            value: ''
        }
    },
    methods: {
        changeValue () {
            bus.$emit('change-value', this.value)
        }
    }
}
</script>

<style lang="css">
</style>
