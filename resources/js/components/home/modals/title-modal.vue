<script setup lang="ts">
import { ref, computed } from "vue"
import MpModal from "../../main/mp-modal.vue"
import { useStore } from "vuex";
const store = useStore<any>();

const textAboutMe = computed({
    get: () => store.getters["home/textAboutMeGetter"],
    set: (value) => store.commit("home/textAboutMeSetter", value),
});

let tagArr =  computed(() => {
    return store.getters['home/skillsGetter']
})

let tag = ref<string>('')

function addToArr(): void {
    if (tag.value.trim()) { 
        store.commit("home/skillsSetter", tag.value); // Add skill to Vuex store
        tag.value = "";
    }
}

function removeTag(key: number): void {
    tagArr.value.splice(key, 1); // Remove skill from Vuex store
}

</script>

<template> 
    <mp-modal modalId="title-edit-modal"> 
        <template #modal-header>
            <h4>Title edit modal</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </template>
        <template #modal-body>
            <div class="row-element">
                <div class="w-50">
                    <label for="title-text">Title text</label>
                </div>
                <div class="w-50">
                    <input type="text" v-model="textAboutMe" class="form-input" id="title-text" placeholder="Eneter title text" />
                </div>
            </div>
            <div class="row-element">
                <div class="w-50">
                    <label for="title-text">Skills</label>
                </div>
                <div class="w-50">
                    <div class="input-with-btn">
                        <input v-model="tag"  @keydown.enter="addToArr" type="text" id="skils" placeholder="Eneter skils" />
                        <button @click="addToArr">Add</button>
                    </div>
                    <div class="tags-container">
                        <div class="tag-item" v-for="(tag, key) in tagArr" :key="key">
                            <span class="tag-text">{{  tag  }}</span>
                            <font-awesome-icon @click="removeTag(key)" icon="fa-solid fa-x" />
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
</style>