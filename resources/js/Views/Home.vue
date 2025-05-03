<script setup lang="ts">
//Import Section
import { computed } from "vue";
import { useStore } from "vuex";
import WelcomeTitle from "../components/home/welcome-title.vue";
import TextAboutMeScroll from "../components/home/text-about-me-scroll.vue";
import CodeStyleTextAbouMe from "../components/home/code-style-text-about-me.vue";

const store = useStore<any>();

let msg = computed(() => {
    return store.getters['home/msgGetter']
})

</script>

<template>
    <div>
        <welcome-title></welcome-title>
        <text-about-me-scroll></text-about-me-scroll>
        <code-style-text-abou-me></code-style-text-abou-me>
    </div>
</template>

<style scoped>

</style>
