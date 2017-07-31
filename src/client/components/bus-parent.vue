<template lang="html">
    <div>
        {{ number }}
    </div>
</template>

<script>
import bus from '../libs/bus.js';

export default {
    data: function () {
        return {
            number: 0
        }
    },
    created () {
        bus.$on('change-number', num => {
            this.number = num;
        })
    }
}
</script>

<style lang="css">
</style>
