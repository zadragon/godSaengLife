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
            console.log('탈퇴 성공');
        }
    };
    console.log('마이페이지data:', data);
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
                        <M.FlexContainer style={{ marginBottom: '12px' }}>
                            <LvImg
                                style={{ width: '48px', height: '48px' }}
                                totalPointScore={data?.data.totalPointScore}
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
                                <LvNumber totalPointScore={data?.data.totalPointScore} />
                            </Link>
                        </M.Font>
                    </M.Between>
                </div>
                <div>
                    {/* <M.Between style={{ marginBottom: '12px' }}> */}
                    <Link to="/mypage/sharedfeed" className="settings">
                        <M.Between style={{ marginBottom: '12px' }}>
                            <M.SubjectFont>커뮤니티에 올린 피드</M.SubjectFont>
                            <div>＞</div>
                        </M.Between>
                    </Link>

                    {
                        data?.data.sharedShares.length === 0 || data === undefined ? (
                            <M.Graybg>
                                <img src="/images/icons/img-noPictures.png" style={{ width: '48px', height: '48px' }} />
                                <M.Font style={{ color: 'var(--neutral-400, #aaacb3)' }}>피드가 없어요</M.Font>
                            </M.Graybg>
                        ) : null
                        // <div>
                        //     {data?.data.sharedShares.slice(0, 3).map((item, index) => (
                        //         // <img key={index} src={item.imagePath} style={{ width: '100%', height: '100%' }} />
                        //         <p key={index}>{item.title}</p>
                        //     ))}
                        // </div>
                    }
                </div>
                <div>
                    <Link to="/mypage/likedfeed" className="settings">
                        <M.Between style={{ marginBottom: '12px' }}>
                            <M.SubjectFont>좋아요한 피드</M.SubjectFont>
                            <div>＞</div>
                        </M.Between>
                    </Link>
                    {/* <M.Graybg style={{ marginBottom: '20px' }}>
                        <img src="/images/icons/img-noPictures.png" style={{ width: '48px', height: '48px' }} />
                        <M.Font style={{ color: 'var(--neutral-400, #aaacb3)' }}>피드가 없어요</M.Font>
                    </M.Graybg> */}
                    {data?.data.likedShares.length === 0 || data === undefined ? (
                        <M.Graybg>
                            <img src="/images/icons/img-noPictures.png" style={{ width: '48px', height: '48px' }} />
                            <M.Font style={{ color: 'var(--neutral-400, #aaacb3)' }}>피드가 없어요</M.Font>
                        </M.Graybg>
                    ) : (
                        <div></div>
                        // <div>
                        //     {data?.data.sharedShares.slice(0, 3).map((item, index) => (
                        //         // <img key={index} src={item.imagePath} style={{ width: '100%', height: '100%' }} />
                        //         <p key={index}>{item.title}</p>
                        //     ))}
                        // </div>
                    )}
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
            </M.Container>

            <Gnb />
        </div>
    );
}

export default Mypage;
