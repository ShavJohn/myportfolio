<script setup lang="ts">
import {defineProps, withDefaults} from "vue";

import MpModal from "../main/mp-modal.vue"

interface Props {
    modalType:  string;
}

withDefaults(defineProps<Props>(), {
    modalType: 'add', // Default value
});

</script>
<template>
    <mp-modal modalId="about-me-modal">
        <template #modal-header>
            <h4 v-if="modalType == 'add'">Add about me modal</h4>
            <h4 v-else-if="modalType == 'edit'">Edit about me modal</h4>
            <h4 v-else-if="modalType == 'remove'">Remove about me modal</h4>
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