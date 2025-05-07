<script setup lang="ts">
import { computed, watch } from "vue"
import { useStore } from "vuex";

const store = useStore<any>();

interface Props {
    modalType:  string;
}

const props = withDefaults(defineProps<Props>(), {
    modalType: 'add',
});

const position = computed({
    get: () => store.getters["position/positionGetter"],
    set: (value) => store.commit("position/positionSetter", value),
});

const tillNow = computed(() => position.value.tillNow)

watch(() => tillNow.value, (val) => {
    if (val) {
        position.value.endDate = ''
    }
})


async function createPosition() {
    await store.dispatch("position/storePosition", position.value);
}

async function updatePosition() {
    await store.dispatch("position/updatePosition", position.value);
}

async function deletePosition() {
    await store.dispatch("position/deletePosition", position.value.id);
}

async function handleSubmit() {
    if (props.modalType === 'add') {
        await createPosition();
    } else if (props.modalType === 'edit') {
        await updatePosition();
    } else if (props.modalType === 'remove') {
        await deletePosition();
    }

    // Optional: Close modal after action
    const modal = document.getElementById("about-me-modal");
    if (modal) {
        const closeBtn = modal.querySelector(".btn-close") as HTMLElement;
        closeBtn?.click();
    }

    // Optional: Reset form
    store.commit("position/positionSetter", {
        title: "",
        desciption: "",
        company: "",
        startDate: "",
        endDate: "",
        tillNow: false,
        type: "work"
    });
}

</script>

<template>
    <div id="about-me-modal" class="modal fade"  tabindex="-1" aria-labelledby="exampleModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4>About me 
                        <template v-if="modalType == 'add'"> Add </template>
                        <template v-else-if="modalType == 'edit'">Edit </template>
                        <template v-else-if="modalType == 'remove'">Remove </template>
                       Modal
                    </h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body-about-me">
                    <template v-if="modalType == 'remove'">
                        <div class="modal-padding">
                            Are you sure want to delete    
                        </div>
                    </template>
                    <template v-else>
                        <div class="modal-padding">
                            <div class="row-element">
                                <div class="w-50">
                                    <label for="date">Dates</label>
                                </div>
                                <div class="w-50">
                                    <div class="date-picker-inputs">
                                        <datepicker :minimum-view="'month'" :maximum-view="'year'"  v-model="position.startDate"></datepicker>
                                        <datepicker v-if="!position.tillNow" :minimum-view="'month'" :maximum-view="'year'" v-model="position.endDate"></datepicker>
                                    </div>
                                    <div class="till-now-button">
                                        <input @click="position.tillNow = !position.tillNow" type="checkbox" id="till-now-checkbox"  />
                                        <label for="till-now-checkbox">Till Now</label>
                                    </div>
                                </div>
                            </div>
                            <div class="row-element">
                                <div class="w-50">
                                    <label for="type">Type</label>
                                </div>
                                <div class="w-50">
                                    <div class="modal-input" name="type" id="type">
                                        <select v-model="position.type">
                                            <option value="work">Work</option>
                                            <option value="education">Education</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row-element">
                                <div class="w-50">
                                    <label for="position-title">Title</label>
                                </div>
                                <div class="w-50">
                                    <div class="modal-input">
                                        <input type="text" id="position-title" placeholder="Enter Position title" v-model="position.title"/>
                                    </div>
                                </div>
                            </div>
                            <div class="row-element">
                                <div class="w-50">
                                    <label for="company-name">Company Name</label>
                                </div>
                                <div class="w-50">
                                    <div class="modal-input">
                                        <input type="text" id="company-name" placeholder="Enter Company name" v-model="position.company"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="textarea-container">
                            <textarea id="text-about-me" class="form-input" placeholder="Enter Position Description" v-model="position.description"></textarea>
                        </div>
                    </template>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary close" data-bs-dismiss="modal" aria-label="Close">
                        Close
                    </button>
                    <button class="btn" :class="modalType === 'remove' ? 'btn-danger' : 'btn-primary'" @click="handleSubmit">
                        {{ modalType === 'add' ? 'Create' : modalType === 'edit' ? 'Update' : 'Delete' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
</style>