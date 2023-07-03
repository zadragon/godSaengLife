import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Layout from '../pages/Layout';
import Analysis from '../pages/analysis/Analysis';
import { JoinDone, Login, Signup } from '../pages/member/';
import { Allmeal, EditFeed, PictureList, Writetoday } from '../pages/post';

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

                {/* 글 작성 */}
                <Route path="/writetoday" element={<Writetoday />} />

                {/* 분석 */}
                <Route path="/analysis" element={<Analysis />} />

                {/* 공통영역(상단 gnb메뉴)을 위한 Layout  */}
                <Route element={<Layout />}>
                    {/* main */}
                    <Route path="/" element={<Home />} />
                    <Route path="/image/latest" element={<Home />} />
                    <Route path="/allmeal" element={<Allmeal />} />

                    <Route path="/feed/:feedId" element={<EditFeed />} />
                    <Route path="/pitureList" element={<PictureList />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Routers;
