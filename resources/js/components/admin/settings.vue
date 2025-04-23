<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore<any>();

let current = computed({
    get: () => store.getters['dashboard/currentSelectedGetter'],
    set: () => store.commit('dashboard/currentSelectedSetter')
})
</script>

<template>
    <div class="settings-panel-container">
        <form>
            <div class="panel-element-row">
                <label for="page-logo">Logo</label>
                <input type="file" id="page-logo" name="page-logo">
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
