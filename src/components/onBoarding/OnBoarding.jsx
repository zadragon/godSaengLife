import React, { useRef } from 'react';
import Swiperpage from './Swiperpage';
import { styled } from 'styled-components';
import { useState } from 'react';
import * as C from '../../styles/common';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

const OnBoarding = ({ setShowOnBoard }) => {
    const swiperRef = useRef(null);
    const [lastPage, setLastPage] = useState(false);

    const handleSlideChange = swiper => {
        // 스와이프 직후에 실행되는 코드
        // 추가적인 로직을 여기에 작성할 수 있습니다.
        console.log(swiper.isEnd);
        swiper.isEnd ? setLastPage(true) : setLastPage(false);
    };

    const NextSwiper = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideNext();
        }
    };

    const StartService = () => {
        setShowOnBoard(false);
    };

    const noMoreShow = () => {
        localStorage.setItem('showOnBoard', false);
        setShowOnBoard(false);
    };

    return (
        <OnBoardingWrap>
            <Swiper
                pagination={true}
                modules={[Pagination]}
                className="mySwiper"
                onSlideChange={handleSlideChange}
                ref={swiperRef}
            >
                <SwiperSlide>
                    <Swiperpage
                        title={'뚝딱 클릭으로 오늘 기록 끝!'}
                        paragraph={'더욱 행복하고 건강한 나 자신을 위해 기록하는 습관을 만들어봐요!'}
                        imgSrc={'/images/onboarding/img_onnboarding_1.png'}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Swiperpage
                        title={'얼마나 갓생을 살았나 분석해볼까요?'}
                        paragraph={'컨디션, 식단, 운동, 꿀잠 기본에 충실하게 살았나 추적해봐요!'}
                        imgSrc={'/images/onboarding/img_onnboarding_2.png'}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Swiperpage
                        title={'다른 갓생러는 어떻게 살고 있을까요?'}
                        paragraph={'성공적인 나의 한 주를 공유하고 다른 갓생러를 보면서 동기부여도 받아봐요!'}
                        imgSrc={'/images/onboarding/img_onnboarding_3.png'}
                    />
                </SwiperSlide>
            </Swiper>

            <BtnNoMoreShow
                onClick={() => {
                    noMoreShow();
                }}
            >
                이 페이지 더이상 보지 않기
            </BtnNoMoreShow>
            {lastPage ? (
                <C.BtnOnBoarding onClick={() => StartService()}>시작하기</C.BtnOnBoarding>
            ) : (
                <C.BtnOnBoarding onClick={() => NextSwiper()}>다음</C.BtnOnBoarding>
            )}
        </OnBoardingWrap>
    );
};

const OnBoardingWrap = styled.div`
    position: absolute;
    width: 100%;
    height: 100vh;
    z-index: 150;
    top: 0;
    left: 0;
    background-color: #fff;
    .swiper-pagination {
        position: absolute;
        bottom: 25%;
    }
    .swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet,
    .swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet {
        margin: 0 8px;
    }
    .swiper-pagination-bullet {
        background-color: #5f636f;
    }
    .swiper-pagination-bullet.swiper-pagination-bullet-active {
        background-color: #393e4f;
    }

    /* 400px 이상인 경우에만 적용될 스타일 */
    @media screen and (min-width: 400px) {
        height: calc(100vh - 70px);
    }
`;

const BtnNoMoreShow = styled.button`
    position: absolute;
    left: 0;
    bottom: 106px;
    width: 100%;
    padding: 10px;
    color: #727580;
    font-size: 12px;
    text-decoration: underline;
    z-index: 160;
`;

export default OnBoarding;
