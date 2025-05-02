import { GetterTree, MutationTree, ActionTree, ActionContext } from "vuex";
import { RootState } from "../vuex";

export interface Position {
    id: number;
    title: string;
    description: string;
    company: string;
    startDate: string;
    endDate: string;
    tillNow: boolean;
    type: string;
}

export interface PositionState {
    position:  Position;
    positionsArray: Position[];
}

export interface PositionGetter extends GetterTree<PositionState, RootState> {
    positionGetter(state: PositionState): Position;
    positionsArrayGetter(state: PositionState): Position[];
}

export interface PositionSetter extends MutationTree<PositionState> {
    positionSetter(state: PositionState, data: Position): void;
    positionsArraySetter(state: PositionState, data: Position): void;
    setAllPositions(state: PositionState, data: Position[]): void;
    removePosition(state: PositionState, id: number): void;
    updatePosition(state: PositionState, updated: Position): void;
}

export interface PositionActions extends ActionTree<PositionState, RootState> {
    storePosition(context: ActionContext<PositionState, RootState>, data: Position): Promise<AxiosResponse>;
    getPositions(context: ActionContext<PositionState, RootState>): Promise<AxiosResponse>;
    updatePosition(context: ActionContext<PositionState, RootState>, data: Position): Promise<AxiosResponse>;
    deletePosition(context: ActionContext<PositionState, RootState>, id: number): Promise<AxiosResponse>;
}
