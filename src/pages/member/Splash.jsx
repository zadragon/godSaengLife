import React, { useEffect } from 'react';
import OnBoarding from '../../components/onBoarding/OnBoarding';
import { useState } from 'react';
import * as C from '../../styles/common';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Splash = () => {
    const [showOnBoard, setShowOnBoard] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const showOnBoardState = localStorage.getItem('showOnBoard');
        showOnBoardState ? setShowOnBoard(JSON.parse(showOnBoardState)) : setShowOnBoard(true);
    }, []);

    return (
        <SplashWrap>
            <C.BtnOnBoardingWrap>
                <C.BtnOnBoarding onClick={() => navigate('/login')}>로그인</C.BtnOnBoarding>
                <C.BtnOnBoarding className="bgEmpty" onClick={() => navigate('/')}>
                    둘러보기
                </C.BtnOnBoarding>
            </C.BtnOnBoardingWrap>
            {showOnBoard && <OnBoarding setShowOnBoard={setShowOnBoard} />}
        </SplashWrap>
    );
};

const SplashWrap = styled.div`
    position: relative;
    height: calc(100vh - 70px);
    background: url('/images/onboarding/img_onboarding_bg.png') no-repeat;
    background-size: 100% auto;
`;

export default Splash;
