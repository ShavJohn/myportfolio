<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { Setting } from "../../types/settings";
import { useRouter } from "vue-router";

const router = useRouter()

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

function navigate(link: string, callBack: () => void) {
    if(link.length) {
        router.push({ name: link })
    }
    
    callBack()
}

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
                <li class="menu-item" @click="navigate('Home', closeMenu)">Home</li>
                <li class="menu-item" @click="navigate('AboutMe', closeMenu)">About me</li>
                <li class="menu-item" @click="navigate('Project', closeMenu)">Projects</li>
                <li class="menu-item" @click="navigate('ContactMe', closeMenu)">Contact me</li>
                <li v-if="authUser" class="menu-item" @click="navigate('Dashboard', closeMenu)">Dashboard</li>
                <li v-if="authUser" class="menu-item" @click="navigate('', logout)">
                    Logout 
                    <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
                    </li>
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
