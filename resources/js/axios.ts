import axios from 'axios'

const instance = axios.create({
  baseURL: '/api',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
  }
})

const token = document.head.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null;

if (token) {
    instance.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
}

instance.interceptors.response.use(
  response => response,
  error => {
    const { response } = error;

    if (response.status === 422) {
      const firstErrorIndex = Object.keys(response.data.errors)[0];
      const message = `${response.data.message || 'Error:'} ${response.data.errors[firstErrorIndex].msg}`;
      return Promise.reject(new Error(message));
    }

    if (response.status === 401) {
      localStorage.removeItem('access_token');
      return error;
    }

    return Promise.reject(new Error(response.data.message || 'Error'));
  }
)

export default instance;
