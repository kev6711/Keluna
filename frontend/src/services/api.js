import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const isUnauthorized = error.response?.status === 401;
        const isLoginRequest = error.config?.url === "/auth/login";

        if (isUnauthorized && !isLoginRequest) {
            localStorage.removeItem("token");
            window.location.replace("/login");
        }

        return Promise.reject(error);
    },
);

export default api;
