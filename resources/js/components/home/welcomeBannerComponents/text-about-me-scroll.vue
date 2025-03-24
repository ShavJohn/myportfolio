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
    'horizons.',
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
                trigger: "body",
                start: "top+=800px",
                end: "top+=1700px",
                scrub: 1, // Smooth transition on scroll
            },
            stagger: 0.2, // Words appear one after another
        }
    );
});

</script>

<template>
    <div class="text-scroll-area-container">
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
    </div>

</template>

<style scoped>

</style>
