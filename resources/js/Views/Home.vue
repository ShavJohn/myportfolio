<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore<any>();

let msg = computed(() => {
    return store.getters['home/msgGetter']
})

</script>

<template>
    <div>

    </div>
</template>

<style scoped>
h1 {
    color: #42b883;
}
</style>
