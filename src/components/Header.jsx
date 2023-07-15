import React from 'react';
import { MainApi } from '../shared/api';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import * as C from '../styles/common';
import { useQuery } from '@tanstack/react-query';

const Header = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();
    const logout = () => {
        removeCookie('Authorization');
        navigate('/');
    };

    const { data, isLoading, isError, isSuccess, refetch } = useQuery(['getProfile'], () => MainApi.getProfile());
    isLoading && '로딩중';
    isError && '에러발생';
    return (
        <C.Header>
            <p className="txtWelcome">
                환영합니다🎉 {cookies.Authorization ? `${data && data?.data.user.nickname}님 🤗` : '방문자님 🤗'}
            </p>
            {cookies.Authorization ? (
                <span className="signInOut" onClick={logout}>
                    로그아웃
                </span>
            ) : (
                <Link to="login" className="signInOut">
                    로그인 하러가기
                </Link>
            )}
        </C.Header>
    );
};

export default Header;
