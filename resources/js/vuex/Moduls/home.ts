import type { HomeState, HomeGetter, HomeMutation, HomeAction } from '../../types/home'
import { Module } from 'vuex'
import type { RootState } from '../index'

// Initial state
const state: HomeState = {
  skills: ['developer', 'devops', 'hacker'],
  textAboutMe: "I'm developer with this skills",
  shortAboutMe: "I'm an experienced full-stack web developer...",
  myDitailsArray: [
    { id: 0, key: "name", value: "Your Name" },
    { id: 1, key: "email", value: "your.email@example.com" }
  ],
  educationArray: [
    { id: 0, starDate: "2023", endDate: "2025", inputText: "Full-stack Developer at Company XYZ", tillNow: false },
    { id: 1, starDate: "2023", endDate: "2025", inputText: "Software Engineer at ABC Corp", tillNow: false }
  ],
  workArray: [
    { id: 2, starDate: "2023", endDate: "2025", inputText: "Full-stack Developer at Company XYZ", tillNow: false },
    { id: 3, starDate: "2023", endDate: "2025", inputText: "Software Engineer at ABC Corp", tillNow: false }
  ],
  skillsArray: ['Vue', 'Laravel', 'Docker', 'Kubernetes', 'TailwindCSS']
}

// Getters
const getters: HomeGetter = {
  skillsGetter: (state) => state.skills,
  textAboutMeGetter: (state) => state.textAboutMe,
  shortAboutMeGetter: (state) => state.shortAboutMe,
  myDitailsArrayGetter: (state) => state.myDitailsArray,
  educationArrayGetter: (state) => state.educationArray,
  workArrayGetter: (state) => state.workArray,
  skillsArrayGetter: (state) => state.skillsArray
}

// Mutations
const mutations: HomeMutation = {
  skillsSetter: (state, data: string) => state.skills.push(data),
  textAboutMeSetter: (state, data: string) => state.textAboutMe = data,
  shortAboutMeSetter: (state, data: string) => state.shortAboutMe = data,
  myDitailsArraySetter: (state, data) => state.myDitailsArray.push(data),
  educationArraySetter: (state, data) => state.educationArray.push(data),
  workArraySetter: (state, data) => state.workArray.push(data),
  skillsArraySetter: (state, data: string) => state.skillsArray.push(data)
}

// Actions
const actions: HomeAction = {
  skillsAction({ commit }, data: string) {
    return new Promise<void>((resolve) => {
      commit('skillsSetter', data)
      resolve()
    })
  }
}

// Vuex Module
const home: Module<HomeState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default home