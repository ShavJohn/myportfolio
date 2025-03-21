import { createApp } from 'vue';
import App from './Views/App.vue';
import router from "./router";
import store from "./vuex"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';


library.add(fas, far, fab)


const app = createApp(App);

app.use(router)
app.use(store)

app.component('font-awesome-icon', FontAwesomeIcon)


app .mount('#app');
