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
    <div id="text-about-me-edit-modal" class="modal fade"  tabindex="-1" aria-labelledby="exampleModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4>Text about me edit modal</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body-for-text">
                    <textarea v-model="shotAboutMe" id="text-about-me" class="form-input"></textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary close" data-bs-dismiss="modal" aria-label="Close">
                        Close
                    </button>
                    <button class="btn btn-primary">
                        Update 
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
</style>