import type { ProjectState, ProjectGetter, ProjectMutation, ProjectAction } from '../../types/project'
import { Module } from 'vuex'
import type { RootState } from '../index'
import axiosInstance from '../../axios'
import axios from 'axios';

const state: ProjectState = {
    project: {
        id: 0,
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
        state.projects.push(data)
    }
}

const actions: ProjectAction = {

}

const project: Module<ProjectState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
} 

export default project