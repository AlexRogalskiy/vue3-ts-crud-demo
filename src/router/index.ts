import { createWebHistory,createRouter,RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path:'/',
        alias:'/tutorials',
        name:'tutorials',
        component:() => import('@/components/TutorialList.vue'),
    },
    {
        path:'/tutorials/:id',
        name:'tutorialDetail',
        component:() => import('@/components/TutorialDetail.vue'),
    },
    {
        path:'/add',
        name:'add',
        component:() => import('@/components/AddTutorial.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;