import { GetterTree, MutationTree, ActionTree, ActionContext } from "vuex";
import { RootState } from "../vuex";
import { AxiosResponse } from "axios";

export type Setting = {
    key: string,
    value: string | null,
    json_value: JSON | null,
    setting_type: string | null
}

export interface SettingsState {
    setting: Setting;
    settings: Array;
}

export interface SettingsGetter extends GetterTree<SettingsState, RootState> {
    settingGetter(state: SettingsState): Setting;
    settingsGetter(state: SettingsState): Array;
}

export interface SettingsMutation extends MutationTree<SettingsState> {
    settingMuattion(state: SettingsState, data: Setting): void
    settingsMuation(state: SettingsState, data: Array): void
}

export interface SettingsAction extends ActionTree<SettingsState, RootState> {
    logoUpload(context: ActionContext<SettingsState, RootState>, data: any): Promise<AxiosResponse<any>>;
    logoDelete(context: ActionContext<SettingsState, RootState>, data: string): Promise<AxiosResponse<any>>;
    crateOrUpdateSetting(context: ActionContext<SettingsState, RootState>, data: Setting): Promise<AxiosResponse<any>>;
    getSettings(context: ActionContext<SettingsState, RootState>): Promise<AxiosResponse<any>>;
    deleteSetting(context: ActionContext<SettingsState, RootState>, data: string): Promise<AxiosResponse<any>>;
}