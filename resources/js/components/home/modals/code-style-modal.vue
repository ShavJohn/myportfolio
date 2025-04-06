<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import MpModal from "../../main/mp-modal.vue";
import { useStore } from "vuex";
import moment from "moment";

const store = useStore();

export interface DitailsEntry {
    key: string,
    value: string
}

interface Entry {
    inputText: string;
    starDate: string;
    endDate: string;
    tillNow: boolean;
}

let myDitails = reactive<DitailsEntry>({
    key: '',
    value: ''
});

let education = reactive<Entry>({
    inputText: '',
    starDate: '',
    endDate: '',
    tillNow: false
});

let work = reactive<Entry>({
    inputText: '',
    starDate: '',
    endDate: '',
    tillNow: false
});

const myDitailsArray = computed(() => store.state.home.myDitailsArray);
const educationArray = computed(() => store.state.home.educationArray);
const workArray = computed(() => store.state.home.workArray);
const skills = computed(() => store.state.home.skillsArray);

let skill = ref<string>('');

function addToArr(dataType: 'skills' | 'myDitails' | 'education' | 'work'): void {
    if (dataType === 'skills') {
        if (skill.value.trim()) {
            store.commit("home/skillsSetter", skill.value.trim());
            skill.value = "";
        }
    } else if (dataType === 'myDitails') {
        store.commit("home/myDitailsArraySetter", { ...myDitails });
        myDitails.key = '';
        myDitails.value = '';
    } else if (dataType === 'education') {
        if (education.tillNow) {
            education.endDate = 'Till now';
        }
        store.commit("home/educationArraySetter", { ...education });
        education.inputText = '';
        education.starDate = '';
        education.endDate = '';
        education.tillNow = false;
    } else if (dataType === 'work') {
        if (work.tillNow) {
            work.endDate = 'Till now';
        }
        store.commit("home/workArraySetter", { ...work });
        work.inputText = '';
        work.starDate = '';
        work.endDate = '';
        work.tillNow = false;
    }
}

function removeFromArr(index: number, type: 'skills' | 'myDitails' | 'education' | 'work'): void {
    if (type === 'skills') {
        skills.value.splice(index, 1);
        store.commit("home/skillsArraySetter", skills.value);
    } else if (type === 'myDitails') {
        myDitailsArray.value.splice(index, 1);
        store.commit("home/myDitailsArraySetter", myDitailsArray.value);
    } else if (type === 'education') {
        educationArray.value.splice(index, 1);
        store.commit("home/educationArraySetter", educationArray.value);
    } else if (type === 'work') {
        workArray.value.splice(index, 1);
        store.commit("home/workArraySetter", workArray.value);
    }
}

function formatDateRange(start: string, end: string): string {
    const formattedStart = moment(start).format("MMM YYYY");
    const formattedEnd = typeof end === "string" ? end : moment(end).format("MMM YYYY");
    return `${formattedStart} - ${formattedEnd}`;
}
</script>

<template>
<mp-modal modalId="code-style-edit-modal">
    <template #modal-header>
        <h4>Code style edit modal</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </template>

    <template #modal-body>
        <!-- My Ditails Section -->
        <div class="row-element">
            <div class="w-50">
                <label for="title-text">My Ditailes</label>
            </div>
            <div class="w-50">
                <div class="modal-input">
                    <input v-model="myDitails.key" type="text" id="my-ditails-key" placeholder="Enter key" />
                </div>
                <div class="input-with-btn">
                    <input v-model="myDitails.value" @keydown.enter="addToArr('myDitails')" type="text" id="my-ditails-value"
                        placeholder="Enter value" />
                    <button @click="addToArr('myDitails')">Add</button>
                </div>
                <div class="tags-container">
                    <div class="tag-item" v-for="(ditail, index) in myDitailsArray" :key="index">
                        <span class="tag-text">
                            {{ ditail.key }} {{ ditail.value }}
                        </span>
                        <font-awesome-icon @click="removeFromArr(index, 'myDitails')" icon="fa-solid fa-x" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Education Section -->
        <div class="row-element">
            <div class="w-50">
                <label for="education">Education</label>
            </div>
            <div class="w-50">
                <div class="date-picker-inputs">
                    <datepicker :minimum-view="'month'" :maximum-view="'month'" v-model="education.starDate"></datepicker>
                    <datepicker v-if="!education.tillNow" :minimum-view="'month'" :maximum-view="'month'"
                        v-model="education.endDate"></datepicker>
                </div>
                <div class="till-now-button">
                    <input type="checkbox" id="education-checkbox" v-model="education.tillNow" />
                    <label for="education-checkbox">Till Now</label>
                </div>
                <div class="input-with-btn">
                    <input v-model="education.inputText" @keydown.enter="addToArr('education')" type="text" id="education"
                        placeholder="Enter education details" />
                    <button @click="addToArr('education')">Add</button>
                </div>
                <div class="tags-container">
                    <div class="tag-item" v-for="(edu, index) in educationArray" :key="index">
                        <span class="tag-text">
                            {{ formatDateRange(edu.starDate, edu.endDate) }} {{ edu.inputText }}
                        </span>
                        <font-awesome-icon @click="removeFromArr(index, 'education')" icon="fa-solid fa-x" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Work Section -->
        <div class="row-element">
            <div class="w-50">
                <label for="work">Working</label>
            </div>
            <div class="w-50">
                <div class="date-picker-inputs">
                    <datepicker v-model="work.starDate"></datepicker>
                    <datepicker v-if="!work.tillNow" v-model="work.endDate"></datepicker>
                </div>
                <div class="till-now-button">
                    <input type="checkbox" id="work-checkbox" v-model="work.tillNow" />
                    <label for="work-checkbox">Till Now</label>
                </div>
                <div class="input-with-btn">
                    <input v-model="work.inputText" @keydown.enter="addToArr('work')" type="text" id="work"
                        placeholder="Enter work details" />
                    <button @click="addToArr('work')">Add</button>
                </div>
                <div class="tags-container">
                    <div class="tag-item" v-for="(w, index) in workArray" :key="index">
                        <span class="tag-text">
                            {{ formatDateRange(w.starDate, w.endDate) }} {{ w.inputText }}
                        </span>
                        <font-awesome-icon @click="removeFromArr(index, 'work')" icon="fa-solid fa-x" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Skills Section -->
        <div class="row-element">
            <div class="w-50">
                <label for="my-skils">Skills</label>
            </div>
            <div class="w-50">
                <div class="input-with-btn">
                    <input v-model="skill" @keydown.enter="addToArr('skills')" type="text" id="my-skils"
                        placeholder="Enter skills" />
                    <button @click="addToArr('skills')">Add</button>
                </div>
                <div class="tags-container">
                    <div class="tag-item" v-for="(s, index) in skills" :key="index">
                        <span class="tag-text">{{ s }}</span>
                        <font-awesome-icon @click="removeFromArr(index, 'skills')" icon="fa-solid fa-x" />
                    </div>
                </div>
            </div>
        </div>
    </template>

    <template #modal-footer>
        <button type="button" class="btn btn-secondary close" data-bs-dismiss="modal" aria-label="Close">
            Close
        </button>
        <button class="btn btn-primary">
            Update
        </button>
    </template>
</mp-modal>
</template>

<style lang="scss">
/* Your custom styles go here */
</style>
