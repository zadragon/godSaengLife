import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as C from '../../styles/common';
import * as S from '../../styles/community';
import { Link, useNavigate } from 'react-router-dom';
import ToggleSwitch from '../../components/ToggleSwitch';
import { communityApi } from '../../shared/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Loading from '../../components/common/Loading';
import Done from '../../components/common/Done';
import { initGraphImg } from '../../redux/modules/community';
import MetaTag from '../../components/MetaTag';

const AddArticle = () => {
    const navigate = useNavigate();
    const graphImgState = useSelector(state => state.graphImgState);
    const dispatch = useDispatch();
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
        setArticlePost({
            title: '',
            content: '',
            anonymous: false,
            base64: '',
        });
        dispatch(initGraphImg());
        // const result = await communityApi.addCommunityArticle(articlePost);
        // console.log(result);
    };

    const onClose = () => {
        navigate('/');
        setArticlePost({
            title: '',
            content: '',
            anonymous: false,
            base64: '',
        });
        dispatch(initGraphImg());
    };

    if (isLoading) return <Loading />;
    if (error) return <div>...에러발생</div>;
    if (isSuccess) return <Done />;
    return (
        <div>
            <MetaTag
                title="나도 갓생 글쓰기 :: 갓생러"
                description="습관기록 서비스"
                keywords="습관기록, 커뮤니티, 갓생러"
            />
            <C.PageHeader>
                <h2>글쓰기</h2>
                <button className="btnClose" onClick={() => onClose()}>
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
