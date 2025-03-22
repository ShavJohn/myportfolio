<script setup lang="ts">

import { ref, onMounted, nextTick  } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let arr = ref ([
    'I\'m',
    'experienced',
    'full-stack',
    'web',
    'developer',
    'Web',
    'development',
    'is',
    'my',
    'playground',
    'where',
    'I',
    'push',
    'boundaries',
    'and',
    'chase',
    'new',
    'horizons.'
])

onMounted(async () => {
    await nextTick(); // Ensure DOM is ready before animations run

    gsap.fromTo(
        ".word",
        { color: "gray" }, // Initial gray color
        {
            color: "white",
            scrollTrigger: {
                trigger: ".text-scroll-area-container-inner",
                start: "top 70%",
                end: "bottom 20%",
                scrub: 1, // Smooth transition on scroll
            },
            stagger: 0.2, // Words appear one after another
        }
    );
});

</script>

<template>
    <div class="text-scroll-area-container-outer">
        <div class="text-scroll-area-container-inner">
            <div v-for="(word, index) in arr" :key="index" class="word-container-outer">
                <div class="word-container-inner">
                    <div class="word-container">
                        <p class="word">{{ word }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Make sure the container is large enough for scrolling */
.text-scroll-area-container-outer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 35px;
    height: 2000px; /* Ensure enough space to scroll */
    justify-content: flex-start;
    max-width: 1200px;
    width: 100%;
    padding: 300px 0;
}

.text-scroll-area-container-inner {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    max-width: 86%;
    justify-content: center;
    padding-top: 250px;
}

/* Word styles */
.word {
    display: inline-block;
    font-size: 2rem;
    font-weight: bold;
    color: gray; /* Start as gray */
    transition: color 0.3s ease; /* Smooth transition */
}
</style>
