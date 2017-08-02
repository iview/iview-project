const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/bus',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/bus.vue'], resolve)
    },
    {
        path: '/github',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/github.vue'], resolve)
    }
]
export default routers
