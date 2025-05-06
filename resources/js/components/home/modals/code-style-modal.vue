<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import MpModal from "../../main/mp-modal.vue";
import { useStore } from "vuex";

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

const myDitailsArray = computed(() => store.state.home.myDitailsArray);

function addToArr(dataType: 'myDitails' | 'education' | 'work'): void {
     if (dataType === 'myDitails') {
        store.commit("home/myDitailsArraySetter", { ...myDitails });
        myDitails.key = '';
        myDitails.value = '';
    }
}

function removeFromArr(index: number, type: 'myDitails' | 'education' | 'work'): void {
    if (type === 'myDitails') {
        myDitailsArray.value.splice(index, 1);
        store.commit("home/myDitailsArraySetter", myDitailsArray.value);
    }
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
