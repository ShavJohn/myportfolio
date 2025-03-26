<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from "vue";

const progress = ref(0); // Reactive reference for progress bar
const container = ref<HTMLElement | null>(null); // Reference to the container element

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
        middleOfViewport =  middleOfViewport - (windowHeight / 2) + 50
    }

    if(distanceToPageBottom < 650) {
        containerBottom = containerBottom - (windowHeight / 2) - 50
    }

    // console.log({'container.top': container.value.getBoundingClientRect().top,
    //     'scrollTop': scrollTop,
    //     'container.bottom': container.value.getBoundingClientRect().bottom,
    //     'clientHeight': container.value.clientHeight,
    //     'containerTop': containerTop,
    //     'containerBottom': containerBottom,
    //     'middleOfViewport': middleOfViewport,
    //     'windowHeight': windowHeight,
    //     }
    // )

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
});

// Clean up when component is unmounted
onBeforeUnmount(() => {
    window.removeEventListener("scroll", updateScrollProgress);
});
</script>


<template>
    <div class="about-me-container" ref="container">
        <!-- Progress Bar Container -->
        <div class="progress-bar-container">
            <!-- Progress Bar -->
            <div class="progress-bar" :style="{ height: progress + '%', top: `calc(${100 - progress}% - 15px)` }"></div>
            <div class="progress-circle" :style="{ top: `calc(${Math.min(progress, 100)}% - 10px)` }"></div>
        </div>

        <!-- About Me Details -->
        <div class="bout-me-details-container">
            <div class="about-me" v-for="i in 6" :key="i">
                <div class="about-me-year">
                    <div class="company-name">Company name</div>
                    <div class="year">20219</div>
                </div>
                <div class="about-me-details">
                    <h1 class="job-title">My job</h1>
                    <p class="job-description">Some job details for testing. Some job details for testing. Some job details for testing.</p>
                </div>
            </div>
            <div class="about-me" v-for="i in 6" :key="i">
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
.about-me-container {
    min-height: 60vh; /* Full viewport height */
    display: flex;
    justify-content: center;
    background-color: #0f172a;
    color: white;
    padding: 50px 0 50px;
    gap: 30px;

    .progress-bar-container {
        width: 5px;
        background-color: white;
        border-radius: 20px;
        position: relative;

        .progress-bar {
            background-color: #7a00ff;
        }

        .progress-circle {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: #7a00ff;
            transform: translateX(-40%);
            position: absolute;
        }
    }

    .bout-me-details-container {
        .about-me{
            margin-top: 100px;
            display: flex;
            align-items: center;
            gap: 30px;

            .about-me-year {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .about-me-details {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }

            &:first-of-type {
                margin-top: 0;
            }
        }

    }

}


</style>
