<template lang="html">
    <div class="bus">
        <bus-parent :class="[{ active: isActive }, bold]"></bus-parent>
        <bus-child class="arrow"></bus-child>
        <img :src="imgurl" alt="图形验证码" @click="changeImage()">
    </div>
</template>

<script>
/* eslint no-undef: "off" */
import busChild from '../components/bus-child'
import busParent from '../components/bus-parent'

export default {
    data () {
        return {
            isActive: true,
            bold: 'bold',
            refresh: 0
        }
    },
    computed: {
        imgurl () {
            return '/ajax/get-imgcode?' + this.refresh
        }
    },
    components: {
        busChild,
        busParent
    },
    methods: {
        changeImage (e) {
            this.refresh++
        }
    }
}
</script>

<style lang="css">
.bus {
    text-align: center;
    width: 200px;
    margin: 0 auto;
    margin-top: 200px;
}
.active {
    color: #42b983;
}

.bold {
    font-weight: bold;
}

.arrow {
    margin-top: 20px;
}

.arrow:before {
    border: 10px solid transparent;
    border-bottom: 10px solid #dddee1;
    width: 0;
    height: 0;
    position: absolute;
    content: ' ';
    top: -20px;
    left: 50%;
    margin-left: -10px;
}

.arrow:after {
    border: 10px solid transparent;
    border-bottom: 10px solid #fff;
    width: 0;
    height: 0;
    position: absolute;
    content: ' ';
    top: -18px;
    left: 50%;
    margin-left: -10px;
}
</style>
