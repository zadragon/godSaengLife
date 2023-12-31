import React from 'react';
import * as C from '../../styles/common';
import * as M from '../../styles/mypage';
import Gnb from '../../components/Gnb';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MypageApi, AuthApi } from '../../shared/api';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import LvImg from '../../components/common/LvImg';
import LvNumber from '../../components/common/LvNumber';
import MetaTag from '../../components/MetaTag';

function Mypage() {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies();

    const { data, isLoading, isError, isSuccess, refetch } = useQuery(['getMypage'], () =>
        MypageApi.getMypage(cookies.Authorization)
    );

    const handleWithdrawal = async () => {
        if (!confirm('정말 탈퇴하시겠습니까?')) {
            alert('취소를 누르셨습니다.');
        } else {
            await AuthApi.withdrawal();
            alert('회원에서 탈퇴하셨습니다.');
            removeCookie('Authorization');
            navigate('/');
        }
    };
    return (
        <div>
            <MetaTag title="마이페이지 :: 갓생러" description="습관기록 서비스" keywords="습관기록, 커뮤니티, 갓생러" />
            <C.PageHeader>
                <button className="btnPrev" onClick={() => navigate('/')}>
                    <span className="hidden">뒤로가기</span>
                </button>
                <h2>마이페이지</h2>
            </C.PageHeader>
            <M.Container>
                <div>
                    <M.RightAligned>
                        <Link to="/mypage/nickname" className="settings">
                            <img src="/images/icons/icon-settings.svg" />
                        </Link>
                    </M.RightAligned>
                    <M.Between>
                        <M.FlexContainer style={{ marginBottom: '12px', gap: '8px' }}>
                            <LvImg
                                style={{ width: '48px', height: '48px', boxShadow: 'none' }}
                                totalPointScore={data?.data.user.totalPointScore}
                            />
                            <M.NicknameFont>{data?.data.user.nickname}</M.NicknameFont>
                        </M.FlexContainer>
                        <M.Font
                            style={{
                                width: 'auto',
                                height: '36px',
                                backgroundColor: '#F7FFE2',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '0 8px 0 10px',
                                borderRadius: '4px',
                            }}
                        >
                            <Link
                                to="/mypage/badge"
                                className="settings"
                                style={{
                                    width: '100%',
                                    color: '#393e4f',
                                    paddingRight: '15px',
                                    background: "url('/images/icons/icon-arrow-right1.svg') no-repeat right center",
                                }}
                            >
                                <LvNumber
                                    style={{
                                        font: "var(--description-medium, 500 12px/16px 'Pretendard', sans-serif)",
                                    }}
                                    totalPointScore={data?.data.user.totalPointScore}
                                />
                            </Link>
                        </M.Font>
                    </M.Between>
                </div>
                <div>
                    {/* <M.Between style={{ marginBottom: '12px' }}> */}
                    <Link to="/mypage/sharedfeed" className="settings">
                        <M.Between style={{ marginBottom: '12px' }}>
                            <M.SubjectFont>커뮤니티에 올린 피드</M.SubjectFont>
                        </M.Between>
                    </Link>
                </div>
                <div>
                    <Link to="/mypage/likedfeed" className="settings">
                        <M.Between style={{ marginBottom: '12px' }}>
                            <M.SubjectFont>좋아요한 피드</M.SubjectFont>
                        </M.Between>
                    </Link>
                </div>
                <M.ContainerBottom>
                    <div style={{ borderTop: '0.3px solid var(--neutral-300, #D5D6D9)' }}>
                        <M.SubjectFont style={{ marginTop: '24px' }}>이메일 주소</M.SubjectFont>
                        <M.Font style={{ color: 'var(--neutral-500, #727580)' }}>{data?.data.user.email}</M.Font>
                    </div>
                    <div>
                        <Link to="/mypage/password">
                            <M.Between>
                                <M.SubjectFont>비밀번호 변경</M.SubjectFont>
                            </M.Between>
                        </Link>
                    </div>
                    <M.Between onClick={() => alert('준비중입니다.')}>
                        <M.SubjectFont>의견 보내기</M.SubjectFont>
                    </M.Between>
                    <M.Between onClick={handleWithdrawal}>
                        <M.SubjectFont>탈퇴하기</M.SubjectFont>
                    </M.Between>
                </M.ContainerBottom>
            </M.Container>
            <Gnb />
        </div>
    );
}

export default Mypage;
