<template lang="html">
    <div>
        {{ value }}
        <Button @click="handleClick">验证</Button>
    </div>
</template>

<script>
import bus from '../libs/bus.js'

export default {
    data: function () {
        return {
            value: ''
        }
    },
    created () {
        bus.$on('change-value', value => {
            this.value = value
        })
    },
    methods: {
        handleClick () {
            this.$http.post('/ajax/ver-captcha', {
                value: this.value
            }).then(res => {
                this.$Message.info(res.data)
            })
        }
    }
}
</script>

<style lang="css">
</style>
