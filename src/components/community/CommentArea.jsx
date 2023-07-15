import React, { useEffect, useState } from 'react';
import * as C from '../../styles/common';
import * as S from '../../styles/community';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { communityApi } from '../../shared/api';
import LvImg from '../common/LvImg';
import { styled } from 'styled-components';

const CommentArea = ({ shareId }) => {
    const queryClient = useQueryClient();
    const {
        data: addCommentData,
        isLoading: addCommentLoading,
        error,
        isSuccess: addCommentSuccess,
        mutate: addCommentMutation,
    } = useMutation(
        payload => {
            communityApi.addComment(shareId, payload);
        },
        {
            onSuccess: () => {
                // Invalidate and refresh
                // 이렇게 하면, todos라는 이름으로 만들었던 query를
                // invalidate 할 수 있어요.
                refetch();
                queryClient.invalidateQueries({ queryKey: ['getComments'] });
                // getCommentRefetch();
            },
        }
    );

    const {
        data: commentList,
        isLoading,
        isError,
        isSuccess,
        refetch,
    } = useQuery(['getComments'], () => communityApi.getComments(shareId));
    console.log(commentList);

    const dateMutation = item => {
        const date = new Date(item);

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();

        const formattedDate = `${year}-${month}-${day} ${hour}:${minute}`;
        return formattedDate;
    };

    const [inputs, setInputs] = useState({ content: '' });
    const commentChange = e => {
        setInputs({ content: e.target.value });
    };
    const addCommentAction = () => {
        addCommentMutation(inputs);
        setInputs({ content: '' });
    };

    return (
        <>
            <CommentWrap>
                <CommentCount>댓글 {commentList?.data.length}</CommentCount>

                <CommentList>
                    {commentList &&
                        commentList?.data.map(item => {
                            return (
                                <div
                                    key={item.commentId}
                                    className="flex flex-row gap-1 items-start justify-between shrink-0 relative"
                                >
                                    <LvImg
                                        totalPointScore={item.User.totalPointScore}
                                        style={{
                                            width: '24px',
                                            height: '24px',
                                            boxShadow: '2px 4px 8px 0px rgba(0, 0, 0, 0.25)',
                                            borderRadius: '50%',
                                        }}
                                    />

                                    <div
                                        className="flex flex-col gap-2 items-start justify-start shrink-0 relative"
                                        style={{ width: 'calc(100% - 36px)' }}
                                    >
                                        <div
                                            className="flex flex-row items-start justify-between shrink-0 relative"
                                            style={{ width: '100%' }}
                                        >
                                            <div
                                                className="text-neutral-900 text-left relative"
                                                style={{
                                                    font: "var(--description-bold, 700 12px/16px 'Pretendard', sans-serif)",
                                                }}
                                            >
                                                {item.commentName}
                                            </div>

                                            <div
                                                className="text-neutral-400 text-right relative"
                                                style={{
                                                    font: "var(--description-bold, 700 12px/16px 'Pretendard', sans-serif)",
                                                }}
                                            >
                                                {dateMutation(item.createdAt)}
                                            </div>
                                        </div>

                                        <div
                                            className="text-neutral-900 text-left relative w-[307px]"
                                            style={{
                                                font: "var(--description-medium, 500 12px/16px 'Pretendard', sans-serif)",
                                            }}
                                        >
                                            {item.content}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </CommentList>
            </CommentWrap>
            <S.CommentAddArea className={inputs.content !== '' ? 'active' : ''}>
                <input
                    type="text"
                    placeholder="댓글을 입력해주세요."
                    value={inputs.content}
                    onChange={e => commentChange(e)}
                />
                <button className="btnSend" onClick={e => addCommentAction(e)}>
                    <span className="hidden">보내기</span>
                </button>
            </S.CommentAddArea>
        </>
    );
};

const CommentWrap = styled.div`
    padding: 24px 16px;
    height: calc(100vh - 480px);
    overflow-y: scroll;
`;

const CommentCount = styled.div`
    color: var(--neutral-900, #21242e);
    font-family: 'Pretendard-Bold';
    font-size: 16px;
`;

const CommentList = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 32px;
    gap: 32px;
`;

export default CommentArea;
