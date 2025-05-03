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
    myDitailsArray: [
        { key: "name", value: "Your Name" },
        { key: "email", value: "your.email@example.com" }
    ],
}

// Getters
const getters: HomeGetter = {
    myDitailsArrayGetter: (state) => state.myDitailsArray,
}

// Mutations
const mutations: HomeMutation = {
    myDitailsArraySetter: (state, data) => state.myDitailsArray.push(data),
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