import axios from "axios";

const isDev = import.meta.env.DEV;

const api = axios.create({
    baseURL: isDev ? "/api" : import.meta.env.VITE_API_URL,
    withCredentials: true,
});

export default api;
