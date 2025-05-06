<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { Setting } from "../../types/settings";

const store = useStore<any>()

// Mobile menu state
const isMobileMenuOpen = ref(false);

// Toggle mobile menu
const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const authUser = computed(() => store.getters['auth/authUserGetter'])

const logout = () => store.dispatch('auth/logOut');

const closeMenu = () => {
    isMobileMenuOpen.value = false;
};

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

const logo = settingByKey('logo');

</script>

<template>
    <header class="header">
        <nav class="nav">
            <div class="logo">
                <img :src="`storage/${logo.value}`" alt="shavjohn-logo">
                ShavJohn
            </div>

            <!-- Mobile Sidebar Menu -->
            <ul :class="['nav-links', { open: isMobileMenuOpen }]">
                <li @click="$router.push({name: 'Home'})"><a href="#" class="menu-item" @click="closeMenu">Home</a></li>
                <li @click="$router.push({name: 'AboutMe'})"><a href="#" class="menu-item" @click="closeMenu">About me</a></li>
                <li @click="$router.push({name: 'Project'})"><a href="#" class="menu-item" @click="closeMenu">Projects</a></li>
                <li @click="$router.push({name: 'ContactMe'})"><a href="#" class="menu-item" @click="closeMenu">Contact me</a></li>
                <li v-if="authUser" @click="$router.push({name: 'Dashboard'})"><a href="#" class="menu-item" @click="closeMenu">Dashboard</a></li>
                <li v-if="authUser" @click="logout"><a href="#" class="menu-item" @click="closeMenu">
                    Logout 
                    <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
                    </a></li>
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
