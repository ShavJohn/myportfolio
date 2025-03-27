<script setup lang="ts">
import MpModal from "../../main/mp-modal.vue"
import { ref, computed } from "vue"
import { useStore } from "vuex";

const store = useStore<any>();

const shotAboutMe = computed({
    get: () => store.getters["home/shortAboutMeGetter"],
    set: (value) => store.commit("home/shortAboutMeSetter", value),
});

</script>
<template>
    <mp-modal modalId="text-about-me-edit-modal">
        <template #modal-header>
            <h4>Text about me edit modal</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </template>
        <template #modal-body>
            <div class="row-element">
                <div class="w-50">
                    <label for="title-text">Text about me</label>
                </div>
                <div class="w-50">
                    <textarea v-model="shotAboutMe" class="form-input"></textarea>
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
</style>