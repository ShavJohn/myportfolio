<script setup lang="ts">
import { computed } from "vue"
import { useStore } from "vuex";
import { Setting } from '../../../types/settings';

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

const shortAboutMe = settingByKey('shortAboutMe')

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

const store = useStore<any>();

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
                    <textarea v-model="shortAboutMe.value" id="text-about-me" class="form-input"></textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary close" data-bs-dismiss="modal" aria-label="Close">
                        Close
                    </button>
                    <button class="btn btn-primary" @click="update(shortAboutMe, 'shortAboutMe')">
                        Update 
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
</style>