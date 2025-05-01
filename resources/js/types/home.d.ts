import { GetterTree, MutationTree, ActionTree, ActionContext } from "vuex";
import { RootState } from "../vuex";

export type DitailsEntry = {
    key: string;
    value: string
}

export type Entry = {
    inputText: string;
    starDate: string;
    endDate: string;
    tillNow: boolean;
}

export interface HomeState {
    shortAboutMe: string;
    myDitailsArray: DitailsEntry[];
    educationArray: Entry[];
    workArray: Entry[];
}

export interface HomeGetter extends GetterTree<HomeState, RootState> {
    shortAboutMeGetter(state: HomeState): string;
    myDitailsArrayGetter(state: HomeState): DitailsEntry[];
    educationArrayGetter(state: HomeState): Entry[];
    workArrayGetter(state: HomeState): Entry[];
}

export interface HomeMutation extends MutationTree<HomeState> {
    shortAboutMeSetter(state: HomeState, data: string): void;
    myDitailsArraySetter(state: HomeState, data: DitailsEntry): void;
    educationArraySetter(state: HomeState, data: Entry): void;
    workArraySetter(state: HomeState, data: Entry): void;
}

export interface HomeAction extends ActionTree<HomeState, RootState> {
    
}
