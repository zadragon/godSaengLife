import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as C from '../../styles/common';
import Gnb from '../../components/Gnb';
import * as M from '../../styles/mypage';
import { useQuery } from '@tanstack/react-query';
import { MypageApi } from '../../shared/api';
import { useCookies } from 'react-cookie';
import { useState } from 'react';

function ChangePw() {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies();
    const { data, isLoading, isError, isSuccess, refetch } = useQuery(['getMypage'], () =>
        MypageApi.getMypage(cookies.Authorization)
    );

    const [newNickname, setNewNickname] = useState('');

    const editNicknameBtn = async () => {
        try {
            await MypageApi.editNickname({ nickname: newNickname });
            alert('닉네임이 수정되었습니다.');
            navigate('/mypage');
        } catch (error) {
            console.log('닉네임 수정 실패', error);
            if (error.response) {
                const statusCode = error.response.status;
                let errorMessage = '';
                switch (statusCode) {
                    case 400:
                        errorMessage = '닉네임을 입력해주세요.';
                        break;
                    case 401:
                        errorMessage = '닉네임은 한글, 영문, 숫자 1~8자리로 입력해주세요.';
                        break;
                    case 409:
                        errorMessage = '이미 존재하는 닉네임입니다.';
                        break;
                    case 500:
                        errorMessage = '서버 에러';
                        break;
                    default:
                        errorMessage = '알 수 없는 에러가 발생했습니다.';
                }
                alert(errorMessage);
            }
        }
    };

    return (
        <div>
            <C.PageHeader>
                <button className="btnPrev" onClick={() => navigate(-1)}>
                    <span className="hidden">뒤로가기</span>
                </button>
                <h2>비밀번호 수정</h2>
                <Gnb />
            </C.PageHeader>
            <M.Container>
                <M.SubjectFont style={{ marginTop: '12px' }}>현재 비밀번호</M.SubjectFont>
                <M.Input
                    placeholder="현재 비밀번호"
                    value={newNickname}
                    onChange={e => setNewNickname(e.target.value)}
                ></M.Input>
                <M.ButtonEditNickname style={{ marginTop: '292px' }} onClick={editNicknameBtn}>
                    <M.BadgeFont style={{ color: 'var(--neutral-400, #AAACB3)' }}>수정</M.BadgeFont>
                </M.ButtonEditNickname>
            </M.Container>
        </div>
    );
}

export default ChangePw;
