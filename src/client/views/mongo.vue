<template lang="html">
    <div class="mongo">
        <Button type="primary" @click="handleAdd">添加用户</Button>
        <br />
        <br />
        <Table :columns="columns" :data="users"></Table>
        <Modal
            v-model="showModal"
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
                    <Input v-model.number="editUser.userAge" placeholder="请输入年龄"></Input>
                </Form-item>
                <Form-item label="登录时间">
                    <Date-picker v-model="editUser.loginDate" type="datetime" placeholder="选择日期和时间"></Date-picker>
                </Form-item>
            </Form>
        </Modal>
    </div>
</template>

<script>
import moment from 'moment'

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
                    render: (h, params) => moment(params.row.loginDate).format('YYYY-MM-DD HH:mm:ss')
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
                userAge: [
                    { required: true, type: 'number', message: '年龄格式不正确', trigger: 'blur' }
                ]
            },
            showModal: false,
            editUser: {},
            isAdd: false
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
            this.isAdd = false
            this.editUser = Object.assign({}, user)
            this.showModal = true
        },
        handleAdd () {
            this.isAdd = true
            this.editUser = {}
            this.showModal = true
        },
        handleRemove (id) {
            this.$Modal.confirm({
                title: '确认删除',
                content: '确认删除该用户的信息？',
                onOk: () => {
                    this.$http.post('/user/remove-user', { id }).then(res => {
                        if (res.data.success) {
                            this.$Message.success('删除成功!')
                            this.getUsers()
                        } else {
                            this.$Message.error('删除失败！')
                        }
                    })
                }
            })
        },
        handleEditSave () {
            this.$refs['editUser'].validate((valid) => {
                if (valid) {
                    let url = this.isAdd ? '/user/add-user' : '/user/edit-user'
                    let message = this.isAdd ? '添加' : '编辑'
                    this.$http.post(url, this.editUser).then(res => {
                        if (res.data.success) {
                            this.$Message.success(message + '成功!')
                            this.getUsers()
                        } else {
                            this.$Message.error(message + '失败！')
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
