import { React, useEffect, useRef, useState } from 'react';
import * as C from '../../styles/common';
import * as M from '../../styles/mypage';
import * as S from '../../styles/community';
import Gnb from '../../components/Gnb';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { communityApi, AuthApi } from '../../shared/api';
import LvImg from '../../components/common/LvImg';
import LvNumber from '../../components/common/LvNumber';

function SharedFeed() {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const [page, setPage] = useState(1);
    const [dataList, setDataList] = useState([]);

    const { data, isLoading, isError, isSuccess, refetch } = useQuery(['getAllCommunity', page], () =>
        communityApi.getAllCommunity(page)
    );
    console.log('커뮤니티data', data?.data);

    const calculateTimeDifference = createdAt => {
        const currentTime = new Date();
        const createdAtTime = new Date(createdAt);
        const timeDifferenceInHours = Math.floor((currentTime - createdAtTime) / (1000 * 60 * 60));

        if (timeDifferenceInHours < 24) {
            return `${timeDifferenceInHours}시간 전`;
        } else {
            const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);
            return `${timeDifferenceInDays}일 전`;
        }
    };

    const loadMore = () => {
        if (data?.data.data.length > 0) {
            setPage(prev => prev + 1);
        }
    };

    useEffect(() => {
        if (isSuccess && data?.data.data) {
            setDataList(prevDataList => [...prevDataList, ...data.data.data]);
        }
    }, [data, isSuccess]);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        };

        const handleIntersect = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 스크롤이 맨 아래로 도달하면 추가 데이터를 불러옵니다.
                    loadMore();
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, options);

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, [containerRef.current]);

    // useEffect(() => {
    //     refetch(); // `page` 값이 변경될 때마다 데이터를 다시 가져옵니다.
    // }, [page, refetch]);

    return (
        <div>
            <C.PageHeader>
                <button className="btnPrev" onClick={() => navigate('/')}>
                    <span className="hidden">뒤로가기</span>
                </button>
                <h2>나도갓생</h2>
            </C.PageHeader>
            <S.CommList style={{ paddingBottom: '100px' }}>
                <ul style={{ display: 'flex', gap: '12px', flexDirection: 'column', marginTop: '12px' }}>
                    {dataList.map((item, index) => (
                        <li key={index}>
                            <Link to={`/share/${item.shareId}`}>
                                <div className="bg-neutral-100 rounded-lg p-4 flex flex-col gap-0 items-start justify-start shrink-0 w-full relative">
                                    <div className="flex flex-row items-start justify-between shrink-0 w-full relative">
                                        <div className="flex flex-col gap-3 items-start justify-start shrink-0 w-[210px] h-[100px] relative">
                                            <div className="flex flex-col gap-2 items-start justify-start self-stretch shrink-0 relative">
                                                <div className="flex flex-row gap-2 items-center justify-start self-stretch shrink-0 relative">
                                                    <LvImg
                                                        style={{ width: '24px', height: '24px' }}
                                                        totalPointScore={item.totalPointScore}
                                                    />
                                                    <div className="flex flex-col gap-1 items-start justify-start shrink-0 relative">
                                                        <div
                                                            className="text-neutral-700 text-left relative"
                                                            style={{
                                                                font: "var(--paragraph-mid-bold, 700 16px/24px 'Pretendard', sans-serif)",
                                                            }}
                                                        >
                                                            <p>{item.shareName}</p>
                                                        </div>
                                                    </div>

                                                    <div className="bg-primary-500-50 rounded pt-0 pr-1 pb-0 pl-1 flex flex-row gap-1 items-center justify-start shrink-0 relative">
                                                        <div
                                                            className="text-neutral-700 text-center relative"
                                                            style={{
                                                                font: "var(--description-medium, 500 12px/16px 'Pretendard', sans-serif)",
                                                            }}
                                                        >
                                                            <LvNumber totalPointScore={item.totalPointScore} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div
                                                    className="text-neutral-500 text-left relative self-stretch"
                                                    style={{
                                                        font: "var(--paragraph-small-medium, 500 14px/20px 'Pretendard', sans-serif)",
                                                    }}
                                                >
                                                    <p>{item.title}</p>
                                                </div>
                                            </div>
                                        </div>
                                        {item.imagePath !== '' && item.imagePath !== 'null' ? (
                                            <img src={item.imagePath} style={{ width: '84px', height: '84px' }} />
                                        ) : null}
                                    </div>

                                    <div className="flex flex-row gap-2 items-start justify-start self-stretch shrink-0 relative">
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
                                                112
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
                                                223
                                            </div>
                                        </div>

                                        <div className="flex flex-row gap-[3px] items-center justify-start shrink-0 relative">
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
                                                    d="M5.58747 10.9924C5.8041 11.6074 6.15169 12.168 6.60621 12.6354C7.06073 13.1029 7.61134 13.4661 8.21999 13.6999C8.82863 13.9337 9.48078 14.0325 10.1314 13.9896C10.782 13.9467 11.4155 13.763 11.9881 13.4512L13.855 13.9843C13.9193 14.0027 13.9874 14.0036 14.0522 13.9868C14.117 13.9701 14.1761 13.9363 14.2234 13.889C14.2707 13.8416 14.3045 13.7825 14.3213 13.7177C14.338 13.653 14.3371 13.5849 14.3187 13.5205L13.7856 11.6537C14.1493 10.9866 14.3382 10.2382 14.3347 9.47843C14.3311 8.71862 14.1352 7.97208 13.7653 7.30841C13.3953 6.64475 12.8633 6.08556 12.2189 5.683C11.5745 5.28043 10.8387 5.04758 10.08 5.00617M1.81247 10.9843C1.74815 11.0027 1.68006 11.0036 1.61528 10.9868C1.5505 10.9701 1.49138 10.9363 1.44407 10.889C1.39675 10.8416 1.36296 10.7825 1.34619 10.7177C1.32943 10.653 1.3303 10.5849 1.34872 10.5205L1.88185 8.65367C1.3639 7.70344 1.20575 6.59836 1.43639 5.541C1.66703 4.48363 2.271 3.54479 3.13761 2.89656C4.00423 2.24833 5.07542 1.93412 6.15488 2.01153C7.23434 2.08894 8.24974 2.55277 9.015 3.31803C9.78025 4.08328 10.2441 5.09868 10.3215 6.17814C10.3989 7.2576 10.0847 8.3288 9.43646 9.19541C8.78823 10.062 7.84939 10.666 6.79203 10.8966C5.73466 11.1273 4.62959 10.9691 3.67935 10.4512L1.81247 10.9843Z"
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
                                                19
                                            </div>
                                        </div>

                                        <div className="flex flex-row gap-2 items-start justify-end flex-1 relative">
                                            <div
                                                className="text-neutral-500 text-left relative"
                                                style={{
                                                    font: "var(--description-bold, 700 12px/16px 'Pretendard', sans-serif)",
                                                }}
                                            >
                                                {calculateTimeDifference(item.createdAt)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
                <div ref={containerRef} style={{ height: '10px' }} />
            </S.CommList>
            <Gnb />
        </div>
    );
}

export default SharedFeed;
