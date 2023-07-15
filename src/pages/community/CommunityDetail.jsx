import React, { useEffect, useState } from 'react';
import Gnb from '../../components/Gnb';
import * as C from '../../styles/common';
import * as S from '../../styles/community';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { communityApi } from '../../shared/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import LvImg from '../../components/common/LvImg';
import LvNumber from '../../components/common/LvNumber';
import { styled } from 'styled-components';
import CommentArea from '../../components/community/CommentArea';

const CommunityDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const shareId = location.pathname.split('/')[2];

    const queryClient = useQueryClient();
    const { data, isLoading, isError, refetch } = useQuery(['getCommunityArticle'], () =>
        communityApi.getCommunityArticle()
    );

    console.log(location.pathname.split('/')[2]);

    const {
        data: likeData,
        isLoading: likeLoading,
        error,
        isSuccess,
        mutate: addLikeMutation,
    } = useMutation(
        async payload => {
            return await communityApi.addLike(payload);
        },
        {
            onSuccess: () => {
                // Invalidate and refresh
                // 이렇게 하면, todos라는 이름으로 만들었던 query를
                // invalidate 할 수 있어요.
                queryClient.invalidateQueries({ queryKey: ['getCommunityArticle'] });
                // getCommentRefetch();
            },
        }
    );

    const [state, setState] = useState();
    const [date, setDate] = useState('');
    useEffect(() => {
        data && setState(data?.data);

        const dateSet = item => {
            const date = new Date(item);

            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const hour = date.getHours();
            const minute = date.getMinutes();

            const formattedDate = `${year}-${month}-${day} ${hour}:${minute}`;
            return formattedDate;
        };
        const newDate = dateSet(data?.data.createdAt);
        setDate(newDate);
    }, [data]);

    const likeToggle = () => {
        addLikeMutation(shareId);
    };
    return (
        <>
            <C.PageHeader>
                <button className="btnPrev" onClick={() => navigate(-1)}>
                    <span className="hidden">뒤로가기</span>
                </button>
                <h2>갓생 분석</h2>
            </C.PageHeader>
            <S.CommDetail>
                <S.Title>{state?.title}</S.Title>
                <div className="pt-4 pr-0 pb-4 pl-0 flex flex-row items-start justify-between shrink-0 w-full relative">
                    <div className="flex flex-row gap-2 items-center justify-start shrink-0 relative">
                        <LvImg
                            totalPointScore={state?.totalPointScore}
                            style={{
                                width: '40px',
                                height: '40px',
                                boxShadow: '2px 4px 8px 0px rgba(0, 0, 0, 0.25)',
                                borderRadius: '50%',
                            }}
                        />

                        <div className="flex flex-col gap-0 items-start justify-start shrink-0 relative">
                            <div className="flex flex-col gap-0 items-start justify-start shrink-0 relative">
                                <div className="flex flex-row gap-2 items-start justify-start shrink-0 relative">
                                    <div className="flex flex-col gap-1 items-start justify-start shrink-0 relative">
                                        <S.UserNickName>
                                            {state?.anonymous ? state?.shareName : state?.User.nickname}
                                        </S.UserNickName>
                                    </div>

                                    <div className="bg-primary-500-50 rounded pt-0 pr-1 pb-0 pl-1 flex flex-row gap-1 items-center justify-start shrink-0 relative">
                                        <LvNumber
                                            totalPointScore={state?.totalPointScore}
                                            className="text-neutral-700 text-center relative"
                                            style={{
                                                font: "var(--description-medium, 500 12px/16px 'Pretendard', sans-serif)",
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-row gap-2 items-start justify-start shrink-0 h-5 relative">
                                <div className="flex flex-row gap-1 items-center justify-start shrink-0 relative">
                                    <svg
                                        className="shrink-0 relative overflow-visible"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M14.0865 6.5689C14.8596 7.38228 14.8596 8.61805 14.0865 9.43143C12.7827 10.8033 10.5434 12.6668 7.99967 12.6668C5.456 12.6668 3.21667 10.8033 1.91281 9.43143C1.13974 8.61805 1.13974 7.38228 1.91281 6.5689C3.21667 5.19705 5.456 3.3335 7.99967 3.3335C10.5434 3.3335 12.7827 5.19705 14.0865 6.5689Z"
                                            stroke="#21242E"
                                        />
                                        <path
                                            d="M9.99967 8.00016C9.99967 9.10473 9.10424 10.0002 7.99967 10.0002C6.89511 10.0002 5.99967 9.10473 5.99967 8.00016C5.99967 6.89559 6.89511 6.00016 7.99967 6.00016C9.10424 6.00016 9.99967 6.89559 9.99967 8.00016Z"
                                            stroke="#21242E"
                                        />
                                    </svg>

                                    <S.Count>{state?.viewCount}</S.Count>
                                </div>

                                <div className="flex flex-row gap-[3px] items-center justify-center shrink-0 relative">
                                    <svg
                                        className="shrink-0 relative overflow-visible"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M8 13.5C8 13.5 1.5 10 1.5 5.875C1.5 4.97989 1.85558 4.12145 2.48851 3.48851C3.12145 2.85558 3.97989 2.5 4.875 2.5C6.28688 2.5 7.49625 3.26937 8 4.5C8.50375 3.26937 9.71312 2.5 11.125 2.5C12.0201 2.5 12.8785 2.85558 13.5115 3.48851C14.1444 4.12145 14.5 4.97989 14.5 5.875C14.5 10 8 13.5 8 13.5Z"
                                            stroke="#21242E"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>

                                    <S.Count>{state?.likeCount}</S.Count>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row gap-2 items-start justify-end shrink-0 relative">
                        <S.CreateAt>{date}</S.CreateAt>
                    </div>
                </div>
                <div
                    className="text-neutral-900 text-left relative flex-1"
                    style={{
                        fontFamily: 'Pretendard-Medium',
                    }}
                >
                    {state?.content}
                </div>
            </S.CommDetail>
            <S.btnLike onClick={() => likeToggle()}>
                <p>이 글 좋았나요?</p>
            </S.btnLike>
            <CommentArea shareId={shareId} />

            <Gnb />
        </>
    );
};

export default CommunityDetail;
