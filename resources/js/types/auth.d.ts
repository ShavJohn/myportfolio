import { GetterTree, MutationTree, ActionTree, ActionContext } from "vuex";
import { RootState } from "../vuex";

export interface Auth {
    login: string;
    password: string
}

export interface User {
    id: number;
    name: string;
    email: string;
    password: string
}

export interface AuthState {
    auth: Auth;
    user: User;
    accessToken: string | null;
    authUser: object | null
}

export interface AuthGetter extends GetterTree<AuthState, RootState> {
    authGetter(state: AuthState) : Auth;
    accessTokenGetter(state: AuthState) : string | null;
    authUserGetter(state: AuthState) : object | null;
}

export interface AuthMutation extends MutationTree<AuthState> {
    authSetter(state: AuthState, data: Auth) : void;
    accessTokenSetter(state: AuthState, data: string) : void;
    authUserSetter(state: AuthState, data: object) : void;
}

export interface AuthAction extends ActionTree<AuthState, RootState> {
    login(context: ActionContext<AuthState, RootState>, data: Auth): Promise<AxiosResponse<any>>;
    getAuthUser(context: ActionContext<AuthState, RootState>): Promise<AxiosResponse<any>>;
    saveUserChanges(context: ActionContext<AuthState, RootState>, data: User): Promise<AxiosResponse<any>>;
    createNewUser(context: ActionContext<AuthState, RootState>, data: User): Promise<AxiosResponse<any>>;
    logOut(context: ActionContext<AuthState, RootState>): Promise<AxiosResponse<any>>;
}

