import type { StatisticsState, StatisticsGetter, StatisticsMutation, StatisticsAction } from "../../types/statistics";
import { Module } from "vuex";
import { RootState } from "../index";
import { AxiosError } from 'axios';
import axios from '../../axios'; 

interface ErrorResponse {
    type: string;
    message: string;
    // Add other fields if needed
} 

const state: StatisticsState = {
    visitors: {},
    visitorsCount: 0,
    pageReloads: {},
    pageReloadsCount: 0
}

const getters: StatisticsGetter = {
    visitorsGetter(state) {
        return state.visitors
    },
    visitorsCountGetter(state) {
        return state.visitorsCount
    },
    pageReloadsGetter(state) {
        return state.pageReloads
    },
    pageReloadsCountGetter(state) {
        return state.pageReloadsCount
    }
}

const mutations: StatisticsMutation = {
    visitorsSetter(state, data) {
        state.visitors = data
    },
    visitorsCountSetter(state, data) {
        state.visitorsCount = data
    },
    pageReloadsSetter(state, data) {
        state.pageReloads = data
    },
    pageReloadsCountSetter(state, data) {
        state.pageReloadsCount = data
    },
}

const actions: StatisticsAction = {
    async countVisitor(context, data) {
        try {
            const res = await axios.post('/count-visitor', data)

            return res;
        } catch(err) {
            const axiosError = err as AxiosError;
            const errorData = axiosError.response?.data as ErrorResponse;
            const errorStatus = axiosError.response?.status;

            // if (errorData) {
            //     context.dispatch('alert/alertResponse', {
            //         type: errorData.type,
            //         status: errorStatus,
            //         message: errorData.message
            //     }, { root: true });
            // }

            throw err
        }
    },
    async getStatistics(context, data) {
        try {
            const res = await axios.get('/get-statistics-data', {params: data})

            if(res && res.data) {
                context.commit('visitorsSetter', res.data.visitors)
                context.commit('visitorsCountSetter', res.data.visitorsCount)
                context.commit('pageReloadsSetter', res.data.pageReloads)
                context.commit('pageReloadsCountSetter', res.data.pageReloadsCount)
            }

            return res
        } catch(err) {
            const axiosError = err as AxiosError;
            const errorData = axiosError.response?.data as ErrorResponse;
            const errorStatus = axiosError.response?.status;

            // if (errorData) {
            //     context.dispatch('alert/alertResponse', {
            //         type: errorData.type,
            //         status: errorStatus,
            //         message: errorData.message
            //     }, { root: true });
            // }

            throw err
        }
    }
}

const statistics: Module<StatisticsState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

export default statistics