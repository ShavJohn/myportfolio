<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useStore } from 'vuex';
import { Email } from '../../../types/email';
import moment from 'moment';

const store = useStore<any>();

const messages = computed(() => store.getters['emails/contactMeMessagesGetter'])

function toggleMessages(message: Email, type: string, key: number) {
    store.commit('emails/selectedMessageSetter', message)
    store.commit('emails/displayTabSetter', type)
    store.commit('emails/currentKeySetter', key)

    if(!message.read) {
        let data = {
            key: key,
            id: message.id
        }

        store.dispatch('emails/updateEmailStatus', data)
    }
}

function formatDate(date: any) {
    return moment(date).format('MM/DD/YYYY hh:mm')
}

</script>

<template>
    <div v-for="(message, key) in messages" :key="key" class="email-element" 
        :class="!message.read ? 'unread' : ''" 
        @click="toggleMessages(message, 'message-content', key)">
        <div class="sender-name">{{ message.name }}</div>
        <div class="email-title">Message from client</div>
        <div class="email-snippet">{{  message.message  }}</div>
        <div class="email-date">{{ formatDate(message.created) }}</div>
    </div>
</template>