import { ActionContext } from "vuex";

export interface HomeState {
    skills: Array<string>;
    textAboutMe: string;
    shortAboutMe: string;
}

export interface HomeGetter {
    skillsGetter(state: HomeState): Array<string>;
    textAboutMeGetter(state: HomeState): string;
    shortAboutMeGetter(state: HomeState): string;
}

export interface HomeMutation {
    skillsSetter(state: HomeState, data: string): void;
    textAboutMeSetter(state: HomeState, data: string): void;
    shortAboutMeSetter(state: HomeState, data: string): void;
}

export interface HomeAction {
    skillsAction(context: ActionContext<HomeState, Array<string>>, data: string): Promise<void>;
}

export default {
    namespaced: true,
    state: (): HomeState => ({
        skills: ['developer', 'devops', 'hacker'],
        textAboutMe: 'I\'m developer with this skills',
        shortAboutMe: "I'mexperienced full-stack web developer Web development is my playground where I push boundaries and chase new horizons.I'mexperienced full-stack web developer Web development is my playground where I push boundaries and chase new horizons.",
    }),
    getters: {
        skillsGetter(state) {
            return state.skills
        },
        textAboutMeGetter(state) {
            return state.textAboutMe
        },
        shortAboutMeGetter(state) {
            return state.shortAboutMe
        }
    } as HomeGetter,
    mutations: {
        skillsSetter(state, data) {
            state.skills.push(data)
        },
        textAboutMeSetter(state, data) {
            state.textAboutMe = data
        },
        shortAboutMeSetter(state, data) {
            state.shortAboutMe = data
        }
    } as HomeMutation,
    actions: {
        skillsAction(context, data) {
            return new Promise((resolve, reject) => {
                context.commit('skillsSetter', data)
                resolve()
            })
        }
    } as HomeAction
}
