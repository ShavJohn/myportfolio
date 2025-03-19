import {createRouter, createWebHistory, Router, RouteRecordRaw} from "vue-router";
import vuex from '../vuex'

import Home from '../Views/Home.vue'
import Dashboard from '../Views/Dashboard.vue'

const routes: Object = [
    { path: '/', component: Home, name: "Home", meta: { title: "Home" }},
    { path: '/dashboard', component: Dashboard, name: "Dashboard", meta: { title: "Dashboard" }}
]

const router: Router = createRouter(<any> {
    history: createWebHistory(),
    routes
})

router.beforeEach(async (toRoute, fromRoute, next) => {

    if (toRoute.meta && toRoute.meta.title) {
        if (toRoute.params && Object.keys(toRoute.params) && Object.keys(toRoute.params).length) {
            let metaData = toRoute.params[toRoute.meta.title].replace('-', ' ')
            window.document.title = metaData.toUpperCase()
        } else {
            window.document.title = toRoute.meta.title
        }
    } else {
        window.document.title = 'Home'
    }

    next()
})

export default router
