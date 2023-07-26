import React from 'react';
import * as C from '../../styles/common';
import * as M from '../../styles/mypage';
import Gnb from '../../components/Gnb';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { MypageApi } from '../../shared/api';

function Badge() {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies();

    const { data, isLoading, isError, isSuccess, refetch } = useQuery(['getMypage'], () =>
        MypageApi.getMypage(cookies.Authorization)
    );
    console.log('마이페이지badge:', data);

    return (
        <div>
            <C.PageHeader>
                <button className="btnPrev" onClick={() => navigate('/mypage')}>
                    <span className="hidden">뒤로가기</span>
                </button>
                <h2>획득한 갓생 뱃지</h2>
            </C.PageHeader>
            <M.Container>
                <M.BadgeContainer>
                    {data?.data.user.totalPointScore === undefined && (
                        <>
                            <img src="/images/profile/lv1gray.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv2gray.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv3gray.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv4gray.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv5gray.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv6gray.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv7gray.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv8gray.svg" style={{ width: '84px', height: '84px' }} />
                        </>
                    )}
                    {data?.data.user.totalPointScore <= 25 && (
                        <>
                            <img src="/images/profile/lv1.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv2gray.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv3gray.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv4gray.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv5gray.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv6gray.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv7gray.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv8gray.svg" style={{ width: '84px', height: '84px' }} />
                        </>
                    )}
                    {data?.data.user.totalPointScore >= 26 && data?.data.user.totalPointScore <= 75 && (
                        <>
                            <img src="/images/profile/lv1.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv2.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv3gray.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv4gray.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv5gray.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv6gray.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv7gray.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv8gray.svg" style={{ width: '84px', height: '84px' }} />
                        </>
                    )}
                    {data?.data.user.totalPointScore >= 76 && data?.data.user.totalPointScore <= 125 && (
                        <>
                            <img src="/images/profile/lv1.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv2.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv3.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv4gray.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv5gray.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv6gray.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv7gray.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv8gray.svg" style={{ width: '84px', height: '84px' }} />
                        </>
                    )}
                    {data?.data.user.totalPointScore >= 125 && data?.data.user.totalPointScore <= 175 && (
                        <>
                            <img src="/images/profile/lv1.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv2.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv3.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv4.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv5gray.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv6gray.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv7gray.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv8gray.svg" style={{ width: '84px', height: '84px' }} />
                        </>
                    )}
                    {data?.data.user.totalPointScore >= 176 && data?.data.user.totalPointScore <= 225 && (
                        <>
                            <img src="/images/profile/lv1.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv2.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv3.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv4.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv5.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv6gray.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv7gray.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv8gray.svg" style={{ width: '84px', height: '84px' }} />
                        </>
                    )}
                    {data?.data.user.totalPointScore >= 226 && data?.data.user.totalPointScore <= 275 && (
                        <>
                            <img src="/images/profile/lv1.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv2.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv3.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv4.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv5.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv6.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv7gray.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv8gray.svg" style={{ width: '84px', height: '84px' }} />
                        </>
                    )}
                    {data?.data.user.totalPointScore >= 276 && data?.data.user.totalPointScore <= 350 && (
                        <>
                            <img src="/images/profile/lv1.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv2.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv3.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv4.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv5.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv6.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv7.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv8gray.svg" style={{ width: '84px', height: '84px' }} />
                        </>
                    )}
                    {data?.data.user.totalPointScore >= 351 && (
                        <>
                            <img src="/images/profile/lv1.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv2.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv3.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv4.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv5.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv6.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv7.svg" style={{ width: '84px', height: '84px' }} />
                            <img src="/images/profile/lv8.svg" style={{ width: '84px', height: '84px' }} />
                        </>
                    )}
                </M.BadgeContainer>
            </M.Container>
            <M.Container style={{ paddingBottom: '72px' }}>
                <M.BadgeContentContainer
                    className="1"
                    style={
                        data?.data.user.totalPointScore <= 25
                            ? { backgroundColor: '#F7FFE2' }
                            : { backgroundColor: '#F8F8F9' }
                    }
                >
                    <M.FlexContainer style={{ justifyContent: 'space-between' }}>
                        <div>
                            <M.FlexContainer>
                                <img src="/images/profile/lv1.svg" style={{ width: '24px', height: '24px' }} />
                                <M.BadgeFont style={{ marginLeft: '8px', color: 'var(--neutral-700, #393e4f)' }}>
                                    갓생별
                                </M.BadgeFont>
                            </M.FlexContainer>
                            <M.BadgeContent style={{ marginLeft: '32px', marginTop: '4px' }}>
                                5번 이하 접속, 포인트 25점 이하
                            </M.BadgeContent>
                        </div>
                        <M.LvFontBg>
                            <M.LvFont style={{ color: 'var(--neutral-700, #393E4F)' }}>Lv.1</M.LvFont>
                        </M.LvFontBg>
                    </M.FlexContainer>
                </M.BadgeContentContainer>
                <M.BadgeContentContainer
                    className="2"
                    style={
                        data?.data.user.totalPointScore > 25 && data?.data.user.totalPointScore <= 75
                            ? { backgroundColor: '#F7FFE2' }
                            : { backgroundColor: '#F8F8F9' }
                    }
                >
                    <M.FlexContainer style={{ justifyContent: 'space-between' }}>
                        <div>
                            <M.FlexContainer>
                                <img src="/images/profile/lv2.svg" style={{ width: '24px', height: '24px' }} />
                                <M.BadgeFont style={{ marginLeft: '8px', color: 'var(--neutral-700, #393e4f)' }}>
                                    화성으로 이사
                                </M.BadgeFont>
                            </M.FlexContainer>
                            <M.BadgeContent style={{ marginLeft: '32px', marginTop: '4px' }}>
                                5 - 10번 접속, 포인트 26 - 75점
                            </M.BadgeContent>
                        </div>
                        <M.LvFontBg>
                            <M.LvFont style={{ color: 'var(--neutral-700, #393E4F)' }}>Lv.2</M.LvFont>
                        </M.LvFontBg>
                    </M.FlexContainer>
                </M.BadgeContentContainer>
                <M.BadgeContentContainer
                    className="3"
                    style={
                        data?.data.user.totalPointScore > 75 && data?.data.user.totalPointScore <= 125
                            ? { backgroundColor: '#F7FFE2' }
                            : { backgroundColor: '#F8F8F9' }
                    }
                >
                    <M.FlexContainer style={{ justifyContent: 'space-between' }}>
                        <div>
                            <M.FlexContainer>
                                <img src="/images/profile/lv3.svg" style={{ width: '24px', height: '24px' }} />
                                <M.BadgeFont style={{ marginLeft: '8px', color: 'var(--neutral-700, #393e4f)' }}>
                                    지구 정복
                                </M.BadgeFont>
                            </M.FlexContainer>
                            <M.BadgeContent style={{ marginLeft: '32px', marginTop: '4px' }}>
                                10번 이상 접속, 포인트 76 - 125점
                            </M.BadgeContent>
                        </div>
                        <M.LvFontBg>
                            <M.LvFont style={{ color: 'var(--neutral-700, #393E4F)' }}>Lv.3</M.LvFont>
                        </M.LvFontBg>
                    </M.FlexContainer>
                </M.BadgeContentContainer>
                <M.BadgeContentContainer
                    className="4"
                    style={
                        data?.data.user.totalPointScore > 125 && data?.data.user.totalPointScore <= 175
                            ? { backgroundColor: '#F7FFE2' }
                            : { backgroundColor: '#F8F8F9' }
                    }
                >
                    <M.FlexContainer style={{ justifyContent: 'space-between' }}>
                        <div>
                            <M.FlexContainer>
                                <img src="/images/profile/lv4.svg" style={{ width: '24px', height: '24px' }} />
                                <M.BadgeFont style={{ marginLeft: '8px', color: 'var(--neutral-700, #393e4f)' }}>
                                    금성에서 정착
                                </M.BadgeFont>
                            </M.FlexContainer>
                            <M.BadgeContent style={{ marginLeft: '32px', marginTop: '4px' }}>
                                10번 이상 접속, 포인트 126 - 175점
                            </M.BadgeContent>
                        </div>
                        <M.LvFontBg>
                            <M.LvFont style={{ color: 'var(--neutral-700, #393E4F)' }}>Lv.4</M.LvFont>
                        </M.LvFontBg>
                    </M.FlexContainer>
                </M.BadgeContentContainer>
                <M.BadgeContentContainer
                    className="5"
                    style={
                        data?.data.user.totalPointScore > 175 && data?.data.user.totalPointScore <= 225
                            ? { backgroundColor: '#F7FFE2' }
                            : { backgroundColor: '#F8F8F9' }
                    }
                >
                    <M.FlexContainer style={{ justifyContent: 'space-between' }}>
                        <div>
                            <M.FlexContainer>
                                <img src="/images/profile/lv5.svg" style={{ width: '24px', height: '24px' }} />
                                <M.BadgeFont style={{ marginLeft: '8px', color: 'var(--neutral-700, #393e4f)' }}>
                                    갓생성 탐구
                                </M.BadgeFont>
                            </M.FlexContainer>
                            <M.BadgeContent style={{ marginLeft: '32px', marginTop: '4px' }}>
                                10번 이상 접속, 포인트 176 - 225점
                            </M.BadgeContent>
                        </div>
                        <M.LvFontBg>
                            <M.LvFont style={{ color: 'var(--neutral-700, #393E4F)' }}>Lv.5</M.LvFont>
                        </M.LvFontBg>
                    </M.FlexContainer>
                </M.BadgeContentContainer>
                <M.BadgeContentContainer
                    className="6"
                    style={
                        data?.data.user.totalPointScore > 225 && data?.data.user.totalPointScore <= 275
                            ? { backgroundColor: '#F7FFE2' }
                            : { backgroundColor: '#F8F8F9' }
                    }
                >
                    <M.FlexContainer style={{ justifyContent: 'space-between' }}>
                        <div>
                            <M.FlexContainer>
                                <img src="/images/profile/lv6.svg" style={{ width: '24px', height: '24px' }} />
                                <M.BadgeFont style={{ marginLeft: '8px', color: 'var(--neutral-700, #393e4f)' }}>
                                    갓생성 출발
                                </M.BadgeFont>
                            </M.FlexContainer>
                            <M.BadgeContent style={{ marginLeft: '32px', marginTop: '4px' }}>
                                10번 이상 접속, 포인트 226 - 275점
                            </M.BadgeContent>
                        </div>
                        <M.LvFontBg>
                            <M.LvFont style={{ color: 'var(--neutral-700, #393E4F)' }}>Lv.6</M.LvFont>
                        </M.LvFontBg>
                    </M.FlexContainer>
                </M.BadgeContentContainer>
                <M.BadgeContentContainer
                    className="7"
                    style={
                        data?.data.user.totalPointScore > 275 && data?.data.user.totalPointScore <= 350
                            ? { backgroundColor: '#F7FFE2' }
                            : { backgroundColor: '#F8F8F9' }
                    }
                >
                    <M.FlexContainer style={{ justifyContent: 'space-between' }}>
                        <div>
                            <M.FlexContainer>
                                <img src="/images/profile/lv7.svg" style={{ width: '24px', height: '24px' }} />
                                <M.BadgeFont style={{ marginLeft: '8px', color: 'var(--neutral-700, #393e4f)' }}>
                                    갓생성 도착
                                </M.BadgeFont>
                            </M.FlexContainer>
                            <M.BadgeContent style={{ marginLeft: '32px', marginTop: '4px' }}>
                                10번 이상 접속, 포인트 276 - 350점
                            </M.BadgeContent>
                        </div>
                        <M.LvFontBg>
                            <M.LvFont style={{ color: 'var(--neutral-700, #393E4F)' }}>Lv.7</M.LvFont>
                        </M.LvFontBg>
                    </M.FlexContainer>
                </M.BadgeContentContainer>
                <M.BadgeContentContainer
                    className="8"
                    style={
                        data?.data.user.totalPointScore > 350
                            ? { backgroundColor: '#F7FFE2' }
                            : { backgroundColor: '#F8F8F9' }
                    }
                >
                    <M.FlexContainer style={{ justifyContent: 'space-between' }}>
                        <div>
                            <M.FlexContainer>
                                <img src="/images/profile/lv8.svg" style={{ width: '24px', height: '24px' }} />
                                <M.BadgeFont style={{ marginLeft: '8px', color: 'var(--neutral-700, #393e4f)' }}>
                                    갓생성 정복자
                                </M.BadgeFont>
                            </M.FlexContainer>
                            <M.BadgeContent style={{ marginLeft: '32px', marginTop: '4px' }}>
                                10번 이상 접속, 포인트 351점 이상
                            </M.BadgeContent>
                        </div>
                        <M.LvFontBg>
                            <M.LvFont style={{ color: 'var(--neutral-700, #393E4F)' }}>Lv.8</M.LvFont>
                        </M.LvFontBg>
                    </M.FlexContainer>
                </M.BadgeContentContainer>
            </M.Container>
        </div>
    );
}

export default Badge;
