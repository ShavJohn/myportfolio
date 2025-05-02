import type { PositionState, PositionGetter, PositionSetter, PositionActions, Position } from "../../types/position"
import { Module } from 'vuex'
import type { RootState } from '../index'
import  axiosInstance  from "../../axios";
import axios from 'axios';

interface ErrorResponse {
    message: string;
    errors?: Record<string, string[]>;
    type?: string;
}

const state: PositionState = {
    position: {
        id: 0,
        title: '',
        description: '',
        company: '',
        startDate: '',
        endDate: '',
        tillNow: false,
        type: 'work'
    },
    positionsArray: []
}

const getters: PositionGetter = {
    positionGetter(state) {
        return state.position
    },
    positionsArrayGetter(state) {
        return state.positionsArray
    }
}

const mutations: PositionSetter = {
    positionSetter: (state, data) => state.position = data,
    positionsArraySetter: (state, data) => state.positionsArray.push(data),
    setAllPositions: (state, data) => state.positionsArray = data,
    removePosition: (state, id) => {
        state.positionsArray = state.positionsArray.filter(pos => pos.id !== id);
    },
    updatePosition: (state, updated) => {
        const index = state.positionsArray.findIndex(pos => pos.id === updated.id);
        if (index !== -1) {
            state.positionsArray[index] = updated;
        }
    }
}

const actions: PositionActions = {
    async storePosition({ dispatch }, data) {
        try {
            const res = await axiosInstance.post('/experience-store', data);

            if (res && res.data && res.data.success) {
                dispatch('getPositions');
            }

            console.log(res, res.data)

            dispatch('alert/alertResponse', {
                type: res.data.type,
                status: res.data.success,
                message: res.data.message
            }, { root: true });

            return res;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const errorData = err.response?.data as ErrorResponse;
                const errorStatus = err.response?.status;
        
                if (errorData) {
                    dispatch('alert/alertResponse', {
                        type: errorData.type,
                        status: errorStatus,
                        message: errorData.message
                    }, { root: true });
                }
            } else {
                dispatch('alert/alertResponse', {
                    type: "error",
                    message: err
                }, { root: true });
            }
        

            throw err;
        }
    },

    async getPositions({ commit, dispatch }) {
        try {
            const res = await axiosInstance.get('/get-all-experinece');

            if (res && res.data && res.data.success) {
                commit('setAllPositions', res.data.data); // assuming `data` contains the array
            }

            return res;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const errorData = err.response?.data as ErrorResponse;
                const errorStatus = err.response?.status;
        
                if (errorData) {
                    dispatch('alert/alertResponse', {
                        type: errorData.type,
                        status: errorStatus,
                        message: errorData.message
                    }, { root: true });
                }
            } else {
                dispatch('alert/alertResponse', {
                    type: "error",
                    message: err
                }, { root: true });
            }

            throw err;
        }
    },

    async updatePosition({ dispatch }, data: Position) {
        try {
            const res = await axiosInstance.put(`/experience/${data.id}`, data);

            if (res && res.data && res.data.success) {
                dispatch('getPositions');
            }

            dispatch('alert/alertResponse', {
                type: res.data.type,
                status: res.data.success,
                message: res.data.message
            }, { root: true });

            return res;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const errorData = err.response?.data as ErrorResponse;
                const errorStatus = err.response?.status;
        
                if (errorData) {
                    dispatch('alert/alertResponse', {
                        type: errorData.type,
                        status: errorStatus,
                        message: errorData.message
                    }, { root: true });
                }
            } else {
                dispatch('alert/alertResponse', {
                    type: "error",
                    message: err
                }, { root: true });
            }

            throw err;
        }
    },

    async deletePosition({ dispatch }, id: number) {
        try {
            const res = await axiosInstance.delete(`/experience/${id}`);

            if (res && res.data && res.data.success) {
                dispatch('getPositions');
            }

            dispatch('alert/alertResponse', {
                type: res.data.type,
                status: res.data.success,
                message: res.data.message
            }, { root: true });

            return res;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const errorData = err.response?.data as ErrorResponse;
                const errorStatus = err.response?.status;
        
                if (errorData) {
                    dispatch('alert/alertResponse', {
                        type: errorData.type,
                        status: errorStatus,
                        message: errorData.message
                    }, { root: true });
                }
            } else {
                dispatch('alert/alertResponse', {
                    type: "error",
                    message: err
                }, { root: true });
            }

            throw err;
        }
    }
}

const position: Module<PositionState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

export default position