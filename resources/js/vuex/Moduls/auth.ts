import type { AuthState, AuthGetter, AuthMutation, AuthAction } from '../../types/auth'
import { Module } from 'vuex'
import type { RootState } from '../index'
import { AxiosError } from 'axios';
import axios from '../../axios'; 

interface ErrorResponse {
    type: string;
    message: string;
    // Add other fields if needed
} 

const state: AuthState = {
    auth: {
        login: '',
        password: ''
    },
    user: {
        id: 0,
        name: '',
        email: '',
        password: ''
    },
    accessToken: localStorage.getItem('access_token'),
    authUser: localStorage.getItem('auth_user')
    ? JSON.parse(localStorage.getItem('auth_user') as string)
    : null
}

const getters: AuthGetter = {
    authGetter: (state) => state.auth,
    accessTokenGetter: (state) => state.accessToken,
    authUserGetter: (state) => state.authUser
}

const mutations: AuthMutation = {
    authSetter: (state, data) => state.auth = data,
    accessTokenSetter: (state, data) => state.accessToken = data,
    authUserSetter: (state, data) => state.authUser = data
}

const actions: AuthAction = {
    async login(context, data) {
        try {
            const res = await axios.post('/login', data);
            
            if(res && res.data && res.data.success) {
                localStorage.setItem('access_token', res.data.token);
                localStorage.setItem('auth_user', JSON.stringify(res.data.authUser));
                axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

                context.commit('accessTokenSetter', res.data.token);
                context.commit('authUserSetter', res.data.authUser);
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
            
            throw err;
        }
    },
    async getAuthUser(context) {
         try {
            const res = await axios.get('/check-auth')
            return res
         } catch(err) {
            const axiosError = err as AxiosError;
            const errorData = axiosError.response?.data as ErrorResponse;
            const errorStatus = axiosError.response?.status;
            // if(errorData) {
            //     context.dispatch('alert/alertResponse', {
            //         'type': errorData.type,
            //         'status': errorStatus,
            //         'message': errorData.message
            //     }, { root:true })
            // }

            throw err
        }
    },
    async saveUserChanges(context, data) {
        try {
            const res =  axios.put(`/change-current-user-data/${data.id}`, data)

            return res
        } catch(err) {
            const axiosError = err as AxiosError;
            const errorData = axiosError.response?.data as ErrorResponse;
            const errorStatus = axiosError.response?.status;
            // if(errorData) {
            //     context.dispatch('alert/alertResponse', {
            //         'type': errorData.type,
            //         'status': errorStatus,
            //         'message': errorData.message
            //     }, { root:true })
            // }

            throw err
        }
    },
    async createNewUser(context, data) {
        try {
            const res =  axios.post(`/create-user`, data)

            return res
        } catch(err) {
            const axiosError = err as AxiosError;
            const errorData = axiosError.response?.data as ErrorResponse;
            const errorStatus = axiosError.response?.status;
            // if(errorData) {
            //     context.dispatch('alert/alertResponse', {
            //         'type': errorData.type,
            //         'status': errorStatus,
            //         'message': errorData.message
            //     }, { root:true })
            // }

            throw err
        }
    },
    async logOut(context) {
        try {
            const res = await axios.post('/logout')

            if(res && res.data && res.data.success) {
                context.commit('accessTokenSetter', '')
                context.commit('authUserSetter', '')
                localStorage.removeItem('access_token');
                localStorage.removeItem('auth_user')
            }

        } catch(err) {
            const axiosError = err as AxiosError;
            const errorData = axiosError.response?.data as ErrorResponse;
            const errorStatus = axiosError.response?.status;
            // if(errorData) {
            //     context.dispatch('alert/alertResponse', {
            //         'type': errorData.type,
            //         'status': errorStatus,
            //         'message': errorData.message
            //     }, { root:true })
            // }

            throw err
        }
    }
}

const auth: Module<AuthState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

export default auth