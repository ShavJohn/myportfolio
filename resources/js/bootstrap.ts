import axios, { AxiosStatic} from 'axios';

declare global {
    interface Window {
        axios: AxiosStatic
    }
}

window.axios = axios as AxiosStatic;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
