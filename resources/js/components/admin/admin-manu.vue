<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore<any>();

let current = computed({
    get: () => store.getters['dashboard/currentSelectedGetter'],
    set: (val) => store.commit('dashboard/currentSelectedSetter', val)
})

</script>

<template>
    <div class="admin-menu-container">
        <ul class="admin-menu">
            <li class="admin-menu-item" @click="current = 'messages'"><font-awesome-icon icon="fa-solid fa-inbox" /><span>Messages</span></li>
            <li class="admin-menu-item" @click="current = 'statistics'"><font-awesome-icon icon="fa-solid fa-chart-line" /><span>Statistics</span></li>
            <li class="admin-menu-item" @click="current = 'settings'"><font-awesome-icon icon="fa-solid fa-gear" /><span>Settings</span></li>
        </ul>
    </div>
</template>

<style scoped>

</style>
