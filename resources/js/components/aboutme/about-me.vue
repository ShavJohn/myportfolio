<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount, computed } from "vue";
import EditComponentButton from "../main/edit-component-button.vue";
import EditRemoveElement from "../main/edit-remove-element.vue";
import aboutMeModal from "./about-me-modal.vue";
import { useStore } from "vuex";

const progress = ref(0); // Reactive reference for progress bar
const container = ref<HTMLElement | null>(null); // Reference to the container element
const authUser = computed(() => store.getters['auth/authUserGetter'])

let modalType = ref<string>('add')

const sections = ref<HTMLElement[]>([]);

const store = useStore<any>();
const position = computed(() => store.getters["aboutme/positionGetter"])

// Function to update the progress bar height based on the scroll position within the component
function updateScrollProgress() {
    if (!container.value) return;

    const documentHeight: number = document.documentElement.scrollHeight;
    const componentBottom: number = container.value.offsetTop + container.value.offsetHeight;
    const distanceToPageBottom: number = documentHeight - componentBottom;

    let scrollTop: number = window.scrollY; // How much we've scrolled
    let windowHeight: number = window.innerHeight; // Height of the viewport

    let containerTop: number = container.value.getBoundingClientRect().top + scrollTop; // Top of the container relative to the page
    let containerBottom: number = containerTop + container.value.clientHeight; // Bottom of the container

    let middleOfViewport: number = (scrollTop + windowHeight / 2);

    if(container.value.getBoundingClientRect().top < middleOfViewport) {
        middleOfViewport =  middleOfViewport - (windowHeight / 2) + 100
    }

    if(distanceToPageBottom < 650) {
        containerBottom = containerBottom - (windowHeight / 2) - 100
    }

    // Check if the container is in the viewport, starting at the middle
    if (middleOfViewport >= containerTop && middleOfViewport <= containerBottom) {
        // Calculate the scroll progress based on the container's position in the viewport
        const progressBarHeight = ((middleOfViewport - containerTop) / (containerBottom - containerTop)) * 100;
        progress.value = Math.min(progressBarHeight, 100); // Update the progress
    }
}

// Add event listener for scroll event
onMounted(() => {
    window.addEventListener("scroll", updateScrollProgress);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, {
        threshold: 1, // Trigger when 20% of the element is visible
    });

    sections.value.forEach((section) => observer.observe(section));
});

// Clean up when component is unmounted
onBeforeUnmount(() => {
    window.removeEventListener("scroll", updateScrollProgress);
});
</script>


<template>
    <div class="about-me-container edit-button-container" ref="container">
        <edit-component-button v-if="authUser" :btnType="'add'" @click="modalType = 'add'" type="button" data-bs-toggle="modal" data-bs-target="#about-me-modal"></edit-component-button>
        <about-me-modal v-if="authUser" :modalType="modalType"></about-me-modal>
        <!-- Progress Bar Container -->
        <div class="progress-bar-container">
            <!-- Progress Bar -->
            <div class="progress-bar" :style="{ height: progress + '%', top: `calc(${100 - progress}% - 15px)` }"></div>
            <div class="progress-circle" :style="{ top: `calc(${Math.min(progress, 100)}% - 10px)` }"></div>
        </div>

        <!-- About Me Details -->
        <div class="about-me-details-container">
            <div class="about-me actions-btn-container" v-for="i in 10" :key="i" ref="sections">
                <edit-remove-element v-if="authUser">
                    <template #buttons>
                        <button class="action-btn" @click="modalType = 'edit'" type="button" data-bs-toggle="modal" data-bs-target="#about-me-modal">
                            <font-awesome-icon icon="fa-solid fa-pen-to-square"/>
                        </button>
                        <button class="action-btn" @click="modalType = 'remove'" type="button" data-bs-toggle="modal" data-bs-target="#about-me-modal">
                            <font-awesome-icon icon="fa-solid fa-x"/>
                        </button>
                    </template>
                </edit-remove-element>
                <div class="about-me-year">
                    <div class="company-name">Company name</div>
                    <div class="year">20219</div>
                </div>
                <div class="about-me-details">
                    <h1 class="job-title">My job</h1>
                    <p class="job-description">Some job details for testing. Some job details for testing. Some job details for testing.</p>
                </div>
            </div>
            
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>
