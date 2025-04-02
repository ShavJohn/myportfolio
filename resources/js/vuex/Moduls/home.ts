import { ActionContext } from "vuex";

export interface DitailsEntry {
    key: string,
    value: string
}

export interface Entry {
    inputText: string;
    starDate: string;
    endDate: string;
    tillNow: boolean;
  }

export interface HomeState {
    skills: Array<string>;
    textAboutMe: string;
    shortAboutMe: string;
    myDitailsArray: DitailsEntry[];
    educationArray: Entry[];
    workArray: Entry[];
    skillsArray: string[]
}

export interface HomeGetter {
    skillsGetter(state: HomeState): Array<string>;
    textAboutMeGetter(state: HomeState): string;
    shortAboutMeGetter(state: HomeState): string;
    myDitailsArrayGetter(state: HomeState): DitailsEntry[];
    educationArrayGetter(state: HomeState): Entry[];
    workArrayGetter(state: HomeState): Entry[];
    skillsArrayGetter(state: HomeState): string[];
}

export interface HomeMutation {
    skillsSetter(state: HomeState, data: string): void;
    textAboutMeSetter(state: HomeState, data: string): void;
    shortAboutMeSetter(state: HomeState, data: string): void;
    myDitailsArraySetter(state: HomeState, data: DitailsEntry): DitailsEntry[];
    educationArraySetter(state: HomeState, data: Entry): Entry[];
    workArraySetter(state: HomeState, data: Entry): Entry[];
    skillsArraySetter(state: HomeState, data: string): string[];
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
        myDitailsArray: [{ key: "name", value: "Your Name" },
            { key: "email", value: "your.email@example.com" }],
        educationArray: [{ starDate: "2023", endDate: "2025", inputText: "Full-stack Developer at Company XYZ", tillNow: false },
            { starDate: "2023", endDate: "2025", inputText: "Software Engineer at ABC Corp", tillNow: false }],
        workArray: [{ starDate: "2023", endDate: "2025", inputText: "Full-stack Developer at Company XYZ", tillNow: false },
            { starDate: "2023", endDate: "2025", inputText: "Software Engineer at ABC Corp", tillNow: false }],
        skillsArray: ['Vue',
                'Laravel',
                'Docker',
                'Kubernetes',
                'TailwindCSS']
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
        },
        myDitailsArrayGetter(state) {
            return state.myDitailsArray
        },
        educationArrayGetter(state) {
            return state.educationArray
        },
        workArrayGetter(state) {
            return state.workArray
        },
        skillsArrayGetter(state) {
            return state.skillsArray
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
        },
        myDitailsArraySetter(state, data) {
            state.myDitailsArray.push(data);
        },
        educationArraySetter(state, data) {
            state.educationArray.push(data);
        },
        workArraySetter(state, data) {
            state.workArray.push(data);
        },
        skillsArraySetter(state, data) {
            state.skillsArray.push(data);
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
