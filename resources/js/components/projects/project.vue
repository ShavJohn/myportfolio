<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import EditRemoveElement from "../main/edit-remove-element.vue";
import { useStore } from "vuex";
import { Project } from "../../types/project";

const imagePrefix =  window.imagePrefix

const emit = defineEmits<{
    ( e: 'changeModalType', value: string ): void
}>()

interface Props {
    project?: Project; // Optional prop with default value
}


const props = withDefaults(defineProps<Props>(), {
    project: () => ({
        id: null,
        name: '',
        url: '',
        image: ''
    }),
});

const store = useStore<any>()

const authUser = computed(() => store.getters['auth/authUserGetter'])
const image = ref<HTMLElement | null>(null);
const container = ref<HTMLElement | null>(null);
const text = ref<HTMLElement | null>(null);

function handleMouseMove(event: MouseEvent) {
    if (!image.value || !container.value || !text.value) return;

    const { left, top, width, height } = container.value.getBoundingClientRect();

    // Normalize mouse position (-1 to 1)
    const x = (event.clientX - left - width / 2) / (width / 2);
    const y = (event.clientY - top - height / 2) / (height / 2);

    // Invert rotation so it tilts towards the cursor
    const rotateX = y * 10; // Moves up/down naturally
    const rotateY = x * -10;  // Moves left/right naturally

    // Apply the transform and shadow to the image
    image.value.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1)`;

    image.value.style.boxShadow = `${-rotateY * 4}px ${rotateX * 4}px 10px rgba(0, 0, 0, 0.1),
                                 ${-rotateY * 6}px ${rotateX * 6}px 20px rgba(0, 0, 0, 0.1)`; // Enhanced shadow

    // Apply the transform to the text to match the image's 3D perspective
    text.value.style.transform = `translateZ(100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

function resetTransform() {
    if (image.value) {
        image.value.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    }
    if (text.value) {
        text.value.style.transform = "translateZ(0) rotateX(0deg) rotateY(0deg)"; // Reset text transform
    }
}

onMounted(() => {

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, {
        threshold: 0.6, // Trigger when 20% of the element is visible
    });

    if (container.value) {
        observer.observe(container.value);
    }
});

function openEditRemoveModal(type: string) {
    store.commit('project/projectSetter', props.project)
    emit('changeModalType', type)
}

</script>


<template>
    <div class="image-container actions-btn-container" ref="container" @mousemove="handleMouseMove" @mouseleave="resetTransform">
        <edit-remove-element v-if="authUser">
            <template #buttons>
                <button class="action-btn" @click="openEditRemoveModal('edit')" type="button" data-bs-toggle="modal" data-bs-target="#project-modal"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></button>
                <button class="action-btn" @click="openEditRemoveModal('remove')" type="button" data-bs-toggle="modal" data-bs-target="#project-modal"><font-awesome-icon icon="fa-solid fa-x" /></button>
            </template>
        </edit-remove-element>
        <img ref="image" :src="`${imagePrefix}/${project.image}`" alt="3D Hover Effect" class="hover-image" />
        <div ref="text" class="image-text-hover-effect">{{ project.name }}</div>
    </div>
</template>

<style scoped>

</style>
