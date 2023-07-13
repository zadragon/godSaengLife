import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import * as C from '../styles/common';

const Gnb = () => {
    const location = useLocation();
    const [cookies] = useCookies();

    return (
        <C.GnbBar>
            <ul>
                <li className={`home ${location.pathname == '/' && 'active'} `}>
                    <Link to="/">홈</Link>
                </li>
                <li className={`analyse ${location.pathname == '/analysis' && 'active'} `}>
                    {cookies.Authorization ? (
                        <Link to="/analysis">분석</Link>
                    ) : (
                        <Link onClick={() => alert('로그인이 필요한 서비스입니다.')}>분석</Link>
                    )}
                </li>
                <li className={`community ${location.pathname == '/communityList' && 'active'} `}>
                    <Link to="/communityList">나도갓생</Link>
                </li>
                <li className={`mypage ${location.pathname == '/mypage' && 'active'} `}>
                    {cookies.Authorization ? (
                        <Link to="/mypage">마이페이지</Link>
                    ) : (
                        <Link onClick={() => alert('로그인이 필요한 서비스입니다.')}>마이페이지</Link>
                    )}
                </li>
            </ul>
        </C.GnbBar>
    );
};

export default Gnb;
