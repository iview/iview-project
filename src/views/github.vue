<template lang="html">
    <div class="github">
        <Radio-group v-model="currentBranch" @on-change="getCommits">
            <Radio v-for="branch in branches" :label="branch.name" :key="branch.name"></Radio>
        </Radio-group>
        <Input-number :max="20" :min="1" v-model="size" size="small" @on-change="getCommits"></Input-number>
        <br>
        <br>
        <Table :columns="columns" :data="commits"></Table>
    </div>
</template>

<script>
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
                    key: 'sha',
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
