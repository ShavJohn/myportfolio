<script setup lang="ts">
import Project from "./project.vue";
import EditComponentButton from "../main/edit-component-button.vue";

</script>

<template>
    <div class="projects-container edit-button-container">
        <edit-component-button :btnType="'add'"></edit-component-button>
        <project v-for="i in 8"></project>
    </div>
</template>

<style scoped>

</style>
