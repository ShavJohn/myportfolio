import {createRouter, createWebHistory, Router} from "vue-router";
import store from "../vuex";

import Home from '../Views/Home.vue'
import Dashboard from '../Views/Dashboard.vue'
import AboutMe from '../Views/About-me.vue'
import Project from '../Views/Projects.vue'
import ContactMe from '../Views/Contact-me.vue'
import Auth from '../Views/Auth.vue'

const routes: Object = [
    { path: '/', component: Home, name: "Home", meta: { title: "Home" }},
    { path: '/about',  component: AboutMe, name: "AboutMe", meta: { title: "About me" }},
    { path: '/project',  component: Project, name: "Project", meta: { title: "Project" }},
    { path: '/contact-me',  component: ContactMe, name: "ContactMe", meta: { title: "Contact me" }},
    { path: '/dashboard', component: Dashboard, name: "Dashboard", meta: { title: "Dashboard" }},
    { path: '/login', component: Auth, name: "Login", meta: { title: "Login" }}
]

const router: Router = createRouter(<any> {
    history: createWebHistory(),
    routes
})

router.beforeEach(async (toRoute, fromRoute, next) => {
    if (toRoute.meta && toRoute.meta.title) {
        const titleKey = toRoute.meta.title as string;

        if (toRoute.params && Object.keys(toRoute.params).length) {
            const metaData = String(toRoute.params[titleKey]).replace('-', ' ');
            window.document.title = metaData.toUpperCase();
        } else {
            window.document.title = titleKey;
        }

        if(toRoute.name === 'Login') {
            if(store.getters['auth/authUserGetter'] && store.getters['auth/accessTokenGetter']) {
                return  next({name: 'Home'})
            }
        }
        

    } else {
        window.document.title = 'Home';
    }

    next();
})

export default router
