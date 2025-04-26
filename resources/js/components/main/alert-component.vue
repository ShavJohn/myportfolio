<script setup lang="ts">
import { computed } from "vue"
import { useStore } from "vuex";

const store = useStore<any>()

const alertMessage = computed(() => store.getters['alert/alertGetter'])
const alertOpen = computed(() => store.getters['alert/alertOpenGetter'])

</script>

<template>
    <div class="alert-component" @click="store.commit('alert/alertOpenSetter', false)" 
    :class="[alertMessage.type, alertOpen ? 'open-alert' : 'close-alert']">
        <span>{{ alertMessage.message }}</span>
    </div>
</template>