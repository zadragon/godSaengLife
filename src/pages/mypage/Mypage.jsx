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
                <button className="btnPrev" onClick={() => navigate(-1)}>
                    <span className="hidden">뒤로가기</span>
                </button>
                <h2>마이페이지</h2>
            </C.PageHeader>

            <div>
                <Link to="/mypage/nickname" className="settings">
                    <img src="/images/icons/icon-settings.svg" />
                </Link>
                <div>
                    <img src="/images/profile/lv1.png" className="profileImg" /> <p>갓생러</p> <div>Lv.1 ＞</div>
                </div>
            </div>
            <div>
                <div>
                    <div>커뮤니티에 올린 피드</div>
                    <div>＞</div>
                </div>
                <div>
                    <img src="/images/icons/img-noPictures.png" />
                    <p>사진이 없어요</p>
                </div>
            </div>
            <div>
                <div>
                    <div>좋아요한 피드</div>
                    <div>＞</div>
                </div>
                <div>
                    <img src="/images/icons/img-noPictures.png" />
                    <p>사진이 없어요</p>
                </div>
            </div>
            <div>이메일 주소</div>
            <M.EmailFont>godsaeng1234@naver.com</M.EmailFont>
            <div>비밀번호 변경</div>
            <button onClick={handleWithdrawal}>회원탈퇴</button>
            <Gnb />
        </div>
    );
}

export default Mypage;
