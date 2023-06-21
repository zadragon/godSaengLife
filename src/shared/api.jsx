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
    signout: token => {
        api.post('/logout', {
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

export const MainApi = {
    getMain: token => {
        return api
            .get('/main', {
                headers: {
                    'Content-Type': 'application/json', // 필요한 헤더를 여기에 추가하세요
                    Authorization: token, // 필요한 인증 헤더를 여기에 추가하세요
                },
            })
            .then(response => {
                console.log(response);
                return response;
            })
            .catch(error => {
                console.log(error);
            });
    },
};

export const PostApi = {
    getAllMeal: token => {
        api.get('/allmeal', {
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
    // saveData: (token, data) => {
    //     console.log('token', token, data);
    //     api.post('/feed/write', data, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //             Authorization: token,
    //         },
    //     })
    //         .then(response => {
    //             console.log(response);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // },
    saveData: (token, formData) => {
        const apiInstance = axios.create({
            baseURL: process.env.REACT_APP_BACKEND_SERVER_URL,
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: token,
            },
            withCredentials: true,
        });

        apiInstance
            .post('/feed/write', formData)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    },
};
