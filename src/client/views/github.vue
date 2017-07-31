<template lang="html">
    <div class="github">
        <Radio-group v-model="currentBranch" @on-change="getCommits">
            <Radio v-for="branch in branches" :label="branch.name" :key="branch.name"></Radio>
        </Radio-group>
        <Input-number :max="20" :min="1" v-model="size" size="small" @on-change="getCommits"></Input-number>
        <Button type="primary" size="small" @click="handleCreatePdf">生成PDF</Button>
        <br>
        <br>
        <Table :columns="columns" :data="commits"></Table>
    </div>
</template>

<script>

import pdfMake from 'pdfmake/build/pdfmake.min.js'
import pdfFonts from 'pdfmake/build/vfs_fonts.js'

pdfMake.vfs = pdfFonts.pdfMake.vfs

export default {
    data: function () {
        return {
            branches: [],
            commits: [],
            size: 3,
            currentBranch: 'master',
            columns: [
                {
                    title: 'SHA',
                    render: (h, params) => {
                        return h('a', {
                            attrs: {
                                href: params.row.html_url
                            }
                        }, params.row.sha.slice(0, 7))
                    }
                },
                {
                    title: 'Message',
                    render: (h, params) => {
                        let message = params.row.commit.message
                        let newline = message.indexOf('\n')
                        return newline > 0 ? message.slice(0, newline) : message
                    }
                },
                {
                    title: 'Author',
                    render: (h, params) => {
                        if (params.row.author) {
                            return params.row.author.login
                        }
                        return params.row.commit.author.name
                    }
                },
                {
                    title: 'Emaiil',
                    render: (h, params) => {
                        return params.row.commit.author.email
                    }
                },
                {
                    title: 'Date',
                    render: (h, params) => {
                        return params.row.commit.author.date
                    }
                }
            ]
        }
    },
    created () {
        let branchURL = 'https://api.github.com/repos/gcvin/iview-project/branches'
        this.$http.get(branchURL).then(respose => {
            this.branches = respose.data
            this.getCommits()
        })
    },
    methods: {
        getCommits () {
            let commitURL = `https://api.github.com/repos/gcvin/iview-project/commits?per_page=${this.size}&sha=${this.currentBranch}`
            this.$http.get(commitURL).then(respose => {
                this.commits = respose.data
            })
        },
        handleCreatePdf () {
            let head = this.columns.map(col => col.title)
            let body = this.commits.map(commit => {
                let tmp = []
                tmp.push(commit.sha.slice(0, 7))
                tmp.push(commit.commit.message.split('\n').pop())
                tmp.push(commit.commit.author.name)
                tmp.push(commit.commit.author.email)
                tmp.push(commit.commit.author.date)
                return tmp
            })
            let docDefinition = {
                content: [{
                    layout: 'lightHorizontalLines',
                    table: {
                        headerRows: 1,
                        body: [head, ...body]
                    }
                }]
            }
            pdfMake.createPdf(docDefinition).open()
        }
    }
}
</script>

<style lang="css">
.github {
    text-align: center;
    width: 800px;
    margin: 100px auto;
}
</style>
