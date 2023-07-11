import React from 'react';
import * as C from '../../styles/common';
import * as M from '../../styles/mypage';
import Gnb from '../../components/Gnb';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MypageApi, AuthApi } from '../../shared/api';
import { useCookies } from 'react-cookie';
import { useState } from 'react';

function Mypage() {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies();

    const { data, isLoading, isError, isSuccess, refetch } = useQuery(['getMypage'], () =>
        MypageApi.getMypage(cookies.Authorization)
    );

    // const handleWithdrawal = async () => {
    //     try {
    //         await AuthApi.withdrawal();
    //         alert('회원에서 탈퇴하셨습니다.');
    //         removeCookie('Authorization');
    //         navigate('/');
    //         console.log('탈퇴 성공');
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const handleWithdrawal = async () => {
        if (!confirm('정말 탈퇴하시겠습니까?')) {
            alert('취소를 누르셨습니다.');
        } else {
            await AuthApi.withdrawal();
            alert('회원에서 탈퇴하셨습니다.');
            removeCookie('Authorization');
            navigate('/');
            console.log('탈퇴 성공');
        }
    };
    console.log('마이페이지data:', data);
    return (
        <div>
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
                        <M.FlexContainer style={{ marginBottom: '12px' }}>
                            <img
                                src={
                                    data?.data.totalPointScore === undefined
                                        ? '/images/profile/lv1gray.png'
                                        : data?.data.totalPointScore <= 25
                                        ? '/images/profile/lv1.png'
                                        : data?.data.totalPointScore <= 75
                                        ? '/images/profile/lv2.png'
                                        : data?.data.totalPointScore <= 125
                                        ? '/images/profile/lv3.png'
                                        : data?.data.totalPointScore <= 175
                                        ? '/images/profile/lv4.png'
                                        : data?.data.totalPointScore <= 225
                                        ? '/images/profile/lv5.png'
                                        : data?.data.totalPointScore <= 275
                                        ? '/images/profile/lv6.png'
                                        : data?.data.totalPointScore <= 350
                                        ? '/images/profile/lv7.png'
                                        : '/images/profile/lv8.png'
                                }
                                className="profileImg"
                                style={{ width: '48px', height: '48px' }}
                            />
                            <M.NicknameFont>{data?.data.user.nickname}</M.NicknameFont>
                        </M.FlexContainer>
                        <M.Font
                            style={{
                                width: '65px',
                                height: '36px',
                                backgroundColor: '#F7FFE2',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Link
                                to="/mypage/badge"
                                className="settings"
                                style={{ color: 'var(--neutral-700, #393e4f)' }}
                            >
                                {data?.data.totalPointScore === undefined
                                    ? 'Lv.? ＞'
                                    : data?.data.totalPointScore <= 25
                                    ? 'Lv.1 ＞'
                                    : data?.data.totalPointScore <= 75
                                    ? 'Lv.2 ＞'
                                    : data?.data.totalPointScore <= 125
                                    ? 'Lv.3 ＞'
                                    : data?.data.totalPointScore <= 175
                                    ? 'Lv.4 ＞'
                                    : data?.data.totalPointScore <= 225
                                    ? 'Lv.5 ＞'
                                    : data?.data.totalPointScore <= 275
                                    ? 'Lv.6 ＞'
                                    : data?.data.totalPointScore <= 350
                                    ? 'Lv.7 ＞'
                                    : 'Lv.8 ＞'}
                            </Link>
                        </M.Font>
                    </M.Between>
                </div>
                <div>
                    <M.Between style={{ marginBottom: '12px' }}>
                        <M.SubjectFont>커뮤니티에 올린 피드</M.SubjectFont>
                        <div>＞</div>
                    </M.Between>
                    {data?.data.sharedShares.length === 0 || data === undefined ? (
                        <M.Graybg>
                            <img src="/images/icons/img-noPictures.png" style={{ width: '48px', height: '48px' }} />
                            <M.Font style={{ color: 'var(--neutral-400, #aaacb3)' }}>사진이 없어요</M.Font>
                        </M.Graybg>
                    ) : (
                        <M.Frame>
                            {data?.data.sharedShares.slice(0, 3).map((item, index) => (
                                <img key={index} src={item.imagePath} style={{ width: '100%', height: '100%' }} />
                            ))}
                        </M.Frame>
                    )}
                </div>
                <div>
                    <M.Between style={{ marginBottom: '12px', marginTop: '20px' }}>
                        <M.SubjectFont s>좋아요한 피드</M.SubjectFont>
                        <div>＞</div>
                    </M.Between>
                    <M.Graybg style={{ marginBottom: '20px' }}>
                        <img src="/images/icons/img-noPictures.png" style={{ width: '48px', height: '48px' }} />
                        <M.Font style={{ color: 'var(--neutral-400, #aaacb3)' }}>사진이 없어요</M.Font>
                    </M.Graybg>
                </div>
                <M.ContainerBottom>
                    <div>
                        <M.SubjectFont>이메일 주소</M.SubjectFont>
                        <M.Font style={{ color: 'var(--neutral-500, #727580)' }}>{data?.data.user.email}</M.Font>
                    </div>
                    <div>
                        <Link to="/mypage/password">
                            <M.Between>
                                <M.SubjectFont>비밀번호 변경</M.SubjectFont>
                                <div>＞</div>
                            </M.Between>
                        </Link>
                    </div>
                    <M.Between>
                        <M.SubjectFont>의견 보내기</M.SubjectFont>
                        <div>＞</div>
                    </M.Between>
                    <M.Between onClick={handleWithdrawal}>
                        <M.SubjectFont>탈퇴하기</M.SubjectFont>
                        <div>＞</div>
                    </M.Between>
                </M.ContainerBottom>
                <Gnb />
            </M.Container>
        </div>
    );
}

export default Mypage;
