<script setup lang="ts">
import { computed } from "vue";
import EditComponentButton from "../main/edit-component-button.vue";
import codeStyleModal from "./modals/code-style-modal.vue";
import { useStore } from "vuex";
import type { Position } from "../../types/position";
import moment from "moment";
import type { Setting } from "../../types/settings";

type Skill = {
    key: string,
    value: string
}

const positions = computed(() => store.getters["position/positionsArrayGetter"])

const store = useStore();

function formatDateRange(start: string, end: string, tillNow: boolean): string {
    const formattedStart = moment(start).format("MMM YYYY");
    let formattedEnd = ''
    console.log(end)
    if(tillNow) {
        formattedEnd = 'Present'
    } else {
        formattedEnd =  moment(end).format("MMM YYYY");
    }
    return `${formattedStart} - ${formattedEnd}`;
}

const aboutMe = computed(() => store.state.home.myDitailsArray);

const education = computed(() => positions.value.filter((pos: Position) => pos.type === 'education'))
const workExperience = computed(() => positions.value.filter((pos: Position) => pos.type === 'work'))

const skills = computed(() => store.getters["skill/skillsGetter"]);
const authUser = computed(() => store.getters['auth/authUserGetter'])

const personalSettings = computed(() => store.getters['settings/settingsGetter'].filter((setting: Setting) => setting.setting_type === 'personal_data'))

const aboutMeLines = computed(() => {
    if(personalSettings.value && personalSettings.value.length) {
        return personalSettings.value.map((text: Setting, index: number) => 
            `<span class='editor-dots'>......</span><span class="editor-this">this</span>.<span class="editor-value-name">${text.key}</span> <span class="editor-equal">=</span> <span class="editor-string">${text.value};</span>${index < aboutMe.value.length - 1 ? "," : ""}`
        )
    }
    return []
})

const eduacationLines = computed(() => {
    if(education.value && education.value.length) {
        return education.value.map((edu: Position, index: number) => 
            `<span class='editor-dots'>........</span>{ <span class='editor-string'>'${formatDateRange(edu.startDate, edu.endDate, edu.tillNow)}': '${edu.title} at ${edu.company}'</span> }${index < education.value.length - 1 ? "," : ""}`
        );
    }
    return []
});

const workExperienceLines = computed(() => {
    if(workExperience.value && workExperience.value.length) {
        return workExperience.value.map((job: Position, index: number) => 
            `<span class='editor-dots'>........</span>{ <span class='editor-string'>'${formatDateRange(job.startDate, job.endDate, job.tillNow)}': '${job.title} at ${job.company}'</span> }${index < workExperience.value.length - 1 ? "," : ""}`
        );
    }
    return []
});

const codeLines = computed(() => [
    `<span class='editor-class'>class </span><span class='editor-class-name'>Developer</span> { `,
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
