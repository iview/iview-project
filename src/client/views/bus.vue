<template lang="html">
    <div class="bus">
        <bus-parent></bus-parent>
        <bus-child></bus-child>
    </div>
</template>

<script>
import busChild from '../components/bus-child';
import busParent from '../components/bus-parent';

export default {
    components: {
        busChild,
        busParent
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
</style>
