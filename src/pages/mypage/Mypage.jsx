import React from 'react';
import * as C from '../../styles/common';
import Gnb from '../../components/Gnb';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MypageApi } from '../../shared/api';
import { useCookies } from 'react-cookie';

function Mypage() {
    const navigate = useNavigate();
    const [cookies] = useCookies();
    const { data, isLoading, isError, isSuccess, refetch } = useQuery(['getMain'], () =>
        MypageApi.getMypage(cookies.Authorization)
    );
    return (
        <div>
            <C.PageHeader>
                <button className="btnPrev" onClick={() => navigate(-1)}>
                    <span className="hidden">뒤로가기</span>
                </button>
                <h2>마이페이지</h2>
            </C.PageHeader>
            <img src="/images/icons/icon-settings.svg" />
            <Gnb />
        </div>
    );
}

export default Mypage;
