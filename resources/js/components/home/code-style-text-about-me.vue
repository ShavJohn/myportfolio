<script setup lang="ts">
import { ref, computed } from "vue";
import EditComponentButton from "../main/edit-component-button.vue";
import codeStyleModal from "./modals/code-style-modal.vue";

const skills = ref([
    'Vue',
    'Laravel',
    'Docker',
    'Kubernetes',
    'TailwindCSS'
])

const education = ref([
    { year: "2023-now", position: "Full-stack Developer at Company XYZ" },
    { year: "2020-2023", position: "Software Engineer at ABC Corp" },
]);

const workExperience = ref([
    { year: "2023-now", position: "Full-stack Developer at Company XYZ" },
    { year: "2020-2023", position: "Software Engineer at ABC Corp" },
]);


const eduacationLines = computed(() => {
    return workExperience.value.map((job, index) => 
        `<span class='editor-dots'>........</span>{ <span class='editor-string'>'${job.year}': '${job.position}'</span> }${index < workExperience.value.length - 1 ? "," : ""}`
    );
});

const workExperienceLines = computed(() => {
    return workExperience.value.map((job, index) => 
        `<span class='editor-dots'>........</span>{ <span class='editor-string'>'${job.year}': '${job.position}'</span> }${index < workExperience.value.length - 1 ? "," : ""}`
    );
});

const codeLines = ref([
    `<span class='editor-class'>class </span><span class='editor-class-name'>ShavJohn</span> { `,
    `<span class='editor-dots'>..</span><span class='editor-comment'>// I create, I develop, I learn.</span>`,
    `<span class='editor-dots'>....</span><span class='editor-function'>constructor</span>() {`,
    `<span class='editor-dots'>......</span><span class="editor-this">this</span>.<span class="editor-value-name">name </span> <span class="editor-equal">=</span> <span class="editor-string">'Your Name';</span>`,
    `<span class='editor-dots'>......</span><span class="editor-this">this</span>.<span class="editor-value-name">email </span> <span class="editor-equal">=</span> <span class="editor-string">'your.email@example.com';</span>`,
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
    `<span class='editor-dots'>......</span><span class="editor-return">return</span> [ ${skills.value.map(skill => `<span class='editor-string'>"${skill}"</span>`).join(', ')} <span class="text-indicator"></span>];`,
    "<span class='editor-dots'>....</span>}",
    "}",
]);

</script>

<template>
   <div class="editor-container-outer edit-button-container">
       <edit-component-button type="button" data-bs-toggle="modal" data-bs-target="#text-about-me-edit-modal"></edit-component-button>
       <code-style-modal></code-style-modal>
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
