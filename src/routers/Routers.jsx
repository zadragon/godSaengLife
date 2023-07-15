import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Layout from '../pages/Layout';
import Analysis from '../pages/analysis/Analysis';
import { JoinDone, Login, Signup, Splash } from '../pages/member/';
import { EditFeed, AllImgList, Writetoday } from '../pages/post';
import { Mypage, Setting, Badge, ChangePw } from '../pages/mypage';
import { AddArticle, CommunityList, CommunityDetail } from '../pages/community';
import SharedFeed from '../pages/mypage/SharedFeed';
import LikedFeed from '../pages/mypage/LikedFeed';

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* default */}
                <Route path="/" element={<Splash />} />

                {/* auth */}
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/joinDone" element={<JoinDone />} />

                {/* 피드관련 */}
                <Route path="/everyImgList" element={<AllImgList />} />
                <Route path="/writetoday" element={<Writetoday />} />
                <Route path="/feed/:feedId" element={<EditFeed />} />

                {/* 분석 */}
                <Route path="/analysis" element={<Analysis />} />

                {/* 나도갓생 커뮤니티 */}
                <Route path="/communityList" element={<CommunityList />} />
                <Route path="/share/:shareId" element={<CommunityDetail />} />
                <Route path="/addArticle" element={<AddArticle />} />

                {/*마이페이지*/}
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/mypage/nickname" element={<Setting />} />
                <Route path="/mypage/badge" element={<Badge />} />
                <Route path="/mypage/password" element={<ChangePw />} />
                <Route path="/mypage/sharedfeed" element={<SharedFeed />} />
                <Route path="/mypage/likedfeed" element={<LikedFeed />} />

                {/* 공통영역(상단 gnb메뉴)을 위한 Layout  */}
                <Route element={<Layout />}>
                    {/* main */}
                    <Route path="/main" element={<Home />} />
                    <Route path="/image/latest" element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Routers;
