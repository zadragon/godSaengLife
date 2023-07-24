import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as C from '../../styles/common';
import Gnb from '../../components/Gnb';
import * as M from '../../styles/mypage';
import { useQuery } from '@tanstack/react-query';
import { MypageApi } from '../../shared/api';
import { useCookies } from 'react-cookie';
import { useState } from 'react';

function Setting() {
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

    let profileImgSrc = '/images/profile/lv1.png';
    if (data?.data.totalPointScore >= 26 && data?.data.totalPointScore <= 75) {
        profileImgSrc = '/images/profile/lv2.png';
    } else if (data?.data.totalPointScore >= 76 && data?.data.totalPointScore <= 125) {
        profileImgSrc = '/images/profile/lv3.png';
    } else if (data?.data.totalPointScore >= 126 && data?.data.totalPointScore <= 175) {
        profileImgSrc = '/images/profile/lv4.png';
    } else if (data?.data.totalPointScore >= 176 && data?.data.totalPointScore <= 225) {
        profileImgSrc = '/images/profile/lv5.png';
    } else if (data?.data.totalPointScore >= 226 && data?.data.totalPointScore <= 275) {
        profileImgSrc = '/images/profile/lv6.png';
    } else if (data?.data.totalPointScore >= 276 && data?.data.totalPointScore <= 350) {
        profileImgSrc = '/images/profile/lv7.png';
    } else if (data?.data.totalPointScore >= 351) {
        profileImgSrc = '/images/profile/lv7.png';
    }
    return (
        <div>
            <C.PageHeader>
                <button className="btnPrev" onClick={() => navigate(-1)}>
                    <span className="hidden">뒤로가기</span>
                </button>
                <h2>닉네임 수정</h2>
                <Gnb />
            </C.PageHeader>
            <M.Container>
                <div className="ProfileImg">
                    <M.ProfileImg src={profileImgSrc} style={{ width: '120px', height: '120px' }} />
                </div>
                <M.SubjectFont style={{ marginTop: '12px' }}>닉네임</M.SubjectFont>
                <M.Input
                    placeholder={`${data?.data.user.nickname}`}
                    value={newNickname}
                    onChange={e => setNewNickname(e.target.value)}
                ></M.Input>
                <M.ButtonEditNickname
                    style={{ marginTop: '192px' }}
                    className={`${newNickname !== '' ? 'active' : ''}`}
                    onClick={editNicknameBtn}
                >
                    <M.BadgeFont>수정</M.BadgeFont>
                </M.ButtonEditNickname>
            </M.Container>
        </div>
    );
}

export default Setting;
