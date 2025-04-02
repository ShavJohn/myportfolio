<script setup lang="ts">

import MpModal from "../main/mp-modal.vue"

interface Props {
    modalType:  string;
}

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