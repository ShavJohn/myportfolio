<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import messages from './messages.vue';
import settings from './settings.vue';
import statistics from './statistics.vue';

const componentsMap: Record<string, any> = {
  messages: messages,
  settings: settings,
  statistics: statistics
};

const store = useStore<any>();

let current = computed({
    get: () => store.getters['dashboard/currentSelectedGetter'],
    set: () => store.commit('dashboard/currentSelectedSetter')
})

</script>

<template>
    <div class="admin-content-container">
        <component :is="componentsMap[current]"></component>
    </div>
</template>

<style scoped>

</style>
