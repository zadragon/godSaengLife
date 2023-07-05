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
    //const [thumbsSwiper, setThumbsSwiper] = useState(null);
    //const [allMeal, setAllMeal] = useState([]);
    const navigate = useNavigate();
    const [allPopActive, setAllPopActive] = useState(false);
    const [selectItem, setSelectItem] = useState(null);
    const { data, isLoading, isError, isSuccess, refetch } = useQuery(['getAllMeal'], () => PostApi.getAllMeal());
    const [emptyCheck, setEmptyCheck] = useState(0); //이미지 배열이 없는 피드 카운트
    const [emotionFilter, setEmotionFilter] = useState([
        {
            emotion: 'all',
            active: true,
            emotionKr: '모든날',
        },
        {
            emotion: 'happy',
            active: false,
            emotionKr: '기쁜날',
        },
        {
            emotion: 'good',
            active: false,
            emotionKr: '편안한 날',
        },
        {
            emotion: 'soso',
            active: false,
            emotionKr: '그냥 그런 날',
        },
        {
            emotion: 'tired',
            active: false,
            emotionKr: '피곤한 날',
        },
        {
            emotion: 'stress',
            active: false,
            emotionKr: '스트레스 받는 날',
        },
    ]);
    const [filterData, setFilterData] = useState('all');
    useEffect(() => {
        data?.data.feeds.map(item => {
            item.FeedImages.length == 0 && setEmptyCheck(prev => prev + 1);
        });
    }, [data]);

    const viewDetail = item => {
        setAllPopActive(true);
        setSelectItem(item);
    };

    const viewFiltering = emotion => {
        setFilterData(emotion);
    };
    useEffect(() => {
        setEmotionFilter(prev =>
            prev.map(item => {
                return item.emotion == filterData
                    ? {
                          ...item,
                          active: true,
                      }
                    : {
                          ...item,
                          active: false,
                      };
            })
        );
    }, [filterData]);

    const [selectDelMode, setSelectDelMode] = useState(false); //선택삭제 모드 설정
    const selectDelImgMode = () => {
        setSelectDelMode(!selectDelMode);
    };

    const [delFeedId, setDelFeedId] = useState([]);
    //const [selectFeedImg, setSelectFeedImg] = useState('');
    const feedDel = feedId => {
        // setSelectFeedImg(feedId);
        const existingIndex = delFeedId.indexOf(feedId);
        if (existingIndex === -1) {
            // 배열에 값이 없는 경우, 추가
            setDelFeedId([...delFeedId, feedId]);
        } else {
            // 배열에 값이 있는 경우, 제거
            const updatedArray = delFeedId.filter(value => value !== feedId);
            setDelFeedId(updatedArray);
        }
    };
    console.log(data?.data.feeds);

    const allImgDel = () => {
        delFeedId.forEach(item => {
            PostApi.deleteAllImg(item);
        });
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
                    {emotionFilter.map((item, idx) => (
                        <li
                            onClick={() => viewFiltering(item.emotion)}
                            className={`type0${idx} ${item.active ? 'active' : ''}`}
                            key={item.emotion}
                        >
                            <span>{item.emotionKr}</span>
                        </li>
                    ))}
                </ul>
            </A.Filter>
            <A.btnUtilArea>
                {selectDelMode && <button onClick={() => allImgDel()}>삭제하기</button>}
                <button onClick={() => selectDelImgMode()}>{selectDelMode ? '취소' : '삭제 선택'}</button>
            </A.btnUtilArea>
            <A.AlbumList>
                {emptyCheck == data?.data.feeds.length ? ( //이미지 배열이 없는 숫자와 게시물 숫자 비교
                    <div className="w-full flex justify-center py-20">이미지가 없습니다.</div>
                ) : (
                    data?.data.feeds.map(item => {
                        if (filterData == 'all' || (filterData == item.emotion && item.FeedImages.length > 0)) {
                            //기본은 all, 필터 데이터와 아이템 이모션이 같고 아이템 피드이미지수가 하나라도 있으면

                            return (
                                <div
                                    className={`img ${delFeedId.map(selectItem =>
                                        selectItem == item.feedId ? 'active' : ' '
                                    )}`}
                                    key={item.feedId}
                                    onClick={() => (selectDelMode ? feedDel(item.feedId) : viewDetail(item))}
                                >
                                    {item.FeedImages.length !== 0 && <img src={item.FeedImages[0].imagePath} alt="" />}
                                </div>
                            );
                        }
                    })
                )}
            </A.AlbumList>
            <Gnb />
            {allPopActive && (
                <AllPopLayer allPopActive={allPopActive} setAllPopActive={setAllPopActive} selectItem={selectItem} />
            )}
        </>
    );
};

export default AllImgList;
