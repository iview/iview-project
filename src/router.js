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
    }
];
export default routers;
