import axios from 'axios';
import { api } from './apiConfig';

export const AuthApi = {
    signup: (payload, navigate) => {
        const url = '/signup';
        api.post(url, payload)
            .then(response => {
                response.data.code == 201 && navigate('/joinDone');
            })
            .catch(error => {
                console.log(error);
                alert(error.response.data.errorMessage);
            });
    },
    signin: async payload => {
        const response = await api.post('/login', payload);
        return response.data;
    },
    signout: removeCookie => {
        api.post('/logout')
            .then(response => {})
            .catch(error => {});
    },
    withdrawal: async () => {
        const response = await api.delete('/mypage/userdel');
        return response.data;
    },
};

export const MainApi = {
    getMain: () => {
        return api
            .get('/main')
            .then(response => {
                return response;
            })
            .catch(error => {});
    },
    getProfile: () => {
        return api
            .get('/mypage')
            .then(response => {
                return response;
            })
            .catch(error => {});
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
            //console.log(key, ':', formData.get(key));
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
            .delete(`/feed/${feedId}`)
            .then(response => {
                alert(response.data.message);
            })
            .catch(error => {
                console.log(error);
            });
    },
    getFeed: feedId => {
        return api
            .get(`/feed/${feedId}`)
            .then(response => {
                return response;
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
    getWeekData: period => {
        return api
            .get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/graph/week/${period == 0 ? '' : period}`)
            .then(response => {
                return response.data; // 필요에 따라 응답 데이터 반환
            })
            .catch(error => {
                console.log(error);
                throw error; // 에러를 상위 컴포넌트로 전달하거나 처리할 수 있도록 throw
            });
    },
    getMonthData: period => {
        return api
            .get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/graph/month/${period == 0 ? '' : period}`)
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
    editPassword: formData => {
        return api
            .put('/mypage/password', formData) // Pass newNickname as request data
            .then(response => {
                console.log(response.data);
                return response.data; // Return the response data if needed
            })
            .catch(error => {
                console.log(error);
                throw error; // Throw the error to be handled by the calling component
            });
    },
    sendEmailCode: formData => {
        return api
            .put('/mypage/mailcode', formData) // Pass newNickname as request data
            .then(response => {
                return response.data; // Return the response data if needed
            })
            .catch(error => {
                throw error; // Throw the error to be handled by the calling component
            });
    },
};

export const communityApi = {
    addCommunityArticle: async payload => {
        const res = await api
            .post('/share', payload)
            .then(response => {
                response.data.code == 201 && response;
                return response;
            })
            .catch(error => {
                console.log(error);
            });

        return res.data;
    },

    getCommunityArticle: async shareId => {
        const res = await api
            .get(`/share/${shareId}`)
            .then(response => {
                return response;
            })
            .catch(error => {
                console.log(error);
            });
        return res.data;
    },

    getAllCommunity: async page => {
        const res = await api
            .get(`/share/list?page=${page}`) // 페이지 번호를 쿼리 파라미터로 추가
            .then(response => {
                console.log(response);
                return response;
            })
            .catch(error => {
                console.log(error);
            });
        return res;
    },

    addLike: async shareId => {
        const res = await api
            .post(`/likes/${shareId}`)
            .then(response => {
                console.log(response);
                return response;
            })
            .catch(error => {
                console.log(error);
                alert(error.response.data.message);
            });
        return res.data;
    },

    removeLike: async id => {
        const res = await api
            .delete(`/likes/${id}`)
            .then(response => {
                console.log(response);
                return response;
            })
            .catch(error => {
                console.log(error);
            });
        return res.data;
    },

    addComment: (id, payload) => {
        api.post(`/comment/${id}`, payload)
            .then(response => {
                console.log('댓글추가', response);
                return response;
            })
            .catch(error => {
                console.log(error);
            });
    },

    getComments: async id => {
        const res = await api
            .get(`/comment/${id}`)
            .then(response => {
                //console.log('댓글 가져오기', response);
                return response;
            })
            .catch(error => {
                console.log(error);
            });
        return res.data;
    },
};
