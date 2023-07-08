import React from 'react';
import * as C from '../../styles/common';
import * as M from '../../styles/mypage';
import Gnb from '../../components/Gnb';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MypageApi, AuthApi } from '../../shared/api';
import { useCookies } from 'react-cookie';

function Mypage() {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies();

    const handleWithdrawal = async () => {
        try {
            await AuthApi.withdrawal();
            alert('회원에서 탈퇴하셨습니다.');
            removeCookie('Authorization');
            navigate('/');
            console.log('탈퇴 성공');
        } catch (error) {
            console.log(error);
        }
    };
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
                        <M.FlexContainer>
                            <img
                                src="/images/profile/lv1.png"
                                className="profileImg"
                                style={{ width: '48px', height: '48px' }}
                            />
                            <M.NicknameFont>갓생러</M.NicknameFont>
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
                                Lv.1 ＞
                            </Link>
                        </M.Font>
                    </M.Between>
                </div>
                <div>
                    <M.Between>
                        <M.SubjectFont>커뮤니티에 올린 피드</M.SubjectFont>
                        <div>＞</div>
                    </M.Between>
                    <M.Graybg>
                        <img src="/images/icons/img-noPictures.png" style={{ width: '48px', height: '48px' }} />
                        <M.Font style={{ color: 'var(--neutral-400, #aaacb3)' }}>사진이 없어요</M.Font>
                    </M.Graybg>
                </div>
                <div>
                    <M.Between>
                        <M.SubjectFont>좋아요한 피드</M.SubjectFont>
                        <div>＞</div>
                    </M.Between>
                    <M.Graybg>
                        <img src="/images/icons/img-noPictures.png" style={{ width: '48px', height: '48px' }} />
                        <M.Font style={{ color: 'var(--neutral-400, #aaacb3)' }}>사진이 없어요</M.Font>
                    </M.Graybg>
                </div>
                <M.ContainerBottom>
                    <div>
                        <M.SubjectFont>이메일 주소</M.SubjectFont>
                        <M.Font style={{ color: 'var(--neutral-500, #727580)' }}>godsaeng1234@naver.com</M.Font>
                    </div>
                    <M.Between>
                        <M.SubjectFont>비밀번호 변경</M.SubjectFont>
                        <div>＞</div>
                    </M.Between>
                    <M.Between>
                        <M.SubjectFont>의견 보내기</M.SubjectFont>
                        <div>＞</div>
                    </M.Between>
                    <M.Between>
                        <M.SubjectFont onClick={handleWithdrawal}>탈퇴하기</M.SubjectFont>
                        <div>＞</div>
                    </M.Between>
                </M.ContainerBottom>
                <Gnb />
            </M.Container>
        </div>
    );
}

export default Mypage;
