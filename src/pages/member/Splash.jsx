import React, { useEffect } from 'react';
import OnBoarding from '../../components/onBoarding/OnBoarding';
import { useState } from 'react';
import * as C from '../../styles/common';
import { styled } from 'styled-components';
import { useNavigate, redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';

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
        <SplashWrap>
            <C.BtnOnBoardingWrap>
                <C.BtnOnBoarding onClick={() => navigate('/login')}>로그인</C.BtnOnBoarding>
                <C.BtnOnBoarding className="bgEmpty" onClick={() => navigate('/main')}>
                    둘러보기
                </C.BtnOnBoarding>
            </C.BtnOnBoardingWrap>
            {showOnBoard && <OnBoarding setShowOnBoard={setShowOnBoard} />}
        </SplashWrap>
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
`;

export default Splash;
