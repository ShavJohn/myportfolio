<script setup lang="ts">
import { ref } from "vue"
import Project from "./project.vue";
import EditComponentButton from "../main/edit-component-button.vue";
import ProjectModal from "./project-modal.vue";

let modalType = ref<string>('add')

</script>

<template>
    <div class="projects-container edit-button-container">
        <edit-component-button :btnType="'add'" @click="modalType = 'add'" type="button" data-bs-toggle="modal" data-bs-target="#project-modal"></edit-component-button>
        <project-modal :modalType="modalType"></project-modal>
        <project v-for="i in 8" @changeModalType="(value) => modalType = value"></project>
    </div>
</template>

<style scoped>

</style>
