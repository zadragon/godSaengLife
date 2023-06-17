import React, { useEffect } from 'react';
import { PostApi } from '../../shared/api';
import { useCookies } from 'react-cookie';

const PictureList = () => {
    const [cookies, setCookie, removeCookie] = useCookies();

    useEffect(() => {
        PostApi.getAllMeal(cookies.Authorization);
    }, []);
    return (
        <div>
            <h1> 전체사진보기 테스트</h1>
        </div>
    );
};

export default PictureList;
