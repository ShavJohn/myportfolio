<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { Setting } from '../../types/settings';

const store = useStore<any>();
const loading = ref(false);

const settings = computed(() => store.getters['settings/settingsGetter'])

const logo = settingByKey('logo');

function settingByKey(key: string) {
    return computed(() => {
        return settings.value?.find((setting: Setting) => setting.key === key) ?? {
            key: '',
            value: '',
            json_value: null
        };
    });
}

const email = reactive({
    name: '',
    email: '',
    phone_number: '',
    message: ''
});

function resetForm() {
    Object.assign(email, {
        name: '',
        email: '',
        phone_number: '',
        message: ''
    });
}

async function sendMessage() {
    const requiredFields = [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'message', label: 'Message' }
    ];

    for (const field of requiredFields) {
        if (!(email as any)[field.key].trim()) {
        return store.dispatch('alert/alertResponse', {
            type: 'error',
            message: `${field.label} field is required`
        });
        }
    }

    try {
        loading.value = true;
        const res = await store.dispatch('emails/sendMessage', email);
        resetForm();

        await store.dispatch('alert/alertResponse', {
        type: res?.data?.type,
        message: res?.data?.message
        });
    } catch (err: any) {
        await store.dispatch('alert/alertResponse', {
        type: err?.data?.type || 'error',
        message: err?.data?.message || 'Something went wrong'
        });
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <div class="contact-me-container">
        <div class="contact-me-inner-container">
            <div class="image-container">
                <img v-if="logo.value" ref="image" :src="`storage/${logo.value}`" alt="3D Hover Effect"  />
            </div>
            <div class="form-container">
                <form  @submit.prevent="sendMessage">
                    <div class="form-input">
                        <label for="your-name">Your Name</label>
                        <input type="text" id="your-name" placeholder="Your Name" v-model="email.name">
                    </div>
                    <div class="form-input">
                        <label for="your-email">Your Email</label>
                        <input type="email" id="your-email" placeholder="Your Email" v-model="email.email">
                    </div>
                    <div class="form-input">
                        <label>Your Message</label>
                        <textarea v-model="email.message"></textarea>
                    </div>
                    <div class="form-input">
                        <button type="submit">Send Message
                            <div v-if="loading" class="spinner-border loader-style" role="status">
                                <span class="sr-only"></span>
                            </div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
