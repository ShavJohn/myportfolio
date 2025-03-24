<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import WeclomeTitle from "../components/home/welcomeBannerComponents/welcome-title.vue";
import TextAboutMeScroll from "../components/home/welcomeBannerComponents/text-about-me-scroll.vue";
import CodeStyleTextAbouMe from "../components/home/welcomeBannerComponents/code-style-text-about-me.vue";
import MpFooter from "../components/main/mp-footer.vue";


const store = useStore<any>();

let msg = computed(() => {
    return store.getters['home/msgGetter']
})

</script>

<template>
    <div>
        <weclome-title></weclome-title>
        <text-about-me-scroll></text-about-me-scroll>
        <code-style-text-abou-me></code-style-text-abou-me>
    </div>
</template>

<style scoped>
h1 {
    color: #42b883;
}
</style>
