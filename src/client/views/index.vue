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
            margin-bottom: 200px;
            p{
                margin: 0 0 50px;
            }
        }
        .ivu-row-flex{
            height: 100%;
        }
    }
</style>
<template>
    <div class="index">
        <Row type="flex" justify="center" align="middle">
            <Col span="24">
                <h1>
                    <img src="../images/logo.png">
                </h1>
                <h2>
                    <p>{{ slogan }}</p>
                    <Button type="ghost" @click="handleStart" class="tilt">Start iView</Button>
                    <br>
                    <br>
                    <Button type="ghost" @click="handleRecursion">递归</Button>
                    <Button type="ghost" @click="handlePromise">Promise</Button>
                    <Button type="ghost" @click="handleAwait">Async/Await</Button>
                </h2>
            </Col>
        </Row>
    </div>
</template>
<script>
    import VanillaTilt from 'vanilla-tilt';
    export default {
        data: function () {
            return {
                arr: [1, 2, 3, 4], //消息数组
                time: 1.5, // 每条消息显示多少秒
                slogan: ''
            }
        },
        mounted () {
            VanillaTilt.init(document.querySelector(".tilt"), {
        		max: 50,
        		speed: 400
        	});
            this.$http.get('/ajax/get-slogan').then(res => {
                this.slogan = res.data.slogan
            })
        },
        methods: {
            handleStart () {
                this.$Modal.info({
                    title: 'Bravo',
                    content: 'Now, enjoy the convenience of iView.'
                });
            },
            handleRecursion () {
                let vm = this;
                (function next (len, curr) {
                    if (curr < len) {
                        vm.$Message.info({
                            content: `第${vm.arr[curr]}条消息`,
                            duration: vm.time,
                            onClose: _ => {
                                next(len, curr + 1);
                            }
                        });
                    }
                })(vm.arr.length, 0);
            },
            handlePromise () {
                let vm = this
                vm.promiseForEach(vm.arr, (curr) => {
                    return new Promise((resolve, reject) => {
                        vm.$Message.info({
                            content: `第${curr}条消息`,
                            duration: vm.time
                        });
                        setTimeout(() => {
                            return resolve();
                        }, vm.time * 1000);
                    })
                })
            },
            async handleAwait () {
                let vm = this;
                for (let i = 0; i < vm.arr.length; i++) {
                    let number = vm.arr[i];
                    await new Promise((resolve, reject) => {
                        vm.$Message.info({
                            content: `第${number}条消息`,
                            duration: vm.time
                        });
                        setTimeout(() => {
                            return resolve();
                        }, vm.time * 1000);
                    })
                }
            },
            promiseForEach (arr, cb) {
                let realResult = []
                let result = Promise.resolve()
                arr.forEach(item => {
                    result = result.then(() => {
                        return cb(item).then((res) => {
                            realResult.push(res)
                        })
                    })
                })

                return result.then(() => {
                    return realResult
                })
            }
        }
    }
</script>
