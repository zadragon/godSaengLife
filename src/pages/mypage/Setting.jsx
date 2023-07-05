import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as C from '../../styles/common';
import Gnb from '../../components/Gnb';

function Setting() {
    const navigate = useNavigate();
    return (
        <div>
            <C.PageHeader>
                <button className="btnPrev" onClick={() => navigate(-1)}>
                    <span className="hidden">뒤로가기</span>
                </button>
                <h2>닉네임 수정</h2>
                <Gnb />
            </C.PageHeader>
        </div>
    );
}

export default Setting;
