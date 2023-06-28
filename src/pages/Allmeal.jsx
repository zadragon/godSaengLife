import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { PostApi } from '../shared/api';
import { useCookies } from 'react-cookie';
import { styled } from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import * as A from '../styles/album';
import OverlayImg from '../components/picture/OverlayImg';

const Allmeal = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const [allMeal, setAllMeal] = useState([]);

    useEffect(() => {
        if (cookies.Authorization) {
            PostApi.getAllMeal(cookies.Authorization)
                .then(response => {
                    setAllMeal(response.data.feeds);
                    // 이미지 데이터를 상태로 설정
                    console.log('전체사진:', response.data.feeds);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [cookies.Authorization]);

    console.log(allMeal);

    const [imgViewUrl, setImgViewUrl] = useState({ view: false, url: '', feedId: '' });
    const viewDetail = (imgUrl, imageId) => {
        setImgViewUrl({ ...imgViewUrl, view: true, url: imgUrl, imageId: imageId });
    };

    console.log(imgViewUrl);

    return (
        <>
            <A.AlbumList>
                {allMeal.length === 0 ? (
                    <div className="img">이미지가 없습니다.</div>
                ) : (
                    allMeal.map((item, index) => {
                        if (item.FeedImages.length > 0) {
                            return item.FeedImages.map((i, index) => {
                                return (
                                    <div className="img" key={index} onClick={() => viewDetail(i.imagePath, i.imageId)}>
                                        <img src={i.imagePath} alt="" />
                                    </div>
                                );
                            });
                        }
                    })
                )}
            </A.AlbumList>
            {imgViewUrl.view && (
                <OverlayImg imgUrl={imgViewUrl.url} imageId={imgViewUrl.imageId} setImgViewUrl={setImgViewUrl} />
            )}
        </>
    );
};

export default Allmeal;
