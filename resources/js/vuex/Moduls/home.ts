import { ActionContext } from "vuex";

export interface HomeState {
    msg: string
}

export interface HomeGetter {
    msgGetter(state: HomeState): string
}

export interface HomeMutation {
    msgSetter(state: HomeState, data: string): void
}

export interface HomeAction {
    msgAction(context: ActionContext<HomeState, any>, data: string): Promise<void>
}

export default {
    namespaced: true,
    state: (): HomeState => ({
        msg: 'Hi guys'
    }),
    getters: {
        msgGetter(state) {
            return state.msg
        }
    } as HomeGetter,
    mutations: {
        msgSetter(state, data) {
            state.msg = data
        }
    } as HomeMutation,
    actions: {
        msgAction(context, data) {
            return new Promise((resolve, reject) => {
                context.commit('msgSetter', "This is my custom massage")
                resolve()
            })
        }
    } as HomeAction
}
