import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from '../pages/member/Signup';
import Login from '../pages/member/Login';
import Home from '../pages/Home';
import Layout from '../pages/Layout';
import Allmeal from '../pages/Allmeal';
import Writetoday from '../pages/Writetoday';
import PictureList from '../pages/record/PictureList';
import EditFeed from '../pages/EditFeed';
import JoinDone from '../pages/member/JoinDone';
import Analysis from '../pages/analysis/Analysis';

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

                {/* 공통영역(상단 gnb메뉴)을 위한 Layout  */}
                <Route element={<Layout />}>
                    {/* main */}
                    <Route path="/" element={<Home />} />
                    <Route path="/image/latest" element={<Home />} />
                    <Route path="/allmeal" element={<Allmeal />} />

                    <Route path="/feed/:feedId" element={<EditFeed />} />
                    <Route path="/pitureList" element={<PictureList />} />
                    <Route path="/analysis" element={<Analysis />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Routers;
