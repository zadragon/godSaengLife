import React from 'react';
import * as S from '../../styles/community';
import { Link } from 'react-router-dom';

const Done = () => {
    return (
        <S.AddArticleDone>
            <div>
                <strong>등록 완료!</strong>
                <p>내가 쓴 글도 확인하고, 다른 갓생러 글도 보러가요~</p>
                <ul>
                    <li>
                        <Link to="/"> 홈으로</Link>
                    </li>
                    <li>
                        <Link to="/communityList"> 나도 갓생</Link>
                    </li>
                </ul>
            </div>
        </S.AddArticleDone>
    );
};

export default Done;
