<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import MpModal from "../../main/mp-modal.vue";
import { Computed, useStore } from "vuex";
import { Setting } from "../../../types/settings";

const store = useStore();

let setting: Setting = {
    key: '',
    value: '',
    json_value: null,
    setting_type: 'personal_data'
}

const personalSettings = computed(() => store.getters['settings/settingsGetter'].filter((setting: Setting) => setting.setting_type === 'personal_data'))

function addSetting() {
    store.dispatch('settings/crateOrUpdateSetting', setting).then((res) => {

        setting = {
            key: '',
            value: '',
            json_value: null,
            setting_type: 'personal_data'
        }
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

function removeData(type: string): void {
    store.dispatch('settings/deleteSetting', type).then((res) => {
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
                    <input v-model="setting.key" type="text" id="my-ditails-key" placeholder="Enter key" />
                </div>
                <div class="input-with-btn">
                    <input v-model="setting.value" @keydown.enter="addSetting()" type="text" id="my-ditails-value"
                        placeholder="Enter value" />
                    <button @click="addSetting()">Add</button>
                </div>
                <div class="tags-container">
                    <div class="tag-item" v-for="(ditail, index) in personalSettings" :key="index">
                        <span class="tag-text">
                            {{ ditail.key }} {{ ditail.value }}
                        </span>
                        <font-awesome-icon @click="removeData(ditail.key)" icon="fa-solid fa-x" />
                    </div>
                </div>
            </div>
        </div>
    </template>

    <template #modal-footer>
        <button type="button" class="btn btn-secondary close" data-bs-dismiss="modal" aria-label="Close">
            Close
        </button>
    </template>
</mp-modal>
</template>

<style lang="scss">
/* Your custom styles go here */
</style>
