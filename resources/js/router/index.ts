import {createRouter, createWebHistory, Router, RouteRecordRaw} from "vue-router";
import vuex from '../vuex'

import Home from '../Views/Home.vue'
import Dashboard from '../Views/Dashboard.vue'
import AboutMe from '../Views/About-me.vue'
import Project from '../Views/Projects.vue'
import ContactMe from '../Views/Contact-me.vue'

const routes: Object = [
    { path: '/', component: Home, name: "Home", meta: { title: "Home" }},
    { path: '/about',  component: AboutMe, name: "AboutMe", meta: { title: "About me" }},
    { path: '/project',  component: Project, name: "Project", meta: { title: "Project" }},
    { path: '/contact-me',  component: ContactMe, name: "ContactMe", meta: { title: "Contact me" }},
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
