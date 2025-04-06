<script setup lang="ts">
import { ref, computed, reactive } from "vue"
import { useStore } from "vuex";
import moment from "moment";

const store = useStore<any>();

interface Props {
    modalType:  string;
}

const position = computed({
    get: () => store.getters["aboutme/positionGetter"],
    set: (value) => store.commit("aboutme/positionSetter", value),
});

withDefaults(defineProps<Props>(), {
    modalType: 'add', // Default value
});

function formatDateRange(start: string, end: string): string {
    const formattedStart = moment(start).format("MMM YYYY");
    const formattedEnd = typeof end === "string" ? end : moment(end).format("MMM YYYY");
    return `${formattedStart} - ${formattedEnd}`;
}
</script>
<template>
    <div id="about-me-modal" class="modal fade"  tabindex="-1" aria-labelledby="exampleModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 v-if="modalType == 'add'">Add about me modal</h4>
                    <h4 v-else-if="modalType == 'edit'">Edit about me modal</h4>
                    <h4 v-else-if="modalType == 'remove'">Remove about me modal</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body-about-me">
                    <div class="modal-padding">
                        <div class="row-element">
                            <div class="w-50">
                                <label for="education">Dates</label>
                            </div>
                            <div class="w-50">
                                <div class="date-picker-inputs">
                                    <datepicker :minimum-view="'month'" :maximum-view="'month'"  v-model="position.startDate"></datepicker>
                                    <datepicker v-if="!position.tillNow" :minimum-view="'month'" :maximum-view="'month'" v-model="position.endDate"></datepicker>
                                </div>
                                <div class="till-now-button">
                                    <input @click="position.tillNow = !position.tillNow" type="checkbox" id="education-checkbox"  />
                                    <label for="education-checkbox">Till Now</label>
                                </div>
                            </div>
                        </div>
                        <div class="row-element">
                            <div class="w-50">
                                <label for="education">Title</label>
                            </div>
                            <div class="w-50">
                                <div class="modal-input">
                                    <input type="text" id="education" placeholder="Enter Position title" v-model="position.title"/>
                                </div>
                            </div>
                        </div>
                        <div class="row-element">
                            <div class="w-50">
                                <label for="education">Company Name</label>
                            </div>
                            <div class="w-50">
                                <div class="modal-input">
                                    <input type="text" id="education" placeholder="Enter Company name" v-model="position.company"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="textarea-container">
                        <textarea id="text-about-me" class="form-input" placeholder="Enter Position Description" v-model="position.desciption"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary close" data-bs-dismiss="modal" aria-label="Close">
                    Close
                </button>
                <button class="btn btn-primary">
                    Update 
                </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
</style>