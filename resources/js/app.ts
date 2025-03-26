import { createApp, DirectiveBinding  } from 'vue';
import App from './Views/App.vue';
import router from "./router";
import store from "./vuex"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";

library.add(fas, far, fab)

gsap.registerPlugin(ScrollTrigger);



const app = createApp(App);


app.directive("scroll-reveal", {
    mounted(el: HTMLElement) {
        const words = el.innerText.split(" ");
        el.innerHTML = ""; // Clear original text

        words.forEach((word) => {
            const span = document.createElement("span");
            span.classList.add("word");
            span.innerText = word;
            el.appendChild(span);
            el.appendChild(document.createTextNode(" ")); // Preserve spaces
        });

        gsap.set(el.children, { opacity: 0, y: 20 }); // Ensure words start hidden

        ScrollTrigger.create({
            trigger: el,
            start: "top 80%", // Animation starts when the text reaches 80% of viewport height
            onEnter: () => {
                gsap.to(el.children, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1, // Stagger effect for smooth word-by-word appearance
                });
            },
        });
    },
});



app.use(router)
app.use(store)

app.component('font-awesome-icon', FontAwesomeIcon)


app .mount('#app');
