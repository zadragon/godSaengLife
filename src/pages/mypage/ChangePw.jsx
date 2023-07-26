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

    const [newPassword, setNewPassword] = useState('');
    const [emailCode, setEmailCode] = useState('');

    const editPasswordBtn = async () => {
        try {
            await MypageApi.editPassword({ password: newPassword, authCode: emailCode });
            alert('비밀번호가 변경되었습니다.');
            navigate('/mypage');
        } catch (error) {
            if (error.response) {
                const statusCode = error.response.status;
                let errorMessage = '';
                switch (statusCode) {
                    case 400:
                        errorMessage = '비밀번호를 입력해주세요.';
                        break;
                    case 401:
                        errorMessage = '인증 코드를 입력하세요.';
                        break;
                    case 402:
                        errorMessage = '인증 코드가 일치하지 않습니다.';
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

    const sendEmailCodeBtn = async () => {
        try {
            await MypageApi.sendEmailCode({ password: newPassword });
            alert('가입하신 이메일로 인증코드를 전송했습니다.');
        } catch (error) {
            if (error.response) {
                const statusCode = error.response.status;
                let errorMessage = '';
                switch (statusCode) {
                    case 400:
                        errorMessage = '변경할 비밀번호를 입력하세요.';
                        break;
                    case 401:
                        errorMessage = '비밀번호는 영문, 숫자 4~20자리로 입력하세요.';
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
                <h2>비밀번호 변경</h2>
            </C.PageHeader>
            <M.Container>
                <M.SubjectFont style={{ marginTop: '12px' }}>새 비밀번호</M.SubjectFont>
                <M.Input
                    placeholder="새 비밀번호를 입력해주세요"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    type="password"
                ></M.Input>
                <button onClick={sendEmailCodeBtn}>인증코드 전송</button>
                <M.SubjectFont style={{ marginTop: '12px' }}>인증코드 입력</M.SubjectFont>
                <M.Input
                    placeholder="인증코드를 입력해주세요"
                    value={emailCode}
                    onChange={e => setEmailCode(e.target.value)}
                ></M.Input>
                <M.ButtonEditNickname
                    style={{ marginTop: '242px' }}
                    className={`${newPassword !== '' && emailCode !== '' ? 'active' : ''}`}
                    onClick={editPasswordBtn}
                >
                    <M.BadgeFont>수정</M.BadgeFont>
                </M.ButtonEditNickname>
            </M.Container>
            <Gnb />
        </div>
    );
}

export default ChangePw;
