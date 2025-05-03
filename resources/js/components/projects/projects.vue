<script setup lang="ts">
import { ref, computed } from "vue"
import Project from "./project.vue";
import EditComponentButton from "../main/edit-component-button.vue";
import ProjectModal from "./project-modal.vue";
import { useStore } from "vuex";

const store = useStore<any>()

const authUser = computed(() => store.getters['auth/authUserGetter'])
 
const projects = computed(() => store.getters['project/projectsGetter'])

let modalType = ref<string>('add')

</script>

<template>
    <div class="projects-container edit-button-container">
        <edit-component-button v-if="authUser" :btnType="'add'" @click="modalType = 'add'" type="button" data-bs-toggle="modal" data-bs-target="#project-modal"></edit-component-button>
        <project-modal v-if="authUser" :modalType="modalType"></project-modal>
        <project v-for="project in projects" :project="project"  @changeModalType="(value) => modalType = value"></project>
    </div>
</template>

<style scoped>

</style>
