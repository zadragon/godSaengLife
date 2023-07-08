import React from 'react';
import { useSelector } from 'react-redux';
import * as C from '../../styles/common';
import * as S from '../../styles/community';
import { useNavigate } from 'react-router-dom';
import ToggleSwitch from '../../components/ToggleSwitch';

const AddArticle = () => {
    const navigate = useNavigate();
    const graphImgState = useSelector(state => state.graphImgState);
    return (
        <div>
            <C.PageHeader>
                <h2>글쓰기</h2>
                <button className="btnClose" onClick={() => navigate('/')}>
                    <span className="hidden">닫기</span>
                </button>
            </C.PageHeader>
            <S.AddArticleWrap>
                <div className="row">
                    <input type="text" placeholder="제목을 입력해주세요." />
                </div>
                <div className="row">
                    <textarea cols="30" rows="10"></textarea>
                </div>
                <img src={graphImgState.graphImg} />
            </S.AddArticleWrap>
            <S.btnAreaFixed>
                <div className="row">
                    <span className="label">익명으로 올리기</span>
                    <ToggleSwitch />
                </div>
                <button className="btnAddArticle">글 등록</button>
            </S.btnAreaFixed>
        </div>
    );
};

export default AddArticle;
