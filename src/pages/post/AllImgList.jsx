import React, { useEffect, useState } from 'react';
import { PostApi } from '../../shared/api';
import { useNavigate } from 'react-router-dom';
import OverlayImg from '../../components/picture/OverlayImg';
import * as A from '../../styles/album';
import * as C from '../../styles/common';
import { useQuery } from '@tanstack/react-query';
import AllPopLayer from '../../components/picture/AllPopLayer';
import Gnb from '../../components/Gnb';

const AllImgList = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [allMeal, setAllMeal] = useState([]);
    const navigate = useNavigate();

    const { data, isLoading, isError, isSuccess, refetch } = useQuery(['getAllMeal'], () => PostApi.getAllMeal());

    console.log(data);

    useEffect(() => {}, []);

    // const [imgViewUrl, setImgViewUrl] = useState({ view: false, url: '', feedId: '' });

    const [allPopActive, setAllPopActive] = useState(false);
    const [selectItem, setSelectItem] = useState(null);
    const viewDetail = item => {
        setAllPopActive(true);
        setSelectItem(item);
    };

    return (
        <>
            <C.PageHeader>
                <button className="btnPrev" onClick={() => navigate(-1)}>
                    <span className="hidden">뒤로가기</span>
                </button>
                <h2>식단 사진첩</h2>
            </C.PageHeader>
            <A.Filter>
                <ul>
                    <li className="allImg active">
                        <span>모든 사진</span>
                    </li>
                    <li className="type01">
                        <span>아주 상쾌함</span>
                    </li>
                    <li className="type02">
                        <span>그냥 그럼</span>
                    </li>
                    <li className="type03">
                        <span>피곤함</span>
                    </li>
                    <li className="type04">
                        <span>안좋음</span>
                    </li>
                    <li className="type05">
                        <span>나쁨</span>
                    </li>
                </ul>
            </A.Filter>
            <A.btnUtilArea>
                <button>삭제 선택</button>
            </A.btnUtilArea>
            <A.AlbumList>
                {data?.data.feeds === 0 ? (
                    <div className="img">이미지가 없습니다.</div>
                ) : (
                    data?.data.feeds.map(item => {
                        return (
                            <div className="img" key={item.feedId} onClick={() => viewDetail(item)}>
                                <img src={item.FeedImages[0].imagePath} alt="" />
                            </div>
                        );
                    })
                )}
            </A.AlbumList>
            <Gnb />
            <AllPopLayer allPopActive={allPopActive} setAllPopActive={setAllPopActive} selectItem={selectItem} />
        </>
    );
};

export default AllImgList;
