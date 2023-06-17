import axios from 'axios';
import { api } from './apiConfig';

export const AuthApi = {
    signup: payload => {
        console.log(payload);
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

export const MainApi = {
    getMain: token => {
        api.get('/', {
            headers: {
                'Content-Type': 'application/json', // 필요한 헤더를 여기에 추가하세요
                Authorization: token, // 필요한 인증 헤더를 여기에 추가하세요
            },
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    },
};
