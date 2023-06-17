import React from 'react';
import { AuthApi } from '../shared/api';
import { useCookies } from 'react-cookie';

const Header = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const logout = () => {
        AuthApi.signout(cookies.token);
        removeCookie('Authorization');
    };
    return (
        <div>
            <h1>갓생러헤더</h1>
            <button onClick={logout}>로그아웃</button>
            <hr />
        </div>
    );
};

export default Header;
