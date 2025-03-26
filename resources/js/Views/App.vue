<script setup lang="ts">
import MpHeader from "../components/main/mp-header.vue";
import MpFooter from "../components/main/mp-footer.vue"

import { ref, onMounted, onUnmounted } from "vue";

// Reactive state for cursor position
const cursorX = ref(0);
const cursorY = ref(0);
const circleX = ref(0);
const circleY = ref(0);
const isHovering = ref(false);

// Update cursor position in real-time
const updateCursor = (event: MouseEvent) => {
    cursorX.value = event.clientX;
    cursorY.value = event.clientY;
};

// Smoothly update the outer circle position
const updateCircle = () => {
    circleX.value += (cursorX.value - circleX.value) * 0.1;
    circleY.value += (cursorY.value - circleY.value) * 0.1;
    requestAnimationFrame(updateCircle);
};

// Handle hover effect
const addHoverEffect = () => isHovering.value = true;
const removeHoverEffect = () => isHovering.value = false;

// Attach event listeners
onMounted(() => {
    window.addEventListener("mousemove", updateCursor);
    updateCircle();

    // Add hover effect for interactive elements
    document.querySelectorAll("a, button, li").forEach((element) => {
        element.addEventListener("mouseenter", addHoverEffect);
        element.addEventListener("mouseleave", removeHoverEffect);
    });
});

// Remove listeners when unmounted
onUnmounted(() => {
    window.removeEventListener("mousemove", updateCursor);

    document.querySelectorAll("a, button, li").forEach((element) => {
        element.removeEventListener("mouseenter", addHoverEffect);
        element.removeEventListener("mouseleave", removeHoverEffect);
    });
});


</script>

<template>
   <div>
       <mp-header></mp-header>
       <router-view></router-view>
       <mp-footer></mp-footer>

       <!-- Small dot cursor -->
       <div class="cursor-dot" :style="{ left: `${cursorX}px`, top: `${cursorY}px` }"></div>

       <!-- Outer circle with hover effect -->
       <div class="cursor-circle" :class="{ 'hovered': isHovering }" :style="{ left: `${circleX}px`, top: `${circleY}px` }"></div>
   </div>
</template>

<style scoped>

</style>
