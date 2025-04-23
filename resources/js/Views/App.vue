<script setup lang="ts">
//Import Section
import MpHeader from "../components/main/mp-header.vue";
import MpFooter from "../components/main/mp-footer.vue"
import { ref, onMounted, onUnmounted, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const store = useStore<any>()

//Variable Section
// Reactive state for cursor position
const cursorX = ref(0);
const cursorY = ref(0);
const circleX = ref(0);
const circleY = ref(0);
const isHovering = ref(false);

const route = useRoute();
const showElement = ref(true);

const checkElementVisibility = () => {
    const hiddenRouts = ["/login", "/register"];
    showElement.value = !hiddenRouts.includes(route.path);
}

watch(route, () => {
    checkElementVisibility();
})

function countVisitors() {
    store.dispatch('statistics/countVisitor')
}


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
    countVisitors();
    checkElementVisibility();
    
    // Add hover effect for interactive elements
    document.querySelectorAll("svg, button, a, li").forEach((element) => {
        element.addEventListener("mouseenter", addHoverEffect);
        element.addEventListener("mouseleave", removeHoverEffect);
    });
});

// Remove listeners when unmounted
onUnmounted(() => {
    window.removeEventListener("mousemove", updateCursor);

    document.querySelectorAll("svg, button, a, li").forEach((element) => {
        element.removeEventListener("mouseenter", addHoverEffect);
        element.removeEventListener("mouseleave", removeHoverEffect);
    });
});
</script>

<template>
   <div>
       <mp-header v-if="showElement"></mp-header>
       <router-view></router-view>
       <mp-footer v-if="showElement"></mp-footer>
       <div class="cursor-dot" :style="{ left: `${cursorX}px`, top: `${cursorY}px` }"></div>
       <div class="cursor-circle" :class="{ 'hovered': isHovering }" :style="{ left: `${circleX}px`, top: `${circleY}px` }"></div>
   </div>
</template>

<style scoped>

</style>
