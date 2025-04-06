import { ActionContext } from "vuex";
import { GetterTree, MutationTree, ActionTree } from "vuex";
import { RootState } from "../vuex";

export interface Position {
    id: number,
    title: string,
    desciption: string,
    company: string,
    startDate: string,
    endDate: string,
    tillNow: boolean
}

export interface AboutMeState {
    position:  Position;
    positionsArray: Position[];
}

export interface AboutMeGetter extends GetterTree<AboutMeState, RootState> {
    positionGetter(state: AboutMeState): Position;
    positionsArrayGetter(state: AboutMeState): Array;
}

export interface AboutMeSetter extends MutationTree<AboutMeState> {
    positionSetter(state: AboutMeState, data: Position): void;
    positionsArraySetter(state: AboutMeState, data: Position): void;
}

export interface AboutMeActions extends ActionTree<AboutMeState, RootState> {

}
