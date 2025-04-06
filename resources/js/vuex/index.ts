import { createStore } from "vuex";
// import main from './Moduls/main'
import home from './Moduls/home'
// import dashboard from './Moduls/dashboard'
import aboutme from "./Moduls/aboutme";

export interface RootState {}

export default createStore({
    modules: {
        home,
        aboutme
    }
})
