import React, { useEffect, useState } from 'react';
import { PostApi } from '../../shared/api';
import { useNavigate } from 'react-router-dom';
import OverlayImg from '../../components/picture/OverlayImg';
import * as A from '../../styles/album';
import * as C from '../../styles/common';
import { useQuery } from '@tanstack/react-query';
import AllPopLayer from '../../components/picture/AllPopLayer';
import Gnb from '../../components/Gnb';
import { styled } from 'styled-components';
import Loading from '../../components/common/Loading';

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
            emotionKr: '아주 상쾌함',
        },
        {
            emotion: 'good',
            active: false,
            emotionKr: '편안한 날',
        },
        {
            emotion: 'soso',
            active: false,
            emotionKr: '그냥 그럼',
        },
        {
            emotion: 'tired',
            active: false,
            emotionKr: '피곤함',
        },
        {
            emotion: 'stress',
            active: false,
            emotionKr: '안좋음',
        },
    ]);
    const [filterData, setFilterData] = useState('all');
    const [toolPopActive, setToolPopActive] = useState(false); // 삭제 묻는 툴팁 팝업

    useEffect(() => {
        data?.data.feeds.map(item => {
            //피드 데이터중에 이미지없는 피드 갯수 카운트
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

    const [delFeedId, setDelFeedId] = useState([]);
    const [selectDelMode, setSelectDelMode] = useState(false); //선택삭제 모드 설정
    const selectDelImgMode = () => {
        setSelectDelMode(!selectDelMode);
        setDelFeedId([]);
    };

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

    const allImgDel = () => {
        delFeedId.forEach(item => {
            PostApi.deleteAllImg(item);
        });
        setToolPopActive(false);
    };

    if (isLoading) return <Loading />;

    return (
        <div className="relative">
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
                {selectDelMode && delFeedId.length > 0 && (
                    <button className="btnImgdel" onClick={() => setToolPopActive(true)}>
                        <span className="hidden">삭제하기</span>
                    </button>
                )}
                {selectDelMode && <span className="count">{delFeedId.length}장 선택</span>}

                <button onClick={() => selectDelImgMode()}>{selectDelMode ? '취소' : '삭제 선택'}</button>
            </A.btnUtilArea>
            <A.AlbumList>
                {emptyCheck == data?.data.feeds.length ? ( //이미지 배열이 없는 숫자와 총 게시물 숫자가 같으면 이미지가 없습니다
                    <div className="w-full flex justify-center py-20">이미지가 없습니다.</div>
                ) : (
                    data?.data.feeds.map(item => {
                        if (filterData == 'all' || (filterData == item.emotion && item.FeedImages.length > 0)) {
                            //기본은 all, 필터 데이터와 아이템 이모션이 같고 아이템 피드이미지수가 하나라도 있으면

                            if (item.FeedImages.length == 0) {
                                return null; // item이 3일 때 렌더링하지 않음
                            }

                            return (
                                // 이미지 갯수가 두개이상 있으면 썸네일에 카드표시
                                <div
                                    className={`img ${item.FeedImages.length > 1 ? 'cards' : ''} ${
                                        delFeedId?.some(selectItem => selectItem == item.feedId) ? 'active' : ''
                                    }`}
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
            <C.ConfirmLayer className={`tool ${toolPopActive ? 'active' : ''}`}>
                <p>이 사진을 정말로 삭제하시겠어요?</p>
                <button onClick={() => setToolPopActive(false)} className="black">
                    취소
                </button>
                <button onClick={() => allImgDel()}>삭제하기</button>
            </C.ConfirmLayer>
            {allPopActive && (
                <AllPopLayer allPopActive={allPopActive} setAllPopActive={setAllPopActive} selectItem={selectItem} />
            )}
        </div>
    );
};

const ToolPop = styled.div`
    position: fixed;
    z-index: 100;
    left: 0;
    bottom: 0;
    transform: translateY(100%);
    width: 100%;
    padding: 32px 16px 24px 16px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
    background-color: #fff;
    border-radius: 8px;
    transition: transform 0.15s ease;
    p {
        color: #000;
        /* Paragraph/Small Bold */
        font-size: 14px;
        font-family: Pretendard;
        font-weight: 700;
        line-height: 20px;
        text-align: center;
        display: block;
        margin-bottom: 24px;
    }
    &.active {
        transform: translateY(0);
    }
    button {
        width: 100%;
        height: 44px;
        color: #f44336;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-family: Pretendard;
        font-weight: 700;
        line-height: 20px;
        border-radius: 8px;
        &.black {
            background-color: #21242e;
            color: #fff;
        }
    }
`;

export default AllImgList;
