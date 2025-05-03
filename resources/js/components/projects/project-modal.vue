<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import MpModal from "../main/mp-modal.vue"

interface Props {
    modalType:  string;
}

const store = useStore<any>()

const project = computed({
    get: () => store.getters['project/projectGetter'],
    set: () => store.commit('project/projectSetter')
})

const props = withDefaults(defineProps<Props>(), {
    modalType: 'add',
});

async function createProject() {
    await store.dispatch("project/storeProject", project.value);
}

async function updateProject() {
    await store.dispatch("project/updateProject", project.value);
}

async function deleteProject() {
    await store.dispatch("project/deleteProject", project.value.id);
}

async function handleSubmit() {
    if (props.modalType === 'add') {
        await createProject();
    } else if (props.modalType === 'edit') {
        await updateProject();
    } else if (props.modalType === 'remove') {
        await deleteProject();
    }

    // Optional: Close modal after action
    const modal = document.getElementById("project-modal");
    if (modal) {
        const closeBtn = modal.querySelector(".btn-close") as HTMLElement;
        closeBtn?.click();
    }

    // Optional: Reset form
    store.commit("project/projectSetter", {
        name: '',
        url: '',
        image: '',
    });
}

function uploadImage(e: any): void {
    let formData = new FormData()
    formData.append('image', e.target.files[0])

    store.dispatch('project/uploadImage', formData).then((res) => {
        console.log(project.value)
        project.value.image = res.data.image.path
        console.log(project.value)
        store.dispatch('alert/alertResponse', {
            'type': res?.data?.type,
            'message': res?.data?.message
        })
    }).catch((err) => {
        store.dispatch('alert/alertResponse', {
            'type': err?.data?.type,
            'message': err?.data?.message
        })
    })
}

function deleteImage() {
    store.dispatch('project/deleteImage', project.value.image).then((res) => {
        project.value.image = ''

        store.dispatch('alert/alertResponse', {
            'type': res?.data?.type,
            'message': res?.data?.message
        })
    }).catch((err) => {
        store.dispatch('alert/alertResponse', {
            'type': err?.data?.type,
            'message': err?.data?.message
        })
    })
}

</script>
<template>
    <mp-modal modalId="project-modal">
        <template #modal-header>
            <h4 v-if="modalType == 'add'">Add project modal</h4>
            <h4 v-else-if="modalType == 'edit'">Edit project modal</h4>
            <h4 v-else-if="modalType == 'remove'">Remove project modal</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </template>
        <template #modal-body>
            <template v-if="modalType == 'remove'"> 
                <div class="row-element">
                    Are you sure want to delete?
                </div>
            </template>
            <template v-else>
                <form>
                    <div class="row-element">
                        <div class="w-50">
                            <label for="project-name">Project name</label>
                        </div>
                        <div class="w-50">
                            <input type="text" class="form-input" id="project-name" v-model="project.name" placeholder="Eneter project name" />
                        </div>
                    </div>
                    <div class="row-element">
                        <div class="w-50">
                            <label for="project-url">Project URL</label>
                        </div>
                        <div class="w-50">
                            <input type="text" class="form-input" id="project-url" v-model="project.url" placeholder="Eneter project URL" />
                        </div>
                    </div>
                    <div class="row-element">
                        <div class="w-50">
                            <label for="project-image">Project Image</label>
                        </div>
                        <div class="w-50 image-upload-conatiner">
                            <div v-if="project && project.image && project.image.length" class="logo-image-conatiner">
                                <font-awesome-icon icon="fa-solid fa-x" @click="deleteImage()" />
                                <img :src="`storage/${project.image}`">
                            </div>
                            <input v-else type="file" class="form-input" id="project-image" placeholder="Eneter project file" @change="uploadImage($event)">
                        </div>
                    </div>
                </form>
            </template>
        </template>
        <template #modal-footer>
            <button type="button" class="btn btn-secondary close" data-bs-dismiss="modal" aria-label="Close">
                Close
            </button>
            <button class="btn" :class="modalType === 'remove' ? 'btn-danger' : 'btn-primary'" @click="handleSubmit">
                {{ modalType === 'add' ? 'Create' : modalType === 'edit' ? 'Update' : 'Delete' }}
            </button>
        </template>
    </mp-modal>
</template>

<style lang="scss">
</style>