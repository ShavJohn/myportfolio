import { createStore } from "vuex";
import home from './Moduls/home'
// import dashboard from './Moduls/dashboard'
import aboutme from "./Moduls/aboutme";
import project from "./Moduls/project";
import contactus from "./Moduls/contactus";

export interface RootState {}

export default createStore({
    modules: {
        home,
        aboutme,
        project,
        contactus
    }
})
