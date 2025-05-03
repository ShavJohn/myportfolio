import type { ProjectState, ProjectGetter, ProjectMutation, ProjectAction, Project } from '../../types/project'
import { Module } from 'vuex'
import type { RootState } from '../index'
import axiosInstance from '../../axios'
import axios from 'axios';

interface ErrorResponse {
    message: string;
    errors?: Record<string, string[]>;
    type?: string;
}

const state: ProjectState = {
    project: {
        id: null,
        name: '',
        url: '',
        image: '',
    },
    projects: []
}

const getters: ProjectGetter = {
    projectGetter(state) {
        return state.project
    },
    projectsGetter(state) {
        return state.projects
    }
}

const mutations: ProjectMutation = {
    projectSetter(state, data) {
        state.project = data
    },
    projectsSetter(state, data) {
        state.projects = data
    }
}

const actions: ProjectAction = {
    async storeProject({ dispatch }, data) {
        try {
            const res = await axiosInstance.post('/create-project', data);

            if (res && res.data && res.data.success) {
                dispatch('getProjects');
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
    async uploadImage({dispatch}, data) {
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        try {
            const res = await axiosInstance.post('/upload-project-image', data, config)

            return res
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
        }
    },
    async deleteImage({dispatch}, data) {
        try {
            const dotIndex = data.lastIndexOf('.');
            const imageName = data.substring(0, dotIndex);

            const res = await axiosInstance.delete(`/delete-prokect-image/${imageName}`)

            return res
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
        }
    },
    async getProjects({ commit, dispatch }) {
        try {
            const res = await axiosInstance.get('/get-projects');

            if (res && res.data && res.data.success) {
                commit('projectsSetter', res.data.projects); // assuming `data` contains the array
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

    async updateProject({ dispatch }, data: Project) {
        try {
            const res = await axiosInstance.put(`/update-project/${data.id}`, data);

            if (res && res.data && res.data.success) {
                dispatch('getProjects');
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

    async deleteProject({ dispatch }, id: number) {
        try {
            const res = await axiosInstance.delete(`/remove-project/${id}`);

            if (res && res.data && res.data.success) {
                dispatch('getProjects');
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

const project: Module<ProjectState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
} 

export default project