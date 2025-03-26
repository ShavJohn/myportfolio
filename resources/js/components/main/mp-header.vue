<script setup lang="ts">
import { ref } from "vue";

// Mobile menu state
const isMobileMenuOpen = ref(false);

// Toggle mobile menu
const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
};


const closeMenu = () => {
    isMobileMenuOpen.value = false;
};

function runMyCode() {

    let arr = [5, 2, 3, 10, 24, 2, 7, 65, 23]
    let target = 9;
    let map = new Map();
    for (let i = 0; i < arr.length; i++) {
        let complement = target - arr[i];
        if (map.has(complement)) {
            return [map.get(complement), i];  // Return indices
        }

        map.set(arr[i], i);
    }
    return null;

}


</script>

<template>
    <header class="header">
        <nav class="nav">
            <div class="logo">ShavJohn</div>

            <!-- Mobile Sidebar Menu -->
            <ul :class="['nav-links', { open: isMobileMenuOpen }]">
                <li @click="$router.push({name: 'Home'})"><a href="#" class="menu-item" @click="closeMenu">Home</a></li>
                <li @click="$router.push({name: 'AboutMe'})"><a href="#" class="menu-item" @click="closeMenu">About me</a></li>
                <li @click="$router.push({name: 'Project'})"><a href="#" class="menu-item" @click="closeMenu">Projects</a></li>
                <li @click="$router.push({name: 'ContactMe'})"><a href="#" class="menu-item" @click="closeMenu">Contact me</a></li>
            </ul>

            <div class="actions">
                <button class="menu-btn" @click="toggleMobileMenu">
                    <font-awesome-icon icon="fa-solid fa-bars" />
                </button>
            </div>
        </nav>

        <!-- Overlay when menu is open -->
        <div v-if="isMobileMenuOpen" class="overlay" @click="closeMenu"></div>
    </header>
</template>

<style scoped lang="scss">

</style>
