import { DashboardState, DashboardGetter, DashboardSetter, DashboardActions } from "../../types/dashboard";
import { Module } from 'vuex'
import type { RootState } from '../index'

const state: DashboardState = {
    currentSelected: 'messages'
}

const getters: DashboardGetter = {
    currentSelectedGetter(state) {
        return state.currentSelected
    }
}

const mutations: DashboardSetter = {
    currentSelectedSetter(state, data) {
        state.currentSelected = data
    }
}

const actions: DashboardActions = {

}

const dashboard: Module<DashboardState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

export default dashboard