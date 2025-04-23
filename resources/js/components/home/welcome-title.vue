<script setup lang="ts">
//Import Section
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useStore } from "vuex";
import gsap from "gsap";
import EditComponentButton from "../main/edit-component-button.vue";
import TitleModal from "./modals/title-modal.vue"

const store = useStore<any>();

//Variable Section
const textAboutMe = computed(() => store.getters["home/textAboutMeGetter"]);

const tagArr = computed(() => store.getters["home/skillsGetter"]);
const authUser = computed(() => store.getters['auth/authUserGetter'])

const mainText = ref(tagArr.value[0] || ""); // Start with the first tag
let wordIndex = 0;
let glitchTimeline: gsap.core.Timeline | null = null; // Define glitchTimeline to kill it later
let glitch = ref<HTMLElement | null>(null);

//Function Section
// Function to shuffle text for the glitch effect
function shuffleText(original: string) {
    if (original && typeof original === 'string') {
        let shuffled = original.split("");
        for (let i = shuffled.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.join("");
    } 
}

// Handle the glitch and text-changing animation
onMounted(() => {
    if (!glitch.value) {
        return;
    }

    function glitchAndChange() {
        glitchTimeline = gsap.timeline();

        // Glitch effect (modern neon flicker + text shuffle)
        if(glitch.value) {
            for (let i = 0; i < 6; i++) {
                glitchTimeline.to(".glitch", {
                    textShadow: `4px 4px 0 #ff007f, -4px -4px 0 #00d4ff`, // Neon pink & electric blue
                    color: i % 2 === 0 ? "#7a00ff" : "#00d4ff", // Cyber purple & electric blue
                    duration: 0.1,
                    onComplete: () => {
                        // Update the text when glitch is complete
                        mainText.value = shuffleText(tagArr.value[wordIndex]);
                    },
                });
            }
        }
        

        if(glitch.value) {
            // Final word appears in white
            glitchTimeline.to(".glitch", {
                textShadow: "none",
                color: "#ffffff",
                duration: 0.2,
                onComplete: () => {
                    // Update to the next word
                    wordIndex = (wordIndex + 1) % tagArr.value.length;
                    mainText.value = tagArr.value[wordIndex]; 
                },
            });
        }

        // Pause before repeating the glitch effect
        glitchTimeline.to({}, { duration: 3, onComplete: glitchAndChange });
    }

    glitchAndChange();
});

onBeforeUnmount(() => {
    if (glitchTimeline) {
        glitchTimeline.kill();
    }
});
</script>

<template>
    <div class="welcome-title-animation-container edit-button-container">
        <edit-component-button v-if="authUser" type="button" data-bs-toggle="modal" data-bs-target="#title-edit-modal"></edit-component-button>
        <title-modal v-if="authUser"></title-modal>
        <div class="welcome-title-animation">
            <div class="container">
                <p class="text">
                    {{ textAboutMe }}
                    <span ref="glitch" class="glitch">{{ mainText }}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.glitch {
    display: inline-block;
    font-size: 2rem;
    font-weight: bold;
    position: relative;
    color: white;
    transition: all 0.1s ease;
}
</style>
