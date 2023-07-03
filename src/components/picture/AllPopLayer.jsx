import React, { useEffect, useState } from 'react';
import * as C from '../../styles/common';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import moment from 'moment';
import { PostApi } from '../../shared/api';

const AllPopLayer = ({ allPopActive, setAllPopActive, selectItem }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [feedImg, setFeedImg] = useState([]);
    useEffect(() => {
        allPopActive &&
            setFeedImg(
                selectItem.FeedImages.map(item => {
                    return item.imagePath;
                })
            );
    }, [allPopActive]);

    const [popActive, setPopActive] = useState(false);
    const confirmTool = bool => {
        setPopActive(bool);
    };

    const deleteImg = () => {
        //PostApi.deleteOneImg(imageId);
    };

    return (
        <PopLayer className={`${allPopActive ? 'active' : ''}`}>
            <C.PageHeader>
                <button className="btnPrev" onClick={() => setAllPopActive(false)}>
                    <span className="hidden">뒤로가기</span>
                </button>
                <h2 className="date">{moment(selectItem?.createdAt).format('YYYY/MM/DD')}</h2>
                <button className="btnDel" onClick={() => confirmTool(true)}>
                    <span className="hidden">삭제</span>
                </button>
            </C.PageHeader>
            <SwiperArea>
                <Swiper
                    style={{
                        '--swiper-navigation-color': '#fff',
                        '--swiper-pagination-color': '#fff',
                    }}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper2"
                >
                    {feedImg.map(imgSrc => {
                        return (
                            <SwiperSlide key={imgSrc}>
                                <img src={imgSrc} />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper"
                >
                    {feedImg.map(imgSrc => {
                        return (
                            <SwiperSlide key={imgSrc}>
                                <img src={imgSrc} />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </SwiperArea>
            <div className={`tool ${popActive ? 'active' : ''}`}>
                <p>정말로 삭제하시겠어요?</p>
                <button onClick={() => confirmTool(false)} className="black">
                    취소
                </button>
                <button>삭제하기</button>
            </div>
        </PopLayer>
    );
};

const PopLayer = styled.div`
    position: fixed;
    top: 0;
    right: 100vw;
    width: 100vw;
    height: calc(100vh - 60px);
    background-color: #fff;
    transition: 0.3s;
    opacity: 0;
    &.active {
        right: 0;
        opacity: 1;
    }

    .tool {
        position: absolute;
        z-index: 100;
        left: 0;
        bottom: -60px;
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
    }
`;

const SwiperArea = styled.div`
    .mySwiper2 {
        img {
            width: auto;
            height: calc(100vh - 104px);
            object-fit: cover;
        }
    }
    .swiper-thumbs {
        position: absolute;
        bottom: 16px;
        left: 0;
        width: 100%;
        z-index: 10;
        padding: 0 16px;
        .swiper-wrapper {
            justify-content: center;
        }
        .swiper-slide {
            width: 62px !important;
            height: 80px;
            border-radius: 8px;
            overflow: hidden;
            &.swiper-slide-thumb-active {
                border-radius: 8px;
                border: 2px solid var(--primary-500, #c7f860);
                background: linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), url(<path-to-image>),
                    lightgray 50% / cover no-repeat;
            }
            img {
                width: auto;
                height: 100%;
                object-fit: cover;
            }
        }
    }
    .swiper-button-next {
        width: 44px;
        height: 44px;
        &:after {
            content: '';
            width: 44px;
            height: 44px;
            background: url('/images/icons/icon-btn-next.svg');
        }
    }
    .swiper-button-prev {
        width: 44px;
        height: 44px;
        &:after {
            content: '';
            width: 44px;
            height: 44px;
            background: url('/images/icons/icon-btn-prev.svg');
        }
    }
`;

export default AllPopLayer;
