import { SettingsState, SettingsGetter, SettingsMutation, SettingsAction } from "../../types/settings";
import { RootState, } from "..";
import { Module } from "vuex";
import axios from "../../axios";
import { AxiosError } from "axios";

interface ErrorResponse {
    type: string;
    message: string;
} 

const state: SettingsState = {
    setting: {
        key: '',
        value: '',
        json_value: null
    },
    settings: [],
}

const getters: SettingsGetter = {
    settingGetter(state) {
        return state.setting
    },
    settingsGetter(state) {
        return state.settings
    },
}

const mutations: SettingsMutation = {
    settingMuattion(state, data) {
        state.setting = data
    },
    settingsMuation(state, data) {
        state.settings = data
    },
}

const actions: SettingsAction = {
    async logoUpload(context, data) {
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        try {
            const res = await axios.post('/upload-logo', data, config)

            if(res && res.data.success) {
                context.dispatch('getSettings')
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
    async logoDelete(context, data) {
        try {
            const dotIndex = data.lastIndexOf('.');
            const imageName = data.substring(0, dotIndex);

            const res = await axios.delete(`/delete-logo/${imageName}`)
            if(res && res.data.success) {
                context.dispatch('getSettings')
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
    async getSettings(context) {
        try {
            const res = await axios.get('/get-settings')
            if(res && res.data.success) {
                context.commit('settingsMuation', res.data.settings)
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

const settings: Module<SettingsState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

export default settings