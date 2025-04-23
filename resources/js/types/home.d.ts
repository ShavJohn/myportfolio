import { GetterTree, MutationTree, ActionTree, ActionContext } from "vuex";
import { RootState } from "../vuex";

export interface DitailsEntry {
    id: number;
    key: string;
    value: string
}

export interface Entry {
    id: number;
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

export interface HomeGetter extends GetterTree<HomeState, RootState> {
    skillsGetter(state: HomeState): Array<string>;
    textAboutMeGetter(state: HomeState): string;
    shortAboutMeGetter(state: HomeState): string;
    myDitailsArrayGetter(state: HomeState): DitailsEntry[];
    educationArrayGetter(state: HomeState): Entry[];
    workArrayGetter(state: HomeState): Entry[];
    skillsArrayGetter(state: HomeState): string[];
}

export interface HomeMutation extends MutationTree<HomeState> {
    skillsSetter(state: HomeState, data: string): void;
    textAboutMeSetter(state: HomeState, data: string): void;
    shortAboutMeSetter(state: HomeState, data: string): void;
    myDitailsArraySetter(state: HomeState, data: DitailsEntry): void;
    educationArraySetter(state: HomeState, data: Entry): void;
    workArraySetter(state: HomeState, data: Entry): void;
    skillsArraySetter(state: HomeState, data: string): void;
}

export interface HomeAction extends ActionTree<HomeState, RootState> {
    skillsAction(context: ActionContext<HomeState, RootState>, data: string): Promise<void>;
}
