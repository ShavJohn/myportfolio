import type { HomeState, HomeGetter, HomeMutation, HomeAction } from '../../types/home'
import { Module } from 'vuex'
import type { RootState } from '../index'
import axiosInstance from '../../axios'
import axios from 'axios';

interface ErrorResponse {
    type: string;
    message: string;
    // Add other fields if needed
} 

// Initial state
const state: HomeState = {
    shortAboutMe: 'Text that is about me and goes here Text that is about me and goes here',
    myDitailsArray: [
        { key: "name", value: "Your Name" },
        { key: "email", value: "your.email@example.com" }
    ],
    educationArray: [
        { starDate: "2023", endDate: "2025", inputText: "Full-stack Developer at Company XYZ", tillNow: false },
        { starDate: "2023", endDate: "2025", inputText: "Software Engineer at ABC Corp", tillNow: false }
    ],
    workArray: [
        { starDate: "2023", endDate: "2025", inputText: "Full-stack Developer at Company XYZ", tillNow: false },
        { starDate: "2023", endDate: "2025", inputText: "Software Engineer at ABC Corp", tillNow: false }
    ]
}

// Getters
const getters: HomeGetter = {
    shortAboutMeGetter: (state) => state.shortAboutMe,
    myDitailsArrayGetter: (state) => state.myDitailsArray,
    educationArrayGetter: (state) => state.educationArray,
    workArrayGetter: (state) => state.workArray,
}

// Mutations
const mutations: HomeMutation = {
    shortAboutMeSetter: (state, data) => state.shortAboutMe = data,
    myDitailsArraySetter: (state, data) => state.myDitailsArray.push(data),
    educationArraySetter: (state, data) => state.educationArray.push(data),
    workArraySetter: (state, data) => state.workArray.push(data),
}

// Actions
const actions: HomeAction = {
    
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