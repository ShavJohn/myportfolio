<script setup lang="ts">
import { ref, onMounted, nextTick, computed  } from "vue";
import { useStore } from "vuex";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EditComponentButton from "../main/edit-component-button.vue";
import textAboutMeModal from "./modals/text-about-me-modal.vue";

const store = useStore<any>();

let shotAboutMe  = computed(() => store.getters['home/shortAboutMeGetter'])

function sentenceToArray(sentence: string): string[] {
    // Split the sentence by spaces and return the array of words
    return sentence.split(" ");
}

const arr = computed(() => sentenceToArray(shotAboutMe.value));

gsap.registerPlugin(ScrollTrigger);

onMounted(async () => {
    await nextTick(); // Ensure DOM is ready before animations run

    gsap.fromTo(
        ".word",
        { color: "gray" }, // Initial gray color
        {
            color: "white",
            scrollTrigger: {
                trigger: "body",
                start: "top+=700px",
                end: "top+=1700px",
                scrub: 1, // Smooth transition on scroll
            },
            stagger: 0.2, // Words appear one after another
        }
    );
});

</script>

<template>
    <div class="text-scroll-area-container edit-button-container">
        <edit-component-button type="button" data-bs-toggle="modal" data-bs-target="#text-about-me-edit-modal"></edit-component-button>
        <text-about-me-modal ></text-about-me-modal>
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
