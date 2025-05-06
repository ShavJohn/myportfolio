<script setup lang="ts">
import { ref, computed } from "vue"
import { useStore } from "vuex";
import { Setting } from "../../types/settings";

const store = useStore<any>()

// Store the currently hovered icon
const hoveredIcon = ref<string | null>(null);

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

const linkdinUrl = settingByKey('linkdinurl');
const githubUrl = settingByKey('githuburl');

function openLink(link: string) {
    if(link.length) {
        window.open(link, '_blank')
    }
}

// Functions to set and clear the hovered icon
const startBounce = (icon: string) => {
    hoveredIcon.value = icon;
};

const stopBounce = () => {
    hoveredIcon.value = null;
};
</script>

<template>
    <div class="footer">
        <div class="footer-menu">
            <ul v-if="linkdinUrl.value.length || githubUrl.value.length">
                <li v-if="linkdinUrl.value.length" @click="openLink(linkdinUrl.value)" @mouseenter="startBounce('linkedin')"
                     class="bounce"
                     @mouseleave="stopBounce">
                    <font-awesome-icon
                        icon="fa-brands fa-linkedin"
                        :class="{ 'fa-bounce': hoveredIcon === 'linkedin' }"/>My Linkdin
                    </li>
                <li v-if="githubUrl.value.length" @click="openLink(githubUrl.value)" @mouseenter="startBounce('github')"
                    @mouseleave="stopBounce">
                    <font-awesome-icon
                    icon="fa-brands fa-github"
                    :class="{ 'fa-bounce': hoveredIcon === 'github' }" />My GitHub
                </li>
            </ul>
            <ul>
                <li @click="$router.push({name: 'Home'})" @mouseenter="startBounce('home')"
                    @mouseleave="stopBounce">
                    <font-awesome-icon
                    icon="fa-solid fa-house"
                    :class="{ 'fa-bounce': hoveredIcon === 'home' }" />Home</li>
                <li @click="$router.push({name: 'AboutMe'})" @mouseenter="startBounce('user')"
                    @mouseleave="stopBounce">
                    <font-awesome-icon
                    icon="fa-solid fa-user"
                    :class="{ 'fa-bounce': hoveredIcon === 'user' }" />About me</li>
            </ul>
            <ul>
                <li @click="$router.push({name: 'Project'})" @mouseenter="startBounce('briefcase')"
                    @mouseleave="stopBounce">
                    <font-awesome-icon
                    icon="fa-solid fa-briefcase"
                    :class="{ 'fa-bounce': hoveredIcon === 'briefcase' }" />Projects</li>
                <li @click="$router.push({name: 'ContactMe'})" @mouseenter="startBounce('envelope')"
                    @mouseleave="stopBounce">
                    <font-awesome-icon
                    icon="fa-solid fa-envelope"
                    :class="{ 'fa-bounce': hoveredIcon === 'envelope' }" />Contact me</li>
            </ul>
        </div>
        <div class="all-right-reserved">
            © Made by ShavJohn 2018.
        </div>
    </div>
</template>

<style scoped>

</style>
