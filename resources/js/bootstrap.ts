import axios, { AxiosStatic} from 'axios';

declare global {
    interface Window {
        axios: AxiosStatic,
        imagePrefix: string
    }
}

window.axios = axios as AxiosStatic;

window.axios.defaults.baseURL = `/api`;

window.axios.interceptors.response.use(
    response => {

        return response
    },
    error => {
        const { response } = error;
        if (response.status === 422) {
            const firstErrorIndex = Object.keys(response.data.errors)[0];
            const message = `${ response.data.message || 'Error:' } ${ response.data.errors[firstErrorIndex].msg }`;
            return Promise.reject(new Error(message || 'Error'))
        } else {
            if (response.status === 401) {

                localStorage.removeItem('access_token');
                return error
            } else {

                return Promise.reject(new Error(response.data.message || 'Error'))
            }
        }
    }
)

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.imagePrefix = `/storage`;

interface Token {
    content: string | null
}
const tokenElement = document.head.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null;

const token: Token = {
  content: tokenElement?.content ?? null
}
if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
}

axios.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem('access_token')}`};
