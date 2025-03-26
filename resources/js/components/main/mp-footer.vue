<script setup lang="ts">
import { ref } from "vue"

// Store the currently hovered icon
const hoveredIcon = ref<string | null>(null);

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
            <ul>
                <li  @mouseenter="startBounce('linkedin')"
                     class="bounce"
                     @mouseleave="stopBounce">
                    <a href="#"><font-awesome-icon
                        icon="fa-brands fa-linkedin"
                        :class="{ 'fa-bounce': hoveredIcon === 'linkedin' }"/>My Linkdin</a>
                    </li>
                <li @mouseenter="startBounce('github')"
                    @mouseleave="stopBounce">
                    <a href="#"><font-awesome-icon
                    icon="fa-brands fa-github"
                    :class="{ 'fa-bounce': hoveredIcon === 'github' }" />My GitHub</a></li>
            </ul>
            <ul>
                <li @mouseenter="startBounce('home')"
                    @mouseleave="stopBounce">
                    <a href="#"><font-awesome-icon
                    icon="fa-solid fa-house"
                    :class="{ 'fa-bounce': hoveredIcon === 'home' }" />Home</a></li>
                <li @mouseenter="startBounce('user')"
                    @mouseleave="stopBounce">
                    <a href="#"><font-awesome-icon
                    icon="fa-solid fa-user"
                    :class="{ 'fa-bounce': hoveredIcon === 'user' }" />About me</a></li>
            </ul>
            <ul>
                <li @mouseenter="startBounce('briefcase')"
                    @mouseleave="stopBounce">
                    <a href="#"><font-awesome-icon
                    icon="fa-solid fa-briefcase"
                    :class="{ 'fa-bounce': hoveredIcon === 'briefcase' }" />Projects</a></li>
                <li @mouseenter="startBounce('envelope')"
                    @mouseleave="stopBounce">
                    <a href="#"><font-awesome-icon
                    icon="fa-solid fa-envelope"
                    :class="{ 'fa-bounce': hoveredIcon === 'envelope' }" />Contact me</a></li>
            </ul>
        </div>
        <div class="all-right-reserved">
            © Made with  by ShavJohn 2018.
        </div>
    </div>
</template>

<style scoped>

</style>
