import { GetterTree, MutationTree, ActionTree, ActionContext } from "vuex";
import { RootState } from "../vuex";

export interface DashboardState {
    currentSelected: string
}

export interface DashboardGetter extends GetterTree<DashboardState, RootState> {
    currentSelectedGetter(state: DashboardState): string;
}

export interface DashboardSetter extends MutationTree<DashboardState> {
    currentSelectedSetter(state: DashboardState, data: string): void;
}

export interface DashboardActions extends ActionTree<DashboardState, RootState> {

}