<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { Setting } from '../../types/settings';

const store = useStore<any>()

const settings = computed(() => store.getters['settings/settingsGetter'])

const logo = computed(() => settings &&  settings.value ? settings.value.find((setting: Setting) => setting.key === 'logo') : null)

function uploadLogo(e: any): void {
    let formData = new FormData()
    formData.append('image', e.target.files[0])

    store.dispatch('settings/logoUpload', formData).then((res) => {
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

function deleteLogo(): void {
    store.dispatch('settings/logoDelete', logo.value.value).then((res) => {
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
    <div class="settings-panel-container">
        <form>
            <div class="panel-element-row">
                <label for="page-logo">Logo</label>
                <div v-if="logo && logo.value && logo.value.length" class="logo-image-conatiner">
                    <font-awesome-icon icon="fa-solid fa-x" @click="deleteLogo()" />
                    <img :src="`storage/${logo.value}`">
                </div>
                <input v-else type="file" id="page-logo" name="page-logo" @change="uploadLogo($event)">
            </div>
            <div class="panel-element-row">
                <label for="page-name">Page name</label>
                <input type="text" id="page-name" name="page-name" class="input-text">
            </div>
            <div class="panel-element-row">
                <label for="page-meta-name">Page meta name</label>
                <input type="text" id="page-meta-name" name="page-meta-name" class="input-text">
            </div>
            <div class="panel-element-row">
                <label for="page-meta-desc">Page meta description</label>
                <input type="text" id="page-meta-desc" name="page-meta-desc" class="input-text">
            </div>
            <div class="panel-element-row">
                <label for="linkdin-url">Linkdin Url</label>
                <input type="text" id="linkdin-url" name="linkdin-url" class="input-text">
            </div>
            <div class="panel-element-row">
                <label for="github-url">GitHub Url</label>
                <input type="text" id="github-url" name="github-url" class="input-text">
            </div>
        
        </form>
    </div>
</template>

<style scoped>

</style>
