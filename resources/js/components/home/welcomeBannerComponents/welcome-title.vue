<script setup lang="ts">
import { ref, onMounted } from "vue";
import gsap from "gsap";

const words = ["futures", "possibilities", "dreams", "adventures"]; // Words to cycle through
const mainText = ref(words[0]); // Start with first word
let wordIndex = 0;

function shuffleText(original: string) {
    let shuffled = original.split("");
    for (let i = shuffled.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.join("");
}


onMounted(() => {
    function glitchAndChange() {
        let glitchTimeline = gsap.timeline();

        // Step 1: Glitch effect (modern neon flicker + text shuffle)
        for (let i = 0; i < 6; i++) {
            glitchTimeline.to(".glitch", {
                textShadow: `4px 4px 0 #ff007f, -4px -4px 0 #00d4ff`, // Neon pink & electric blue
                color: i % 2 === 0 ? "#7a00ff" : "#00d4ff", // Cyber purple & electric blue
                duration: 0.1,
                onComplete: () => {
                    mainText.value = shuffleText(words[wordIndex]);
                }
            });
        }

        // Step 2: Final word appears in white
        glitchTimeline.to(".glitch", {
            textShadow: "none",
            color: "#ffffff",
            duration: 0.2,
            onComplete: () => {
                wordIndex = (wordIndex + 1) % words.length;
                mainText.value = words[wordIndex];
            }
        });

        // Step 3: Pause before repeating
        glitchTimeline.to({}, { duration: 3, onComplete: glitchAndChange });
    }

    glitchAndChange();
});
</script>

<template>
    <div class="welcome-title-animation-container">
        <div class="welcome-title-animation">
            <div class="container">
                <p class="text">
                    I'm an experienced front-end developer <span class="developer-name">ShavJohn</span> pushing
                    <span class="glitch">{{ mainText }}.</span>
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
