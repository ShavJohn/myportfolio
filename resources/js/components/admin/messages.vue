<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useStore } from 'vuex';
import moment from 'moment';
import { Email } from '../../types/email';

const store = useStore<any>();

const emailListContainer = ref<HTMLElement | null>(null);

const messages = computed(() => store.getters['emails/contactMeMessagesGetter'])
const selectedMessage = computed(() => store.getters['emails/selectedMessageGetter'])
const displayTab = computed({
    get: () => store.getters['emails/displayTabGetter'],
    set: (val) =>  store.commit('emails/displayTabSetter', val)
})
const dataFinished = computed(() => store.getters['emails/dataFinishedGetter'])
const skip = ref(0)
const take = ref(10)
const replyData = reactive({
    title: '',
    message: ''
})
const email: Email = reactive({
    id: 0,
    name: '',
    email: '',
    message: '',
    phone_number: 0,
    read: false,
    reply: {
        title: '',
        message: ''
    }
})

function getEmails(skip = 0, take = 10) {
    let data = {
        skip: skip,
        take: take
    }
    store.dispatch('emails/getContactMessages', data)
}

function toggleMessages(message: Email, type: string, key: number) {
    store.commit('emails/selectedMessageSetter', message)
    store.commit('emails/displayTabSetter', type)
    store.commit('emails/currentKeySetter', key)
}

function formatDate(date: any) {
    return moment(date).format('MM/DD/YYYY hh:mm')
}

function updateEmailStatus(message: Email, key: number) {
    if(!message.read) {
        let data = {
            key: key,
            id: message.id
        }

        store.dispatch('emails/updateEmailStatus', data)
    }
}

function bringMoreData($event: any) {
    let elem = $event.target
    let scrollBottom  = elem.scrollHeight - elem.clientHeight - elem.scrollTop

    if(scrollBottom < 40) {
        skip.value += 10
        take.value += 10

        getEmails(skip.value, take.value)
    }
}

watch(dataFinished, (val) => {
    if(val === true) {
        if(emailListContainer.value) {
            emailListContainer.value.addEventListener('scroll', bringMoreData);
        }
    }
})

onMounted(() => {
    getEmails(skip.value, take.value)
    if (emailListContainer.value) {
        emailListContainer.value.addEventListener('scroll', bringMoreData);
    }
})

</script>

<template>
    <div class="message-panel-container">
        <div ref="emailListContainer" :class="displayTab === 'messages-list' ? 'open' : 'closed'" class="email-list-container">
            <div v-for="(message, key) in messages" :key="key" class="email-element" 
            :class="!message.read ? 'unread' : ''" 
            @click="toggleMessages(message, 'message-content', key)">
                <div class="sender-name">{{ message.name }}</div>
                <div class="email-title">Message from client</div>
                <div class="email-snippet">{{  message.message  }}</div>
                <div class="email-date">{{ formatDate(message.created) }}</div>
            </div>
        </div>
        <div :class="displayTab === 'message-content' ? 'open' : 'closed'" class="email-content-container">
            <div class="email-upper-part">
                <div class="email-header">
                    <font-awesome-icon class="back-btn" icon="fa-solid fa-arrow-left" @click="toggleMessages(email, 'messages-list', 0)" />
                    <h2>Message from client</h2>
                    <div class="email-meta">
                        <span><strong>{{  selectedMessage.name  }}</strong> &lt;{{ selectedMessage.email }}&gt;</span>
                        <span>To: ShavJohn • {{ formatDate(selectedMessage.created) }}</span>
                    </div>
                </div>

                <div class="email-body">
                    <p>
                        {{ selectedMessage.message }}
                    </p>
                </div>
            </div>

            <div class="email-reply-box">
                <textarea placeholder="Write your reply..."></textarea>
                <div class="reply-actions">
                <button>Send Now</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
