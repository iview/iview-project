<style scoped lang="less">
    .index{
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;
        h1{
            height: 150px;
            img{
                height: 100%;
            }
        }
        h2{
            color: #666;
        }
        .ivu-row{
            height: 100%;
        }
    }
</style>
<template>
    <div class="index">
        <Row type="flex" justify="center" align="middle">
            <i-col span="24">
                <h1>
                    <img src="../images/logo.png">
                </h1>
                <h2>一套基于 Vue.js 的高质量UI组件库</h2>
            </i-col>
        </Row>
    </div>
</template>
<script>
    export default {

    }
</script>
