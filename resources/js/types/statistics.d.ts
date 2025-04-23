import { ActionContext, GetterTree, MutationTree, ActionTree } from "vuex";
import { RootState } from "../vuex";

export interface StatisticsState {
    visitors: Object;
    visitorsCount: number;
    pageReloads: Object;
    pageReloadsCount: number;
}

export interface StatisticsGetter extends GetterTree<StatisticsState, RootState> {
    visitorsGetter(state: StatisticsState): Object;
    visitorsCountGetter(state: StatisticsState): number;
    pageReloadsGetter(state: StatisticsState): Object;
    pageReloadsCountGetter(state: StatisticsState): number;
}

export interface StatisticsMutation extends MutationTree<StatisticsState> {
    visitorsSetter(state: StatisticsState, data: Object): void;
    visitorsCountSetter(state: StatisticsState, data: number): void;
    pageReloadsSetter(state: StatisticsState, data: Object): void;
    pageReloadsCountSetter(state: StatisticsState, data: number): void;
}

export interface StatisticsAction extends ActionTree<StatisticsState, RootState> {
    countVisitor(context: ActionContext<StatisticsState, RootState>, data: Object):  Promise<AxiosResponse<any>>;
    getStatistics(context: ActionContext<StatisticsState, RootState>, data: Object):  Promise<AxiosResponse<any>>;
}