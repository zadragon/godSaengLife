import axios from 'axios';
import { deleteCookie, getCookie } from '../utils/cookie';

export const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_SERVER_URL,
});

api.interceptors.request.use(
    config => {
        //토큰값을 문자열로 가져와서 Bearer%20 중 %20값 제거
        const token = getCookie('Authorization')?.split('%20').join(' ');
        if (token) {
            config.headers['Authorization'] = token;
            return config;
        }
        return config;
    },
    error => {
        return error;
    }
);

// 싱글톤 패턴으로 axios 인스터스를 생성
// export const api = axios.create({
//     baseURL: process.env.REACT_APP_BACKEND_SERVER_URL,
//     headers: {
//         Authorization: '',
//     },
//     withCredentials: true,
// });
