import React, { useEffect, useState } from 'react';
import Gnb from '../../components/Gnb';
import * as C from '../../styles/common';
import * as S from '../../styles/community';
import { Link, useNavigate } from 'react-router-dom';
import { communityApi } from '../../shared/api';
import { useQuery } from '@tanstack/react-query';

const CommunityDetail = () => {
    const navigate = useNavigate();

    const { data, isLoading, isError, refetch } = useQuery(['getCommunityArticle'], () =>
        communityApi.getCommunityArticle()
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
        console.log(newDate);
        setDate(newDate);
    }, [data]);

    console.log(state);

    return (
        <>
            <C.PageHeader>
                <button className="btnPrev" onClick={() => navigate(-1)}>
                    <span className="hidden">뒤로가기</span>
                </button>
                <h2>갓생 분석</h2>
            </C.PageHeader>
            <S.CommDetail>
                <div>{state?.title}</div>
                <div className="pt-4 pr-0 pb-4 pl-0 flex flex-row items-start justify-between shrink-0 w-full relative">
                    <div className="flex flex-row gap-2 items-center justify-start shrink-0 relative">
                        <img className="shrink-0 w-10 h-10 relative" src="profile-pic-2.png" />

                        <div className="flex flex-col gap-0 items-start justify-start shrink-0 relative">
                            <div className="flex flex-col gap-0 items-start justify-start shrink-0 relative">
                                <div className="flex flex-row gap-2 items-start justify-start shrink-0 relative">
                                    <div className="flex flex-col gap-1 items-start justify-start shrink-0 relative">
                                        <div
                                            className="text-neutral-700 text-left relative"
                                            style={{
                                                font: "var(--paragraph-mid-bold, 700 16px/24px 'Pretendard', sans-serif)",
                                            }}
                                        >
                                            {state?.anonymous ? state?.shareName : state?.User.nickname}
                                        </div>
                                    </div>

                                    <div className="bg-primary-500-50 rounded pt-0 pr-1 pb-0 pl-1 flex flex-row gap-1 items-center justify-start shrink-0 relative">
                                        <div
                                            className="text-neutral-700 text-center relative"
                                            style={{
                                                font: "var(--description-medium, 500 12px/16px 'Pretendard', sans-serif)",
                                            }}
                                        >
                                            Lv.2
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-row gap-2 items-start justify-start shrink-0 h-5 relative">
                                <div className="flex flex-row gap-1 items-center justify-start shrink-0 relative">
                                    <svg
                                        className="shrink-0 relative overflow-visible"
                                        style={{}}
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

                                    <div
                                        className="text-neutral-500 text-left relative"
                                        style={{
                                            font: "var(--description-medium, 500 12px/16px 'Pretendard', sans-serif)",
                                        }}
                                    >
                                        {state?.viewCount}
                                    </div>
                                </div>

                                <div className="flex flex-row gap-[3px] items-center justify-center shrink-0 relative">
                                    <svg
                                        className="shrink-0 relative overflow-visible"
                                        style={{}}
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

                                    <div
                                        className="text-neutral-500 text-left relative"
                                        style={{
                                            font: "var(--description-medium, 500 12px/16px 'Pretendard', sans-serif)",
                                        }}
                                    >
                                        {state?.likeCount}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row gap-2 items-start justify-end shrink-0 relative">
                        <div
                            className="text-neutral-500 text-left relative"
                            style={{
                                font: "var(--description-bold, 700 12px/16px 'Pretendard', sans-serif)",
                            }}
                        >
                            {date}
                        </div>
                    </div>
                </div>
                <div
                    className="text-neutral-900 text-left relative flex-1"
                    style={{
                        font: "var(--paragraph-small-medium, 500 14px/20px 'Pretendard', sans-serif)",
                    }}
                >
                    {state?.content}
                </div>
            </S.CommDetail>
            <div
                className="bg-primary-100 border-solid border-neutral-300 pt-4 pr-0 pb-4 pl-0 flex flex-row gap-2 items-center justify-center shrink-0 w-[375px] relative"
                style={{ borderWidth: '0px 0px 4px 0px' }}
            >
                <div
                    className="text-neutral-900 text-left relative"
                    style={{
                        font: "var(--paragraph-small-bold, 700 14px/16px 'Pretendard', sans-serif)",
                    }}
                >
                    이 글 좋았나요?
                </div>
            </div>

            <div className="flex flex-col gap-8 items-start justify-start shrink-0 relative">
                <div
                    className="text-neutral-900 text-left relative"
                    style={{
                        font: "var(--paragraph-mid-bold, 700 16px/24px 'Pretendard', sans-serif)",
                    }}
                >
                    댓글 3
                </div>

                <div className="flex flex-col gap-8 items-start justify-start shrink-0 relative">
                    <div className="flex flex-row gap-3 items-start justify-start shrink-0 relative">
                        <img className="shrink-0 w-6 h-6 relative" src="profile-pic-1.png" />

                        <div className="flex flex-col gap-2 items-start justify-start shrink-0 relative">
                            <div className="flex flex-row items-start justify-between shrink-0 w-[307px] relative">
                                <div
                                    className="text-neutral-900 text-left relative"
                                    style={{
                                        font: "var(--description-bold, 700 12px/16px 'Pretendard', sans-serif)",
                                    }}
                                >
                                    익명의 갓생별1234
                                </div>

                                <div
                                    className="text-neutral-400 text-right relative"
                                    style={{
                                        font: "var(--description-bold, 700 12px/16px 'Pretendard', sans-serif)",
                                    }}
                                >
                                    23.07.02
                                </div>
                            </div>

                            <div
                                className="text-neutral-900 text-left relative w-[307px]"
                                style={{
                                    font: "var(--description-medium, 500 12px/16px 'Pretendard', sans-serif)",
                                }}
                            >
                                불면증이 있는 걸까요? 왜이렇게 잠을 못주무셨는지.. 원인을 찾는게 중요할 것 같아요.
                                식단은 건강하게 챙겼지만, 카페인을 많이 섭취하신 것일 수도 있고..
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row gap-3 items-start justify-start shrink-0 relative">
                        <img className="shrink-0 w-6 h-6 relative" src="profile-pic-1.png" />

                        <div className="flex flex-col gap-2 items-start justify-start shrink-0 relative">
                            <div className="flex flex-row items-start justify-between shrink-0 w-[307px] relative">
                                <div
                                    className="text-neutral-900 text-left relative"
                                    style={{
                                        font: "var(--description-bold, 700 12px/16px 'Pretendard', sans-serif)",
                                    }}
                                >
                                    익명의 갓생별1234
                                </div>

                                <div
                                    className="text-neutral-400 text-right relative"
                                    style={{
                                        font: "var(--description-bold, 700 12px/16px 'Pretendard', sans-serif)",
                                    }}
                                >
                                    23.07.02
                                </div>
                            </div>

                            <div
                                className="text-neutral-900 text-left relative w-[307px]"
                                style={{
                                    font: "var(--description-medium, 500 12px/16px 'Pretendard', sans-serif)",
                                }}
                            >
                                불면증이 있는 걸까요? 왜이렇게 잠을 못주무셨는지.. 원인을 찾는게 중요할 것 같아요.
                                식단은 건강하게 챙겼지만, 카페인을 많이 섭취하신 것일 수도 있고..
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row gap-3 items-start justify-start shrink-0 relative">
                        <img className="shrink-0 w-6 h-6 relative" src="profile-pic-1.png" />

                        <div className="flex flex-col gap-2 items-start justify-start shrink-0 relative">
                            <div className="flex flex-row items-start justify-between shrink-0 w-[307px] relative">
                                <div
                                    className="text-neutral-900 text-left relative"
                                    style={{
                                        font: "var(--description-bold, 700 12px/16px 'Pretendard', sans-serif)",
                                    }}
                                >
                                    익명의 갓생별1234
                                </div>

                                <div
                                    className="text-neutral-400 text-right relative"
                                    style={{
                                        font: "var(--description-bold, 700 12px/16px 'Pretendard', sans-serif)",
                                    }}
                                >
                                    23.07.02
                                </div>
                            </div>

                            <div
                                className="text-neutral-900 text-left relative w-[307px]"
                                style={{
                                    font: "var(--description-medium, 500 12px/16px 'Pretendard', sans-serif)",
                                }}
                            >
                                불면증이 있는 걸까요? 왜이렇게 잠을 못주무셨는지.. 원인을 찾는게 중요할 것 같아요.
                                식단은 건강하게 챙겼지만, 카페인을 많이 섭취하신 것일 수도 있고..
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row gap-3 items-start justify-start shrink-0 w-[343px] h-[120px] relative"></div>
                </div>
            </div>
            <Gnb />
        </>
    );
};

export default CommunityDetail;
