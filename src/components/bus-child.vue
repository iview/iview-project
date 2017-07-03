<template lang="html">
    <Input v-model="number" @on-change="changeNumber" placeholder="请输入..."></Input>
</template>

<script>
import bus from '../libs/bus.js';

export default {
    data: function () {
        return {
            number: 0
        }
    },
    methods: {
        changeNumber () {
            bus.$emit('change-number', this.number)
        }
    }
}
</script>

<style lang="css">
</style>
