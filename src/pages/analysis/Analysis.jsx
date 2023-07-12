import React, { useEffect, useState, useRef } from 'react';

import * as C from '../../styles/common';
import Gnb from '../../components/Gnb';
import WeekData from './WeekData';
import MonthData from './MonthData';
import { useNavigate } from 'react-router-dom';
import PointInfoPop from '../../components/PointInfoPop';
import GradePop from '../../components/GradePop';

const Analysis = () => {
    const navigate = useNavigate();
    const [dataCont, setDataCont] = useState('week');
    const dataToggle = e => {
        if (e.target.classList.contains('week')) {
            setDataCont('week');
        } else if (e.target.classList.contains('month')) {
            setDataCont('month');
        }
    };

    return (
        <div style={{ background: '#F8F8F9' }}>
            {/* <PointInfoPop /> */}
            <C.PageHeader>
                <button className="btnPrev" onClick={() => navigate(-1)}>
                    <span className="hidden">뒤로가기</span>
                </button>
                <h2>갓생 분석</h2>
            </C.PageHeader>

            <C.TabInner className="gapTop" onClick={e => dataToggle(e)}>
                <button className={`week ${dataCont === 'week' ? 'active' : ''}`}>주간</button>
                <button className={`month ${dataCont === 'month' ? 'active' : ''}`}>월간</button>
            </C.TabInner>

            {dataCont === 'week' ? <WeekData /> : <MonthData />}

            {/* <GradePop /> */}
            <Gnb />
        </div>
    );
};

export default Analysis;
