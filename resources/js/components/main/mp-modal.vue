<script setup lang="ts">
import {defineProps, withDefaults} from "vue";

interface Props {
    modalId:  string;
}

withDefaults(defineProps<Props>(), {
    modalId: '', // Default value
});


</script>

<template>
    <div :id="modalId" class="modal fade"  tabindex="-1" aria-labelledby="exampleModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <slot name="modal-header"></slot>
                </div>
                <div class="modal-body">
                    <slot name="modal-body"></slot>
                </div>
                <div class="modal-footer">
                    <slot name="modal-footer"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">

</style>
