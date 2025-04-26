import { GetterTree, MutationTree, ActionTree, ActionContext } from "vuex";
import { RootState } from "../vuex";

export type Alert = {
    status: string;
    type: string;
    message: string;
}

export interface AlertState {
    alert: Alert;
    alertOpen: boolean
}

export interface AlertGetter extends GetterTree<AlertState, RootState> {
    alertGetter(state: AlertState): Alert;
    alertOpenGetter(state: AlertState): Boolean;
}

export interface AlertMutation  extends MutationTree<AlertState> {
    alertSetter(state: AlertState, data: Alert): void;
    alertOpenSetter(state: AlertState, data: boolean): void;
}

export interface AlertAction extends ActionTree<AlertState, RootState> {
    alertResponse(context: ActionContext<AlertState, RootState>, data: Alert): void;
}