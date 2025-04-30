<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useStore } from 'vuex';
import { Email } from '../../../types/email';
import moment from 'moment';

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

const store = useStore<any>();

const selectedMessage = computed(() => store.getters['emails/selectedMessageGetter'])

const replyData = reactive({
    title: '',
    message: ''
})

function toggleMessages(message: Email, type: string, key: number) {
    store.commit('emails/selectedMessageSetter', message)
    store.commit('emails/displayTabSetter', type)
    store.commit('emails/currentKeySetter', key)
}

function formatDate(date: any) {
    return moment(date).format('MM/DD/YYYY hh:mm')
}

function reply() {
    let data = {
        messageSelected: selectedMessage.value,
        replyData: replyData
    }

    store.commit('emails/updateEmailData', data.replyData)

    store.dispatch('emails/replyToMessage', data).then(res => {
        store.dispatch('alert/alertResponse', {
            'type': res?.data?.type,
            'message': res?.data?.message
        })
    }).catch(err => {
        store.dispatch('alert/alertResponse', {
            'type': err?.data?.type,
            'message': err?.data?.message
        })
    })
}

</script>

<template>
    <div class="email-content-inner-container">
        <div v-if="!Object.keys(selectedMessage).length" class="no-message-view-inner-container">
            <span>No message selected</span>
        </div>
        <div v-else class="email-content-inner">
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
                <template v-if="selectedMessage.reply">
                    <div class="message-section">
                        <h4>Your Reply</h4>
                        <div class="mail-from-container">
                            <span>Subject of mail </span>
                            <span>{{ selectedMessage.reply.title }}</span>
                        </div>
                        <p>
                            {{ selectedMessage.reply.message }}
                        </p>
                    </div>
                </template>
                <template v-else>
                    <input type="text" name="mail-subject" placeholder="Enter email subject" v-model="replyData.title">
                    <textarea v-model="replyData.message" placeholder="Write your reply..."></textarea>
                    <div class="reply-actions">
                        <button  @click="reply()">Reply</button>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>