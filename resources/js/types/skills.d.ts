import { GetterTree, MutationTree, ActionTree, ActionContext } from "vuex";
import { RootState } from "../vuex";


export type DitailsEntry = {
    id: number;
    key: string;
    value: string
}

export interface SkillsState {
    skills: Array<Object>;
    skillsArray: string[]
}

export interface SkillsGetter extends GetterTree<SkillsState, RootState> {
    skillsGetter(state: SkillsState): Array<Object>;
    skillsArrayGetter(state: SkillsState): string[];
}

export interface SkillsMutation extends MutationTree<HomeState> {
    skillSetter(state: SkillsState, data: string): void;
    skillsSetter(state: SkillsState, data: Array<Object>): void;
    skillsArraySetter(state: SkillsState, data: string): void;
}

export interface SkillsAction extends ActionTree<HomeState, RootState> {
    stroeSkill(context: ActionContext<SkillsState, RootState>, data: DitailsEntry): Promise<AxiosResponse<any>>;
    getSkills(context: ActionContext<SkillsState, RootState>): Promise<AxiosResponse<any>>;
    removeSkill(context: ActionContext<SkillsState, RootState>, data: DitailsEntry): Promise<AxiosResponse<any>>;
}