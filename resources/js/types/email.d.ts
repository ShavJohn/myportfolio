import { GetterTree, MutationTree, ActionTree, ActionContext } from "vuex";
import { RootState } from "../vuex";
import { AxiosPromise } from "axios";

type EmailStatus = {
    key: number;
    id: number
}

export type Email = {
    id: number;
    name: string;
    email: string;
    phone_number: number;
    message: string;
    reply: {
        title: string;
        message: string;
    };
    read: boolean
}

export interface EmailState {
    contactMeMessages: Array;
    selectedMessage: Object;
    displayTab: string;
    currentKey: number;
    unreadEmails: number;
    dataFinished: boolean
}

export interface EmailGetter extends GetterTree<EmailState, RootState> {
    contactMeMessagesGetter(state: EmailState): Array;
    selectedMessageGetter(state: EmailState): Object;
    displayTabGetter(state: EmailState): string;
    currentKeyGetter(state: EmailState): number;
    unreadEmailsGetter(state: EmailState): number;
    dataFinishedGetter(state: EmailState): boolean;
}

export interface EmailMutation extends MutationTree<EmailState> {
    contactMeMessagesSetter(state: EmailState, data: Array): void;
    selectedMessageSetter(state: EmailState, data: Object): void;
    displayTabSetter(state: EmailState, data: string): void;
    currentKeySetter(state: EmailState, data: number): void;
    unreadEmailsSetter(state: EmailState, data: number): void;
    dataFinishedSetter(state: EmailState, data: boolean): void;
}

export interface EmailAction extends ActionTree<EmailState, RootState> {
    sendMessage(context: ActionContext<EmailState, RootState>, data: Object): Promise<AxiosResponse<any>>;
    updateEmailStatus(context: ActionContext<EmailState, RootState>, data: EmailStatus): Promise<AxiosResponse<any>>;
    getContactMessages(context: ActionContext<EmailState, RootState>, data: Array): Promise<AxiosResponse<any>>;
    replyToMessage(context: ActionContext<EmailState, RootState>, data: Object): Promise<AxiosResponse<any>>;
}