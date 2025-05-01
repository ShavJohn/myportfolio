<script setup lang="ts">
import { ref, computed } from "vue"
import MpModal from "../../main/mp-modal.vue"
import { Setting } from '../../../types/settings';
import { useStore } from "vuex";
const store = useStore<any>();

const settings = computed(() => store.getters['settings/settingsGetter'])

function settingByKey(key: string) {
    return computed(() => {
        return settings.value?.find((setting: Setting) => setting.key === key) ?? {
            key: '',
            value: '',
            json_value: null
        };
    });
}

const titleText = settingByKey('textAboutMe')

let tagArr =  computed(() => {
    return store.getters['skill/skillsGetter']
})

let tag = ref<string>('')

function update(data: Setting, key: string) {
    if(data.key === '') {
        data.key = key
    }
    store.dispatch('settings/crateOrUpdateSetting', data).then((res) => {
        store.dispatch('alert/alertResponse', {
            'type': res?.data?.type,
            'message': res?.data?.message
        })
    }).catch((err) => {
        store.dispatch('alert/alertResponse', {
            'type': err?.data?.type,
            'message': err?.data?.message
        })
    })
}

function addToArr(): void {
    if (tag.value.trim()) { 
        const data = {
            key: tag.value.trim().replace(/\s+/g, "_").toLowerCase(),
            value: tag.value
        }
        store.commit("skill/skillSetter", data); 
        store.dispatch('skill/stroeSkill', data).then(res => {
            store.dispatch('alert/alertResponse', {
                'type': res?.data?.type,
                'message': res?.data?.message
            })
        }).catch((err) => {
            store.dispatch('alert/alertResponse', {
                'type': err?.data?.type,
                'message': err?.data?.message
            })
        })
        tag.value = "";
    }
}

function removeTag(tag: Object, key: number): void {
    tagArr.value.splice(key, 1); // Remove skill from Vuex store
    store.dispatch('skill/removeSkill', tag).then(res => {
        store.dispatch('alert/alertResponse', {
            'type': res?.data?.type,
            'message': res?.data?.message
        })
    }).catch((err) => {
        store.dispatch('alert/alertResponse', {
            'type': err?.data?.type,
            'message': err?.data?.message
        })
    })
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
                    <input type="text" v-model="titleText.value" class="form-input" id="title-text" placeholder="Eneter title text" />
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
                            <span class="tag-text">{{  tag.value  }}</span>
                            <font-awesome-icon @click="removeTag(tag, key)" icon="fa-solid fa-x" />
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template #modal-footer>
            <button type="button" class="btn btn-secondary close" data-bs-dismiss="modal" aria-label="Close">
                Close
            </button>
            <button class="btn btn-primary" @click="update(titleText, 'textAboutMe')">
                Update 
            </button>
        </template>
    </mp-modal>
</template>

<style lang="scss">
</style>