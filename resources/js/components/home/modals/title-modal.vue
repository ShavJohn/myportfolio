<script setup lang="js">
import MpModal from "../../main/mp-modal.vue"

</script>
<template>
    <mp-modal modalId="title-edit-modal">
        <template #modal-header>
            <h4>Title edit modal</h4>
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