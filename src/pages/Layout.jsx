import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Gnb from '../components/Gnb';

const Layout = () => {
    const [updateTrigger, setUpdateTrigger] = useState(false);

    const updateData = () => {
        setUpdateTrigger(prev => !prev);
    };

    return (
        <div className="section place-content-center">
            <Header />
            {/* 공통영역 밑에 들어가는 콘텐츠 */}
            <div id="content">
                <Outlet updateTrigger={updateTrigger} updateData={updateData} />
            </div>
            <Gnb />
        </div>
    );
};

export default Layout;
