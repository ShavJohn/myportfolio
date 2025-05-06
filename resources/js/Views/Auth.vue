<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { Setting } from '../types/settings';

const router = useRouter();

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

let imagePrefix = window.imagePrefix
const store = useStore<any>()

const auth = computed({
    get: () => store.getters['auth/authGetter'],
    set: () => store.commit('auth/authSetter')
})

function login(): void {
    let data = {
        email: auth.value.login,
        password: auth.value.password
    }
    store.dispatch('auth/login', data).then((res) => {
        if(res.data.success) {
            router.push({ name: 'Home' })
        }
    })
}

</script>

<template>
    <div class="login-page-container">
        <div class="login-container">
            <div class="image-container">
                <img ref="image" :src="`storage/${logo.value}`" alt="3D Hover Effect"  />
            </div>
            <div class="inputs-container">
                <div class="input-container">
                    <input type="text" placeholder="Enter login" v-model="auth.login">
                </div>
                <div class="input-container">
                    <input type="password" placeholder="Enter password" v-model="auth.password" @keydown.enter="login">
                </div>
                <div class="input-container">
                    <button @click="login">Login</button>
                </div>  
            </div>
        </div>
    </div>
</template>