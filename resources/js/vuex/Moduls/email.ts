import { EmailState, EmailGetter, EmailMutation, EmailAction } from "../../types/email";
import type { RootState } from "..";
import { Module } from "vuex";
import  axios  from "../../axios";
import { AxiosError } from 'axios';

interface ErrorResponse {
    type: string;
    message: string;
    // Add other fields if needed
} 

const state: EmailState = {
    contactMeMessages: [],
    selectedMessage: {},
    displayTab: 'messages-list',
    currentKey: 0,
    dataFinished: false,
    unreadEmails: 0,
}

const getters: EmailGetter = {
    contactMeMessagesGetter(state) {
        return state.contactMeMessages
    },
    selectedMessageGetter(state) {
        return state.selectedMessage
    },
    displayTabGetter(state) {
        return state.displayTab
    },
    currentKeyGetter(state) {
        return state.currentKey
    },
    dataFinishedGetter(state) {
        return state.dataFinished
    },
    unreadEmailsGetter(state) {
        return state.unreadEmails
    },
}

const mutations: EmailMutation = {
    contactMeMessagesSetter(state, data) {
        state.contactMeMessages = data
    },
    selectedMessageSetter(state, data) {
        state.selectedMessage = data
    },
    displayTabSetter(state, data) {
        state.displayTab = data
    },
    currentKeySetter(state, data) {
        state.currentKey = data
    },
    dataFinishedSetter(state, data) {
        state.dataFinished = data
    },
    unreadEmailsSetter(state, data) {
        state.unreadEmails = data
    },
    updateEmailData(state, data) {
        state.contactMeMessages[state.currentKey].reply = data
    },
    markMessageAsRead(state, data) {
        state.contactMeMessages[data].read = true;
        --state.unreadEmails
    }
}

const actions: EmailAction = {
    async sendMessage(context, data) {
        try {
            const res = await axios.post('/send-message', data)

            return res
        } catch(err) {
            const axiosError = err as AxiosError;
            const errorData = axiosError.response?.data as ErrorResponse;
            const errorStatus = axiosError.response?.status;

            if (errorData) {
                context.dispatch('alert/alertResponse', {
                    type: errorData.type,
                    status: errorStatus,
                    message: errorData.message
                }, { root: true });
            }
            
            throw err;
        }
    },
    async updateEmailStatus(context, data) {
        try {
            const res = await  axios.put(`/update-message-status/${data.id}`)
            if(res && res.data) {
                context.commit('markMessageAsRead', data.key)
            }
            return res
        } catch(err) {
            const axiosError = err as AxiosError;
            const errorData = axiosError.response?.data as ErrorResponse;
            const errorStatus = axiosError.response?.status;

            if (errorData) {
                context.dispatch('alert/alertResponse', {
                    type: errorData.type,
                    status: errorStatus,
                    message: errorData.message
                }, { root: true });
            }
            
            throw err;
        }
    },
    async getContactMessages(context, data) {
        try {
            const res = await axios.get('/get-messages', {
                params: {
                    skip: data.skip,
                    take: data.take
                }
            })

            if(!res.data.messages.length) {
                context.commit('dataFinishedSetter', true)
            }

           if(res && res.data) {
               context.commit('contactMeMessagesSetter', res.data.messages)
               context.commit('unreadEmailsSetter', res.data)
           }
            return res
        } catch(err) {
            const axiosError = err as AxiosError;
            const errorData = axiosError.response?.data as ErrorResponse;
            const errorStatus = axiosError.response?.status;

            if (errorData) {
                context.dispatch('alert/alertResponse', {
                    type: errorData.type,
                    status: errorStatus,
                    message: errorData.message
                }, { root: true });
            }
            
            throw err;
        }
    },
    async replyToMessage(context, data) {
        try {
            const res = await  axios.post('/reply-to-message', data)

            return res
        } catch(err) {
            console.log(err, 564654564)
            const axiosError = err as AxiosError;
            const errorData = axiosError.response?.data as ErrorResponse;
            const errorStatus = axiosError.response?.status;

            if (errorData) {
                context.dispatch('alert/alertResponse', {
                    type: errorData.type,
                    status: errorStatus,
                    message: errorData.message
                }, { root: true });
            }
            
            throw err;
        }
    }
}

const emails: Module<EmailState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

export default emails

