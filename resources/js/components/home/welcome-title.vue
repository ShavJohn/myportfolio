<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, watch } from "vue";
import { useStore } from "vuex";
import gsap from "gsap";
import { Setting } from "../../types/settings";
import EditComponentButton from "../main/edit-component-button.vue";
import TitleModal from "./modals/title-modal.vue";

const store = useStore<any>();

const settings = computed(() => store.getters["settings/settingsGetter"]);

function settingByKey(key: string) {
    return computed(() => {
        return (
        settings.value?.find((setting: Setting) => setting.key === key) ?? {
            key: "",
            value: "",
            json_value: null,
        }
        );
    });
}

const titleText = settingByKey("textAboutMe");
const textAboutMe = computed(() => store.getters["home/textAboutMeGetter"]);
const tagArr = computed(() => store.getters["skill/skillsGetter"]);
const authUser = computed(() => store.getters["auth/authUserGetter"]);

const mainText = ref<string | undefined>(""); // Will set when tagArr is ready
let wordIndex = 0;
let glitchTimeline: gsap.core.Timeline | null = null;
let glitch = ref<HTMLElement | null>(null);

function shuffleText(original: string) {
    if (original && typeof original === "string") {
        let shuffled = original.split("");
        for (let i = shuffled.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.join("");
    }
}

// Start glitch loop after tagArr is populated
function startGlitchLoop() {
    if (!glitch.value || !tagArr.value.length) return;

    function glitchAndChange() {
        const currentWord = tagArr.value[wordIndex]?.value || "";

        glitchTimeline = gsap.timeline();

        for (let i = 0; i < 6; i++) {
        glitchTimeline.to(glitch.value, {
            textShadow: `4px 4px 0 #ff007f, -4px -4px 0 #00d4ff`,
            color: i % 2 === 0 ? "#7a00ff" : "#00d4ff",
            duration: 0.1,
            onComplete: () => {
            mainText.value = shuffleText(currentWord);
            },
        });
        }

        glitchTimeline.to(glitch.value, {
        textShadow: "none",
        color: "#ffffff",
        duration: 0.2,
        onComplete: () => {
            wordIndex = (wordIndex + 1) % tagArr.value.length;
            mainText.value = tagArr.value[wordIndex].value || "";
        },
        });

        glitchTimeline.to({}, { duration: 3, onComplete: glitchAndChange });
    }

    // Set first word and start
    mainText.value = tagArr.value[wordIndex]?.value || "";
    glitchAndChange();
}

onMounted(() => {
    // Wait until tagArr is populated before starting
    watch(
        tagArr,
        (newTags) => {
        if (newTags.length) {
            startGlitchLoop();
        }
        },
        { immediate: true }
    );
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
                    {{ titleText.value }}
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
