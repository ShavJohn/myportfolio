import { ActionContext, GetterTree, MutationTree, ActionTree } from "vuex";
import { RootState } from "../vuex";

export interface Project {
    id: number;
    name: string;
    url: string;
    image: string;
}

export interface ProjectState {
    project: Project;
    projects: Project[]
}

export interface ProjectGetter extends GetterTree<ProjectState, RootState> {
    projectGetter(state: ProjectState): Project;
    projectsGetter(state: ProjectState): Project[];
}

export interface ProjectMutation extends MutationTree<ProjectState> {
    projectSetter(state: ProjectState, data: Project): void;
    projectsSetter(state: ProjectState, data: Project): void;
}

export interface ProjectAction extends ActionTree<ProjectState, RootState> {

}