import { ActionContext, GetterTree, MutationTree, ActionTree } from "vuex";
import { RootState } from "../vuex";

export type Contactus = {
    id: number;
    name: string;
    email: string;
    message: string;
}

export interface ContactusState {
    contactus: Contactus;
    contactusArr: Contactus[]
}

export interface ContactusGetter extends GetterTree<ContactusState, RootState> {
    contactusGetter(state: ContactusState): Contactus;
    contactusArrGetter(state: ContactusState): Contactus[];
}

export interface ContactusMutation extends MutationTree<ContactusState> {
    contactusSetter(state: ContactusState, data: Contactus): void;
    contactusArrSetter(state: ContactusState, data: Contactus): void;
}

export interface ContactusAction extends ActionTree<ContactusState, RootState> {

}