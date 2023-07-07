import React from 'react';
import * as C from '../../styles/common';
import * as M from '../../styles/mypage';
import Gnb from '../../components/Gnb';
import { Link, useNavigate } from 'react-router-dom';

function Badge() {
    const navigate = useNavigate();
    return (
        <div>
            <C.PageHeader>
                <button className="btnPrev" onClick={() => navigate('/mypage')}>
                    <span className="hidden">뒤로가기</span>
                </button>
                <h2>획득한 갓생 뱃지</h2>
            </C.PageHeader>
        </div>
    );
}

export default Badge;
