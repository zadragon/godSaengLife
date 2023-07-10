import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as C from '../../styles/common';
import * as S from '../../styles/community';
import { Link, useNavigate } from 'react-router-dom';
import ToggleSwitch from '../../components/ToggleSwitch';
import { communityApi } from '../../shared/api';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

const AddArticle = () => {
    const navigate = useNavigate();
    const graphImgState = useSelector(state => state.graphImgState);
    const [articlePost, setArticlePost] = useState({
        title: '',
        content: '',
        anonymous: false,
        base64: '',
    });

    const queryClient = useQueryClient();
    const {
        data,
        isLoading,
        error,
        isSuccess,
        mutate: addArticleData,
    } = useMutation(
        payload => {
            return communityApi.addCommunityArticle(payload);
        },
        {
            onSuccess: () => {
                // Invalidate and refresh
                // 이렇게 하면, todos라는 이름으로 만들었던 query를
                // invalidate 할 수 있어요.
                // queryClient.invalidateQueries({ queryKey: ['getCommentList'] });
                // getCommentRefetch();
            },
        }
    );

    useEffect(() => {
        graphImgState.graphImg && setArticlePost({ ...articlePost, base64: graphImgState.graphImg });
    }, [graphImgState]);

    const onChangeHandler = e => {
        const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setArticlePost({
            ...articlePost,
            [name]: value,
        });
    };
    console.log(articlePost);

    const addPost = async () => {
        if (articlePost.title == '') {
            alert('제목을 입력해주세요.');
            return;
        } else if (articlePost.content == '') {
            alert('내용을 입력해주세요.');
            return;
        }

        addArticleData(articlePost);
        // const result = await communityApi.addCommunityArticle(articlePost);
        // console.log(result);
    };

    if (isLoading)
        return (
            <C.Loading>
                <img src="/images/common/loading.gif" alt="" />
            </C.Loading>
        );
    if (error) return <div>...에러발생</div>;
    if (isSuccess)
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
                    <input type="text" name="title" placeholder="제목을 입력해주세요." onChange={onChangeHandler} />
                </div>
                <div className="row">
                    <textarea cols="30" name="content" rows="10" onChange={onChangeHandler}></textarea>
                </div>
                <img src={graphImgState.graphImg} />
            </S.AddArticleWrap>
            <S.btnAreaFixed>
                <div className="row">
                    <span className="label">익명으로 올리기</span>
                    <ToggleSwitch articlePost={articlePost} setArticlePost={setArticlePost} />
                </div>
                <button
                    className="btnAddArticle"
                    onClick={() => {
                        addPost();
                    }}
                >
                    글 등록
                </button>
            </S.btnAreaFixed>
        </div>
    );
};

export default AddArticle;
