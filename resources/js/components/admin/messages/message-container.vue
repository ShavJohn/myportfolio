<script setup lang="ts">
import MessageContent from './message-content.vue';
import MessageList from './message-list.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore<any>();

const emailListContainer = ref<HTMLElement | null>(null);

const displayTab = computed(() => store.getters['emails/displayTabGetter'])
const dataFinished = computed(() => store.getters['emails/dataFinishedGetter'])

const skip = ref(0)
const take = ref(10)

function getEmails(skip = 0, take = 10) {
    let data = {
        skip: skip,
        take: take
    }
    store.dispatch('emails/getContactMessages', data)
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
            <message-list></message-list>
        </div>
        <div :class="displayTab === 'message-content' ? 'open' : 'closed'" class="email-content-container">
            <message-content></message-content>
        </div>
    </div>
</template>