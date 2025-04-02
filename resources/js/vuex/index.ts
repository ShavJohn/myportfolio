import { createStore } from "vuex";
import main from './Moduls/main'
import home from './Moduls/home'
import dashboard from './Moduls/dashboard'

export default createStore({
    modules: {
        home,
    }
})
