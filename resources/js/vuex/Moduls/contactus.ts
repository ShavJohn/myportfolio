import type { ContactusState, ContactusGetter, ContactusMutation, ContactusAction } from '../../types/contactus'
import { Module } from 'vuex'
import type { RootState } from '../index'

const state: ContactusState = {
    contactus: {
        id: 0,
        name: '',
        email: '',
        message: '',
    },
    contactusArr: []
}

const getters: ContactusGetter = {
    contactusGetter(state) {
        return state.contactus
    },
    contactusArrGetter(state) {
        return state.contactusArr
    }
}

const mutations: ContactusMutation = {
    contactusSetter(state, data) {
        state.contactus = data
    },
    contactusArrSetter(state, data) {
        state.contactusArr.push(data)
    }
}

const actions: ContactusAction = {

}

const contactus: Module<ContactusState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
} 

export default contactus