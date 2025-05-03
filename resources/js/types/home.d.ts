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
    myDitailsArray: DitailsEntry[];
}

export interface HomeGetter extends GetterTree<HomeState, RootState> {
    myDitailsArrayGetter(state: HomeState): DitailsEntry[];
}

export interface HomeMutation extends MutationTree<HomeState> {
    myDitailsArraySetter(state: HomeState, data: DitailsEntry): void;
}

export interface HomeAction extends ActionTree<HomeState, RootState> {
    
}
