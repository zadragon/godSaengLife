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
    signout: () => {
        api.post('/logout')
            .then(response => {
                //console.log(response);
            })
            .catch(error => {
                // console.log(error);
            });
    },
    withdrawal: async () => {
        const response = await api.delete('/mypage/userdel');
        return response.data;
    },
    //회원 탈퇴
};

// export const MainApi = {
//     getMain: async () => {
//         const data = await api.get('/main');
//         return data;
//     },
// };

export const MainApi = {
    getMain: () => {
        return api
            .get('/main')
            .then(response => {
                return response;
            })
            .catch(error => {
                console.log(error);
            });
    },
};

export const PostApi = {
    getAllMeal: () => {
        return api.get('/allmeal');
    },
    getLatestImg: () => {
        return api.get('/image/latest');
    },
    saveData: formData => {
        for (let key of formData.keys()) {
            console.log(key, ':', formData.get(key));
        }

        api.post('/feed/write', formData, {
            headers: {
                'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
            },
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    },
    deleteOneImg: imageId => {
        return api
            .delete(`/feed/image/${imageId}`)
            .then(response => {
                alert(response.data.message);
            })
            .catch(error => {
                console.log(error);
            });
    },
    deleteAllImg: feedId => {
        return api
            .delete(`/feed/${feedId}/allImage`)
            .then(response => {
                alert(response.data.message);
            })
            .catch(error => {
                console.log(error);
            });
    },
    deleteFeed: (feedId, token) => {
        return api
            .delete(`/feed/${feedId}`, {
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
    editData: (formData, feedId) => {
        return api
            .put(`${process.env.REACT_APP_BACKEND_SERVER_URL}/feed/${feedId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
                },
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

export const analysis = {
    getWeekData: () => {
        return api
            .get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/graph/week`)
            .then(response => {
                return response.data; // 필요에 따라 응답 데이터 반환
            })
            .catch(error => {
                console.log(error);
                throw error; // 에러를 상위 컴포넌트로 전달하거나 처리할 수 있도록 throw
            });
    },
    getMonthData: () => {
        return axios
            .get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/graph/week`)
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

export const MypageApi = {
    getMypage: () => {
        return api
            .get('/mypage')
            .then(response => {
                return response;
            })
            .catch(error => {
                console.log(error);
            });
    },
    editNickname: formData => {
        return api
            .put('/mypage/nickname', formData) // Pass newNickname as request data
            .then(response => {
                console.log(response.data);
                return response.data; // Return the response data if needed
            })
            .catch(error => {
                console.log(error);
                throw error; // Throw the error to be handled by the calling component
            });
    },
};
