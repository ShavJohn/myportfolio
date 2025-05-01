<script setup lang="ts">
import { computed } from "vue";
import EditComponentButton from "../main/edit-component-button.vue";
import codeStyleModal from "./modals/code-style-modal.vue";
import { useStore } from "vuex";
import type { Entry, DitailsEntry } from "../../types/home";

const store = useStore();

const aboutMe = computed(() => store.state.home.myDitailsArray);
const education = computed(() => store.state.home.educationArray);
const workExperience = computed(() => store.state.home.workArray);
const skills = computed(() => store.state.skill.skillsArray);
const authUser = computed(() => store.getters['auth/authUserGetter'])

const eduacationLines = computed(() => {
    return education.value.map((edu: Entry, index: number) => 
        `<span class='editor-dots'>........</span>{ <span class='editor-string'>'${edu.starDate}-${edu.endDate}': '${edu.inputText}'</span> }${index < education.value.length - 1 ? "," : ""}`
    );
});

const workExperienceLines = computed(() => {
    return workExperience.value.map((job: Entry, index: number) => 
        `<span class='editor-dots'>........</span>{ <span class='editor-string'>'${job.starDate}-${job.endDate}': '${job.inputText}'</span> }${index < workExperience.value.length - 1 ? "," : ""}`
    );
});

const aboutMeLines = computed(() => {
    return aboutMe.value.map((text: DitailsEntry, index: number) => 
        `<span class='editor-dots'>......</span><span class="editor-this">this</span>.<span class="editor-value-name">${text.key}</span> <span class="editor-equal">=</span> <span class="editor-string">${text.value};</span>${index < aboutMe.value.length - 1 ? "," : ""}`
    )
})

const codeLines = computed(() => [
    `<span class='editor-class'>class </span><span class='editor-class-name'>ShavJohn</span> { `,
    `<span class='editor-dots'>..</span><span class='editor-comment'>// I create, I develop, I learn.</span>`,
    `<span class='editor-dots'>....</span><span class='editor-function'>constructor</span>() {`,
    ...aboutMeLines.value,
    `<span class='editor-dots'>....</span>}`,
    "",
    `<span class='editor-dots'>....</span><span class='editor-function'>education</span>() {`,
    `<span class='editor-dots'>......</span><span class="editor-return">return</span> [`,
    ...eduacationLines.value,
    `<span class='editor-dots'>......</span>];`,
    `<span class='editor-dots'>....</span>}`,
    "",
    `<span class='editor-dots'>....</span><span class='editor-function'>workExperience</span>() {`,
    `<span class='editor-dots'>......</span><span class="editor-return">return</span> [`,
    ...workExperienceLines.value,
    `<span class='editor-dots'>......</span>];`,
    `<span class='editor-dots'>....</span>}`,
    "",
    `<span class='editor-dots'>....</span><span class='editor-function'>skills</span>() {`,
    `<span class='editor-dots'>......</span><span class="editor-return">return</span> [ ${skills.value.map((skill: string) => `<span class='editor-string'>"${skill}"</span>`).join(', ')} <span class="text-indicator"></span>];`,
    "<span class='editor-dots'>....</span>}",
    "}",
]);

</script>

<template>
   <div class="editor-container-outer edit-button-container">
       <edit-component-button v-if="authUser" type="button" data-bs-toggle="modal" data-bs-target="#code-style-edit-modal"></edit-component-button>
       <code-style-modal v-if="authUser"></code-style-modal>
       <div class="editor-container">
           <div class="code-editor">
            <pre v-for="(line, index) in codeLines" :key="index" class="code-line">
                <span class="line-number">{{ index + 1 }}</span>
                <span class="code-text" v-html="line"></span>
            </pre>
           </div>
       </div>
   </div>
</template>

<style scoped>


</style>
