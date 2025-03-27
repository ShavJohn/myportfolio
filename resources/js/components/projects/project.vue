<script setup lang="ts">
const imagePrefix =  window.imagePrefix
import { ref, onMounted } from "vue";
import EditRemoveElement from "../main/edit-remove-element.vue";

const image = ref<HTMLElement | null>(null);
const container = ref<HTMLElement | null>(null);
const text = ref<HTMLElement | null>(null);

function handleMouseMove(event: MouseEvent) {
    if (!image.value || !container.value || !text.value) return;

    const { left, top, width, height } = container.value.getBoundingClientRect();

    // Normalize mouse position (-1 to 1)
    const x = (event.clientX - left - width / 2) / (width / 2);
    const y = (event.clientY - top - height / 2) / (height / 2);

    // Invert rotation so it tilts towards the cursor
    const rotateX = y * 10; // Moves up/down naturally
    const rotateY = x * -10;  // Moves left/right naturally

    // Apply the transform and shadow to the image
    image.value.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1)`;

    image.value.style.boxShadow = `${-rotateY * 4}px ${rotateX * 4}px 10px rgba(0, 0, 0, 0.1),
                                 ${-rotateY * 6}px ${rotateX * 6}px 20px rgba(0, 0, 0, 0.1)`; // Enhanced shadow

    // Apply the transform to the text to match the image's 3D perspective
    text.value.style.transform = `translateZ(100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

function resetTransform() {
    if (image.value) {
        image.value.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
        image.value.style.boxShadow = "0px 0px 20px rgba(0, 0, 0, 0.2)"; // Reset shadow when not hovering
    }
    if (text.value) {
        text.value.style.transform = "translateZ(0) rotateX(0deg) rotateY(0deg)"; // Reset text transform
        text.value.style.textShadow = "none"; // Reset text shadow
    }
}

onMounted(() => {

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, {
        threshold: 0.6, // Trigger when 20% of the element is visible
    });

    if (container.value) {
        observer.observe(container.value);
    }
});

</script>


<template>
    <div class="image-container actions-btn-container" ref="container" @mousemove="handleMouseMove" @mouseleave="resetTransform">
        <edit-remove-element></edit-remove-element>
        <img ref="image" :src="`${imagePrefix}/shavjohn_logo.png`" alt="3D Hover Effect" class="hover-image" />
        <div ref="text" class="hover-text">Your Text Here</div>
    </div>
</template>

<style scoped>

</style>
