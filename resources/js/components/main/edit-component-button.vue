<script setup lang="ts">

interface Props {
    btnType?: string; // Optional prop with default value
}

const props = withDefaults(defineProps<Props>(), {
    btnType: 'edit', // Default value
});

</script>

<template>
    <div class="edit-component-btn-container">
        <button class="edit-component-btn">
            <font-awesome-icon v-if="btnType === 'edit'" icon="fa-solid fa-pen-to-square" />
            <font-awesome-icon v-if="btnType === 'add'" icon="fa-solid fa-plus" />
        </button>
    </div>
</template>

<style lang="scss">

</style>
