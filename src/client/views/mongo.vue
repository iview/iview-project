<template lang="html">
    <div class="mongo">
        <Table :columns="columns" :data="users"></Table>
        <Modal
            v-model="showEdit"
            title="编辑用户"
            @on-ok="handleEditSave">
            <Form ref="editUser" :model="editUser" :rules="rules" :label-width="80">
                <Form-item label="姓名" prop="userName">
                    <Input v-model="editUser.userName" placeholder="请输入姓名"></Input>
                </Form-item>
                <Form-item label="地址" prop="userAddr">
                    <Input v-model="editUser.userAddr" placeholder="请输入地址"></Input>
                </Form-item>
                <Form-item label="年龄" prop="userAge">
                    <Input v-model="editUser.userAge" placeholder="请输入年龄"></Input>
                </Form-item>
                <Form-item label="登录时间">
                    <Date-picker v-model="editUser.loginDate" type="datetime" placeholder="选择日期和时间"></Date-picker>
                </Form-item>
            </Form>
        </Modal>
    </div>
</template>

<script>
export default {
    data () {
        return {
            columns: [
                {
                    title: '姓名',
                    key: 'userName'
                },
                {
                    title: '地址',
                    key: 'userAddr'
                },
                {
                    title: '年龄',
                    key: 'userAge'
                },
                {
                    title: '登录时间',
                    key: 'loginDate'
                },
                {
                    title: '操作',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.handleEdit(params.row)
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.handleRemove(params.row._id)
                                    }
                                }
                            }, '删除')
                        ])
                    }
                }
            ],
            users: [],
            rules: {
                userName: [
                    { required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
                userAddr: [
                    { required: true, message: '地址不能为空', trigger: 'blur' }
                ],
                userAge: [{
                    validator (rule, value, callback) {
                        if (!value) {
                            callback(new Error('年龄不能为空'))
                        } else if (!Number.parseInt(value)) {
                            callback(new Error('请输入大于零的整数'))
                        } else {
                            callback()
                        }
                    },
                    trigger: 'blur'
                }]
            },
            showEdit: false,
            editUser: {}
        }
    },
    created () {
        this.getUsers()
    },
    methods: {
        getUsers () {
            this.$http.get('/user/get-user').then(res => {
                this.users = res.data
            })
        },
        handleEdit (user) {
            this.editUser = Object.assign({}, user)
            this.showEdit = true
        },
        handleRemove (id) {
            this.$http.post('/user/remove-user', { id }).then(res => {
                if (res.data.success) {
                    this.$Message.success('删除成功!')
                    this.getUsers()
                } else {
                    this.$Message.error('删除失败！')
                }
            })
        },
        handleEditSave () {
            this.$refs['editUser'].validate((valid) => {
                if (valid) {
                    this.$http.post('/user/edit-user', this.editUser).then(res => {
                        if (res.data.success) {
                            this.$Message.success('编辑成功!')
                            this.getUsers()
                        } else {
                            this.$Message.error('编辑失败！')
                        }
                    })
                } else {
                    this.$Message.error('请检查用户信息是否输入正确!')
                }
            })
        }
    }
}
</script>

<style lang="css">
.mongo {
    width: 800px;
    margin: 100px auto;
}
</style>
