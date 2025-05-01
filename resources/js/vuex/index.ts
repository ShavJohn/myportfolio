import { createStore } from "vuex";
import home from './Moduls/home'
// import dashboard from './Moduls/dashboard'
import aboutme from "./Moduls/aboutme";
import project from "./Moduls/project";
import contactus from "./Moduls/contactus";
import auth from "./Moduls/auth";
import dashboard from "./Moduls/dashboard";
import statistics from "./Moduls/statistics";
import alert from "./Moduls/alert";
import settings from "./Moduls/settings";
import emails from "./Moduls/email";
import skill from "./Moduls/skills";

export interface RootState {}

export default createStore({
    modules: {
        home,
        aboutme,
        project,
        contactus,
        auth,
        dashboard,
        statistics,
        alert,
        settings,
        emails,
        skill
    }
})
