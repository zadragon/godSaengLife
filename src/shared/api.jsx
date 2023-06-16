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
    signup: payload => {
        const url = '/signup';
        api.post(url, payload)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    },
    signin: async payload => {
        const response = await api.post('/login', payload);
        return response.data;
    },
    checkEmailDuplication: async email => {
        const url = '/'; // 이메일 중복확인을 위한 끝점이 어딘지 설정해야함
        const response = await api.post(url, { email });
        return response.data;
    },
};
