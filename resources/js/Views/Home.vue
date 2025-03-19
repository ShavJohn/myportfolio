<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore<any>();

console.log(store);

let msg = computed(() => {
    return store.getters['home/msgGetter']
})

</script>

<template>
    <div>
        <h1 class="text-center">Hello from home</h1>
        <h1>msg => {{ msg }}</h1>
    </div>
</template>

<style scoped>
h1 {
    color: #42b883;
}
</style>
