import type { AboutMeState, AboutMeGetter, AboutMeSetter, AboutMeActions } from "../../types/aboutme"
import { Module } from 'vuex'
import type { RootState } from '../index'

const state: AboutMeState = {
    position: {
        id: 0,
        title: '',
        desciption: '',
        company: '',
        startDate: '',
        endDate: '',
        tillNow: false
    },
    positionsArray: []
}

const getters: AboutMeGetter = {
    positionGetter(state) {
        return state.position
    },
    positionsArrayGetter(state) {
        return state.positionsArray
    }
}

const mutations: AboutMeSetter = {
    positionSetter(state, data) {
        state.position = data
    },
    positionsArraySetter(state, data) {
        state.positionsArray.push(data)
    }
}

const actions: AboutMeActions = {

}

const aboutme: Module<AboutMeState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

export default aboutme