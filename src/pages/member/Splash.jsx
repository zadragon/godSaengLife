import React, { useEffect } from 'react';
import OnBoarding from '../../components/onBoarding/OnBoarding';
import { useState } from 'react';
import * as C from '../../styles/common';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import MetaTag from '../../components/MetaTag';

const Splash = () => {
    const [showOnBoard, setShowOnBoard] = useState(false);
    const [cookies] = useCookies();
    const navigate = useNavigate();

    useEffect(() => {
        cookies.Authorization && navigate('/main');
        const showOnBoardState = localStorage.getItem('showOnBoard');
        showOnBoardState ? setShowOnBoard(JSON.parse(showOnBoardState)) : setShowOnBoard(true);
    }, []);

    return (
        <>
            <MetaTag title="둘러보기 :: 갓생러" description="습관기록 서비스" keywords="습관기록, 커뮤니티, 갓생러" />
            <SplashWrap>
                <div className="image star2">
                    <img src="/images/onboarding/Star_3.png" alt="star" />
                </div>
                <div className="image star1">
                    <img src="/images/onboarding/Star_2.png" alt="star" />
                </div>
                <div className="image star3">
                    <img src="/images/onboarding/Star_2.png" alt="star" />
                </div>
                <C.BtnOnBoardingWrap>
                    <C.BtnOnBoarding onClick={() => navigate('/login')}>로그인</C.BtnOnBoarding>
                    <C.BtnOnBoarding className="bgEmpty" onClick={() => navigate('/main')}>
                        둘러보기
                    </C.BtnOnBoarding>
                </C.BtnOnBoardingWrap>
                {showOnBoard && <OnBoarding setShowOnBoard={setShowOnBoard} />}
            </SplashWrap>
        </>
    );
};

const SplashWrap = styled.div`
    position: relative;
    height: 100vh;
    background: url('/images/onboarding/img_onboarding_bg.png') no-repeat;
    background-size: cover;
    /* 400px 이상인 경우에만 적용될 스타일 */
    @media screen and (min-width: 400px) {
        height: calc(100vh - 70px);
    }

    .image {
        position: absolute;

        width: 120px;
        height: 120px;
        &.star1 {
            width: 39px;
            height: 42px;
            top: 10%;
            left: 30%;
        }
        &.star2 {
            width: 65px;
            height: 84px;
            top: 50%;
            left: 10%;
        }

        &.star3 {
            width: 39px;
            height: 42px;
            top: 40%;
            right: 10%;
        }

        -webkit-animation-name: spin;
        -webkit-animation-duration: 4000ms;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-timing-function: linear;

        -moz-animation-name: spin;
        -moz-animation-duration: 4000ms;
        -moz-animation-iteration-count: infinite;
        -moz-animation-timing-function: linear;

        -ms-animation-name: spin;
        -ms-animation-duration: 4000ms;
        -ms-animation-iteration-count: infinite;
        -ms-animation-timing-function: linear;

        animation-name: spin;
        animation-duration: 4000ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear;

        @-ms-keyframes spin {
            from {
                -ms-transform: rotate(0deg);
            }
            to {
                -ms-transform: rotate(360deg);
            }
        }
        @-moz-keyframes spin {
            from {
                -moz-transform: rotate(0deg);
            }
            to {
                -moz-transform: rotate(360deg);
            }
        }
        @-webkit-keyframes spin {
            from {
                -webkit-transform: rotate(0deg);
            }
            to {
                -webkit-transform: rotate(360deg);
            }
        }
        @keyframes spin {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
    }
`;

export default Splash;
