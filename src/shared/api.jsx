import axios from 'axios';

// 싱글톤 패턴으로 axios 인스터스를 생성
export const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_SERVER_URL,
    headers: {
        /* */
    },
    withCredentials: true,
});

export const AuthApi = {
    signup: async payload => {
        const url = '/signup';
        const response = await api.post(url, payload);
        return response.data;
    },
    signin: async payload => {
        const response = await api.post('/login', payload);
        return response.data;
    },
};
