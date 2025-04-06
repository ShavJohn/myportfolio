<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import MpModal from "../main/mp-modal.vue"

interface Props {
    modalType:  string;
}

const state = useStore<any>()

const project = computed({
    get: () => state.getters['project/projectGetter'],
    set: () => state.commit('project/projectSetter')
})

withDefaults(defineProps<Props>(), {
    modalType: 'add', // Default value
});

</script>
<template>
    <mp-modal modalId="project-modal">
        <template #modal-header>
            <h4 v-if="modalType == 'add'">Add project modal</h4>
            <h4 v-else-if="modalType == 'edit'">Edit project modal</h4>
            <h4 v-else-if="modalType == 'remove'">Remove project modal</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </template>
        <template #modal-body>
            <form>
                <div class="row-element">
                    <div class="w-50">
                        <label for="project-name">Project name</label>
                    </div>
                    <div class="w-50">
                        <input type="text" class="form-input" id="project-name" v-model="project.name" placeholder="Eneter project name" />
                    </div>
                </div>
                <div class="row-element">
                    <div class="w-50">
                        <label for="project-url">Project URL</label>
                    </div>
                    <div class="w-50">
                        <input type="text" class="form-input" id="project-url" v-model="project.url" placeholder="Eneter project URL" />
                    </div>
                </div>
                <div class="row-element">
                    <div class="w-50">
                        <label for="project-image">Project Image</label>
                    </div>
                    <div class="w-50">
                        <input type="file" class="form-input" id="project-image" placeholder="Eneter project file" />
                    </div>
                </div>
            </form>
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
</style>