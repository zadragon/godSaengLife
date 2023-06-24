import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { PostApi } from '../shared/api';
import { useCookies } from 'react-cookie';
import { styled } from 'styled-components';
import { useQuery } from '@tanstack/react-query';

const Allmeal = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const [allMeal, setAllMeal] = useState([]);

    useEffect(() => {
        if (cookies.Authorization) {
            PostApi.getAllMeal(cookies.Authorization)
                .then(response => {
                    setAllMeal(response.data.feeds);
                    // 이미지 데이터를 상태로 설정
                    console.log('전체사진:', response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [cookies.Authorization]);

    return (
        <div className="albumList">
            {allMeal.length === 0 ? (
                <div className="img"></div>
            ) : (
                allMeal.map((item, index) => (
                    <div className="img" key={index}>
                        <img src={item.imagePath} alt="" />
                    </div>
                ))
            )}
        </div>
    );
};

export default Allmeal;
