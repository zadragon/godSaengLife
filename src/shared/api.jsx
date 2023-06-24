import axios from 'axios';
import { api } from './apiConfig';

export const AuthApi = {
    signup: (payload, navigate) => {
        const url = '/signup';
        api.post(url, payload)
            .then(response => {
                console.log(response);
                response.data.code == 201 && navigate('/joinDone');
            })
            .catch(error => {
                console.log(error);
                alert(error.response.data.message);
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
                //console.log(response);
            })
            .catch(error => {
                // console.log(error);
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
                //console.log(response);
                return response;
            })
            .catch(error => {
                //console.log(error);
            });
    },
};

export const PostApi = {
    getAllMeal: token => {
        return api.get('/allmeal', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });
    },
    getLatestImg: token => {
        return api.get('/image/latest', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });
    },
    saveData: (token, formData) => {
        for (let key of formData.keys()) {
            console.log(key, ':', formData.get(key));
        }
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
    deleteOneImg: (imageId, token) => {
        return api
            .delete(`/feed/image/${imageId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            })
            .then(response => {
                alert(response.data.message);
            })
            .catch(error => {
                console.log(error);
            });
    },
};

export const PutApi = {
    editData: (token, formData, feedId) => {
        return axios
            .put(`${process.env.REACT_APP_BACKEND_SERVER_URL}/feeds/${feedId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: token,
                },
                withCredentials: true,
            })
            .then(response => {
                console.log(response.data);
                return response.data; // 필요에 따라 응답 데이터 반환
            })
            .catch(error => {
                console.log(error);
                throw error; // 에러를 상위 컴포넌트로 전달하거나 처리할 수 있도록 throw
            });
    },
};
