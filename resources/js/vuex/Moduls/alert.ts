import { Alert, AlertState, AlertGetter, AlertMutation, AlertAction } from "../../types/alert";
import { Module } from 'vuex'
import type { RootState } from '../index'

interface ErrorResponse {
    type: string;
    message: string;
    // Add other fields if needed
}

const emptyAlert: Alert = {
    status: '',
    type: '',
    message: ''
  }

const state: AlertState = {
    alert: {
        status: '',
        type: '',
        message: ''
    },
    alertOpen: false
}

const getters: AlertGetter = {
    alertGetter(state) {
        return state.alert
    },
    alertOpenGetter(state) {
        return state.alertOpen
    },
}

const mutations: AlertMutation = {
    alertSetter(state, data: Alert) {
        state.alert = data;
    },
    alertOpenSetter(state, data) {
        state.alertOpen = data
    },
}

let closeTimeout: ReturnType<typeof setTimeout> | null = null;
let resetTimeout: ReturnType<typeof setTimeout> | null = null;

const actions: AlertAction = {
    async alertResponse({ commit }, data: Alert) {
            // Apply the alert
        commit("alertSetter", data);
        commit("alertOpenSetter", true);

        // Clear previous timeouts (if any)
        if (closeTimeout) clearTimeout(closeTimeout);
        if (resetTimeout) clearTimeout(resetTimeout);

        // Auto-close the alert after 5s
        closeTimeout = setTimeout(() => {
        commit("alertOpenSetter", false);

        // Reset the alert content after it's hidden
        resetTimeout = setTimeout(() => {
            commit("alertSetter", emptyAlert);
        }, 1000);
        }, 5000);
    },
}

const alert: Module<AlertState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

export default alert