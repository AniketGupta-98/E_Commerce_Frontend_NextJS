import axios from 'axios';
import { store } from './store';
import urlConfig from '../app/url.config.json';

const BASE_URL = urlConfig.url;

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Attach the auth token from Redux store on every request
api.interceptors.request.use(
    (config) => {
        const token = store.getState().user.user?.accessToken;
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

// Global response error handler
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Optionally handle 401 / token expiry here
        return Promise.reject(error);
    },
);

export default api;
