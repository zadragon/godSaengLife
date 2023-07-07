import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Layout from '../pages/Layout';
import Analysis from '../pages/analysis/Analysis';
import Mypage from '../pages/mypage/Mypage';
import { JoinDone, Login, Signup } from '../pages/member/';
import { EditFeed, AllImgList, Writetoday } from '../pages/post';
import Setting from '../pages/mypage/Setting';
import Badge from '../pages/mypage/Badge';

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* default */}
                <Route path="/splash" element={<Login />} />

                {/* auth */}
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/joinDone" element={<JoinDone />} />

                {/* 피드관련 */}
                <Route path="/everyImgList" element={<AllImgList />} />
                <Route path="/writetoday" element={<Writetoday />} />

                {/* 분석 */}
                <Route path="/analysis" element={<Analysis />} />

                {/*마이페이지*/}
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/mypage/nickname" element={<Setting />} />
                <Route path="/mypage/badge" element={<Badge />} />

                {/* 공통영역(상단 gnb메뉴)을 위한 Layout  */}
                <Route element={<Layout />}>
                    {/* main */}
                    <Route path="/" element={<Home />} />
                    <Route path="/image/latest" element={<Home />} />

                    <Route path="/feed/:feedId" element={<EditFeed />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Routers;
