<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import EditComponentButton from "../main/edit-component-button.vue";
import TitleModal from "./modals/title-modal.vue"

const words = ["futures", "possibilities", "dreams", "adventures"]; // Words to cycle through
const mainText = ref(words[0]); // Start with first word
let wordIndex = 0;
let glitchTimeline: gsap.core.Timeline | null = null; // Define glitchTimeline to kill it later

// Function to shuffle text for the glitch effect
function shuffleText(original: string) {
    let shuffled = original.split("");
    for (let i = shuffled.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.join("");
}

// Handle the glitch and text-changing animation
onMounted(() => {
    function glitchAndChange() {
        glitchTimeline = gsap.timeline();

        // Glitch effect (modern neon flicker + text shuffle)
        for (let i = 0; i < 6; i++) {
            glitchTimeline.to(".glitch", {
                textShadow: `4px 4px 0 #ff007f, -4px -4px 0 #00d4ff`, // Neon pink & electric blue
                color: i % 2 === 0 ? "#7a00ff" : "#00d4ff", // Cyber purple & electric blue
                duration: 0.1,
                onComplete: () => {
                    // Update the text when glitch is complete
                    mainText.value = shuffleText(words[wordIndex]);
                },
            });
        }

        // Final word appears in white
        glitchTimeline.to(".glitch", {
            textShadow: "none",
            color: "#ffffff",
            duration: 0.2,
            onComplete: () => {
                // Update to the next word
                wordIndex = (wordIndex + 1) % words.length;
                mainText.value = words[wordIndex]; // Set to next word in the array
            },
        });

        // Pause before repeating the glitch effect
        glitchTimeline.to({}, { duration: 3, onComplete: glitchAndChange });
    }

    // Initial call to start the glitch effect
    glitchAndChange();
});

// Clean up the GSAP animation when component is unmounted or route changes
onBeforeUnmount(() => {
    if (glitchTimeline) {
        glitchTimeline.kill(); // Kill the GSAP timeline to stop animation when the component is destroyed
    }
});
</script>

<template>
    <div class="welcome-title-animation-container edit-button-container">
        <edit-component-button type="button" data-bs-toggle="modal" data-bs-target="#title-edit-modal"></edit-component-button>
        <title-modal></title-modal>
        <div class="welcome-title-animation">
            <div class="container">
                <p class="text">
                    I'm an experienced full-stack developer <span class="developer-name">ShavJohn</span> pushing
                    <span class="glitch">{{ mainText }}.</span>
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
