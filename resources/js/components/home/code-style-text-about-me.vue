<script setup lang="ts">
import { computed } from "vue";
import EditComponentButton from "../main/edit-component-button.vue";
import codeStyleModal from "./modals/code-style-modal.vue";
import { useStore } from "vuex";
import type { DitailsEntry } from "../../types/home";
import { Position } from "../../types/position";
import moment from "moment";

type Skill = {
    key: string,
    value: string
}

const positions = computed(() => store.getters["position/positionsArrayGetter"])

const store = useStore();

function dataFromat(startDate: string, endDate: string) {
    return `${moment(startDate).format("YYYY MMM")} - ${moment(endDate).format("YYYY MMM")}`
}

const aboutMe = computed(() => store.state.home.myDitailsArray);

const education = computed(() => positions.value.filter((pos: Position) => pos.type === 'education'))
const workExperience = computed(() => positions.value.filter((pos: Position) => pos.type === 'work'))

const skills = computed(() => store.getters["skill/skillsGetter"]);
const authUser = computed(() => store.getters['auth/authUserGetter'])

const aboutMeLines = computed(() => {
    return aboutMe.value.map((text: DitailsEntry, index: number) => 
        `<span class='editor-dots'>......</span><span class="editor-this">this</span>.<span class="editor-value-name">${text.key}</span> <span class="editor-equal">=</span> <span class="editor-string">${text.value};</span>${index < aboutMe.value.length - 1 ? "," : ""}`
    )
})

const eduacationLines = computed(() => {
    return education.value.map((edu: Position, index: number) => 
        `<span class='editor-dots'>........</span>{ <span class='editor-string'>'${dataFromat(edu.startDate, edu.endDate)}': '${edu.title} at ${edu.company}'</span> }${index < education.value.length - 1 ? "," : ""}`
    );
});

const workExperienceLines = computed(() => {
    return workExperience.value.map((job: Position, index: number) => 
        `<span class='editor-dots'>........</span>{ <span class='editor-string'>'${dataFromat(job.startDate, job.endDate)}': '${job.title} at ${job.company}'</span> }${index < workExperience.value.length - 1 ? "," : ""}`
    );
});

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
    `<span class='editor-dots'>......</span><span class="editor-return">return</span> [ ${skills.value.map((skill: Skill) => `<span class='editor-string'>"${skill.value}"</span>`).join(', ')} <span class="text-indicator"></span>];`,
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
