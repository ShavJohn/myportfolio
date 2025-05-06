import { SettingsState, SettingsGetter, SettingsMutation, SettingsAction } from "../../types/settings";
import { RootState, } from "..";
import { Module } from "vuex";
import axiosInstance from '../../axios'
import axios from 'axios';

interface ErrorResponse {
    type: string;
    message: string;
} 

const state: SettingsState = {
    setting: {
        key: '',
        value: '',
        json_value: null,
        setting_type: null
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
            const res = await axiosInstance.post('/upload-logo', data, config)

            if(res && res.data.success) {
                context.dispatch('getSettings')
            }
            return res
        } catch(err) {
            if (axios.isAxiosError(err)) {
                const errorData = err.response?.data as ErrorResponse;
                const errorStatus = err.response?.status;
        
                if (errorData) {
                    context.dispatch('alert/alertResponse', {
                        type: errorData.type,
                        status: errorStatus,
                        message: errorData.message
                    }, { root: true });
                }
            } else {
                context.dispatch('alert/alertResponse', {
                    type: "error",
                    message: "An unexpected error occurred."
                }, { root: true });
            }
            
            throw err;
        }
    },
    async logoDelete(context, data) {
        try {
            const dotIndex = data.lastIndexOf('.');
            const imageName = data.substring(0, dotIndex);

            const res = await axiosInstance.delete(`/delete-logo/${imageName}`)
            if(res && res.data.success) {
                context.dispatch('getSettings')
            }
            return res
        } catch(err) {
            if (axios.isAxiosError(err)) {
                const errorData = err.response?.data as ErrorResponse;
                const errorStatus = err.response?.status;
        
                if (errorData) {
                    context.dispatch('alert/alertResponse', {
                        type: errorData.type,
                        status: errorStatus,
                        message: errorData.message
                    }, { root: true });
                }
            } else {
                context.dispatch('alert/alertResponse', {
                    type: "error",
                    message: "An unexpected error occurred."
                }, { root: true });
            }
            
            throw err;
        }
    },
    async getSettings(context) {
        try {
            const res = await axiosInstance.get('/get-settings')
            if(res && res.data.success) {
                context.commit('settingsMuation', res.data.settings)
            }
            return res
        } catch(err) {
            if (axios.isAxiosError(err)) {
                const errorData = err.response?.data as ErrorResponse;
                const errorStatus = err.response?.status;
        
                if (errorData) {
                    context.dispatch('alert/alertResponse', {
                        type: errorData.type,
                        status: errorStatus,
                        message: errorData.message
                    }, { root: true });
                }
            } else {
                context.dispatch('alert/alertResponse', {
                    type: "error",
                    message: "An unexpected error occurred."
                }, { root: true });
            }
            
            throw err;
        }
    },
    async crateOrUpdateSetting(context, data) {
        try {
            const res = await axiosInstance.put('/update-or-create', data);

            if(res && res.data.success) {
                context.dispatch('getSettings')
            }

            return res
        } catch(err) {
            if (axios.isAxiosError(err)) {
                const errorData = err.response?.data as ErrorResponse;
                const errorStatus = err.response?.status;
        
                if (errorData) {
                    context.dispatch('alert/alertResponse', {
                        type: errorData.type,
                        status: errorStatus,
                        message: errorData.message
                    }, { root: true });
                }
            } else {
                context.dispatch('alert/alertResponse', {
                    type: "error",
                    message: "An unexpected error occurred."
                }, { root: true });
            }
            
            throw err;
        }
    },
    async deleteSetting(context, data) {
        try {
            const res = await axiosInstance.delete(`delete-setting/${data}`);

            if(res && res.data.success) {
                context.dispatch('getSettings')
            }

            return res
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const errorData = err.response?.data as ErrorResponse;
                const errorStatus = err.response?.status;
        
                if (errorData) {
                    context.dispatch('alert/alertResponse', {
                        type: errorData.type,
                        status: errorStatus,
                        message: errorData.message
                    }, { root: true });
                }
            } else {
                context.dispatch('alert/alertResponse', {
                    type: "error",
                    message: "An unexpected error occurred."
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