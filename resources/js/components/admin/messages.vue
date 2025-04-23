<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore<any>();

let messageOpen = ref<boolean>(false)

let current = computed({
    get: () => store.getters['dashboard/currentSelectedGetter'],
    set: () => store.commit('dashboard/currentSelectedSetter')
})
</script>

<template>
    <div class="message-panel-container">
        <div :class="!messageOpen ? 'open' : 'closed'" class="email-list-container">
            <div v-for="i in 10" :key="i" class="email-element" :class="i < 5 ? 'unread' : ''" @click="messageOpen = !messageOpen">
                <div class="sender-name">Jane Doe</div>
                <div class="email-title">Proposal for Partnership 🎉</div>
                <div class="email-snippet">Hi John, Hope this email finds you well...</div>
                <div class="email-date">10 Dec</div>
            </div>
        </div>
        <div :class="messageOpen ? 'open' : 'closed'" class="email-content-container">
            <div class="email-upper-part">
                <div class="email-header">
                    <font-awesome-icon class="back-btn" icon="fa-solid fa-arrow-left" @click="messageOpen = !messageOpen" />
                    <h2>Proposal for Partnership 🎉</h2>
                    <div class="email-meta">
                        <span><strong>Jane Doe</strong> &lt;jane.doe@business.com&gt;</span>
                        <span>To: Richard Brown • 10 Dec 2024 9:00</span>
                    </div>
                </div>

                <div class="email-body">
                    <p>Hi John,</p>
                    <p>
                    Hope this message finds you well! I'm reaching out to explore a potential partnership
                    between our companies...
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
