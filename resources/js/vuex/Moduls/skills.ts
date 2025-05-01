import type { SkillsState, SkillsGetter, SkillsMutation, SkillsAction } from '../../types/skills'
import { Module } from 'vuex'
import type { RootState } from '../index'
import axios from '../../axios'
import { AxiosError } from 'axios';

interface ErrorResponse {
    type: string;
    message: string;
    // Add other fields if needed
} 

// Initial state
const state: SkillsState = {
    skills: [],
    skillsArray: ['Vue', 'Laravel', 'Docker', 'Kubernetes', 'TailwindCSS']
}

// Getters
const getters: SkillsGetter = {
    skillsGetter: (state) => state.skills,
    skillsArrayGetter: (state) => state.skillsArray
}

// Mutations
const mutations: SkillsMutation = {
    skillSetter: (state, data) => state.skills.push(data),
    skillsSetter: (state, data) => state.skills = data,
    skillsArraySetter: (state, data) => state.skillsArray.push(data)
}

// Actions
const actions: SkillsAction = {
    async stroeSkill(context, data) {
        try {
            const res = await axios.post('/store-skill', data)

            if(res && res.data && res.data.success) {
                context.dispatch('getSkill')
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
    async getSkills(context) {
        try {
            const res = await axios.get('/get-skills')

            if(res && res.data && res.data.success) {
                context.commit('skillsSetter', res.data.skills)
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
    async removeSkill(context, data) {
        try {
            const res = await axios.delete(`/remove-skill/${data.id}`)

            if(res && res.data && res.data.success) {
                context.dispatch('getSkills')
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
    }
}

// Vuex Module
const skill: Module<SkillsState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

export default skill