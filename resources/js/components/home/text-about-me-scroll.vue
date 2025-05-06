<script setup lang="ts">
import { onMounted, nextTick, computed, watch } from "vue";
import { useStore } from "vuex";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Setting } from '../../types/settings';
import EditComponentButton from "../main/edit-component-button.vue";
import textAboutMeModal from "./modals/text-about-me-modal.vue";

const store = useStore<any>();

const settings = computed(() => store.getters['settings/settingsGetter'])

function settingByKey(key: string) {
    return computed(() => {
        return settings.value?.find((setting: Setting) => setting.key === key) ?? {
            key: '',
            value: '',
            json_value: null
        };
    });
}

const shortAboutMe = settingByKey('shortAboutMe');

function sentenceToArray(sentence: string): string[] {
    return sentence.split(" ");
}

const authUser = computed(() => store.getters['auth/authUserGetter']);
const arr = computed(() => sentenceToArray(shortAboutMe.value.value || ""));

gsap.registerPlugin(ScrollTrigger);

async function runScrollAnimation() {
    await nextTick(); // wait for DOM update
    if (!arr.value.length) return;

    const words = document.querySelectorAll(".word");
    if (words.length === 0) return;

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "body",
            start: "top+=700px",
            end: "top+=1200px",
            scrub: 1,
        }
    });

    // Animate all words from gray to white
    tl.to(words, {
        color: "white",
        stagger: 0.2,
        duration: 1,
    });
}

onMounted(() => {
    // Run when settings are already loaded
    if (arr.value.length) {
        runScrollAnimation();
    }

    // Or reactively wait for arr to become populated
    watch(arr, (newVal) => {
        if (newVal.length) {
            runScrollAnimation();
        }
    });
});
</script>

<template>
    <div class="text-scroll-area-container edit-button-container">
        <edit-component-button v-if="authUser" type="button" data-bs-toggle="modal" data-bs-target="#text-about-me-edit-modal"></edit-component-button>
        <text-about-me-modal v-if="authUser"></text-about-me-modal>
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
