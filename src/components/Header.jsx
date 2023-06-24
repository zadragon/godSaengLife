import React, { useCallback, useEffect, useRef } from 'react';
import { AuthApi } from '../shared/api';
import { useCookies } from 'react-cookie';
import ReactCanvasConfetti from 'react-canvas-confetti';
import { Link, useNavigate } from 'react-router-dom';
import * as C from '../styles/common';

const Header = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();
    const logout = () => {
        AuthApi.signout(cookies.Authorization);
        removeCookie('Authorization');
        navigate('/splash');
    };

    return (
        <C.Header>
            <p className="txtWelcome">환영합니다🎉 {cookies.Authorization ? '갓생러 님' : '방문자님 🤗'}</p>
            {cookies.Authorization ? (
                <span className="signInOut" onClick={logout}>
                    로그아웃
                </span>
            ) : (
                <Link to="login" className="signInOut">
                    로그인 하러가기
                </Link>
            )}

            <div className="imsi">
                <h1>
                    <Link to="/">홈으로 가기</Link>
                </h1>
            </div>
        </C.Header>
    );
};

export default Header;
