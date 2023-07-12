import React from 'react';
import { styled } from 'styled-components';

const GradePop = () => {
    return (
        <PointInfo>
            <div
                className="bg-neutral-100 rounded-2xl w-[343px] relative overflow-hidden"
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    height: '500px',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <div
                    className="border-solid border-neutral-500 pt-0 pr-4 pb-0 pl-4 w-[343px] h-20 absolute left-[calc(50%_-_171.5px)] top-0"
                    style={{ borderWidth: '0px 0px 0.3px 0px' }}
                >
                    <div
                        className="text-[#000000] text-left absolute left-[126px] top-6"
                        style={{
                            font: "var(--paragraph-large-bold, 700 20px/32px 'Pretendard', sans-serif)",
                        }}
                    >
                        갓생 포인트
                    </div>

                    <svg
                        className="absolute left-[303px] top-6 overflow-visible"
                        style={{}}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M17 7.00006L12 12M12 12L7 17M12 12L17 16.9999M12 12L7 7"
                            stroke="#21242E"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <div
                    className="flex flex-col gap-3 items-start justify-start absolute left-[calc(50%_-_155.5px)] top-[100px]"
                    style={{ height: '480px', 'overflow-y': 'scroll' }}
                >
                    <div className="bg-neutral-000 rounded-lg p-4 flex flex-row items-start justify-between shrink-0 w-[311px] relative">
                        <div className="flex flex-row gap-2 items-start justify-start shrink-0 relative">
                            <img className="shrink-0 w-6 h-6 relative" src="profile-pic-1.png" />

                            <div className="flex flex-col gap-1 items-start justify-start shrink-0 relative">
                                <div
                                    className="text-neutral-700 text-left relative"
                                    style={{
                                        font: "var(--paragraph-mid-bold, 700 16px/24px 'Pretendard', sans-serif)",
                                    }}
                                >
                                    갓생별
                                </div>

                                <div
                                    className="text-neutral-500 text-left relative"
                                    style={{
                                        font: "var(--paragraph-small-medium, 500 14px/20px 'Pretendard', sans-serif)",
                                    }}
                                >
                                    5번 이하 접속, 포인트 25점 이하
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary-500-50 rounded pt-0 pr-1 pb-0 pl-1 flex flex-row gap-1 items-center justify-start shrink-0 relative">
                            <div
                                className="text-neutral-700 text-center relative"
                                style={{
                                    font: "var(--description-medium, 500 12px/16px 'Pretendard', sans-serif)",
                                }}
                            >
                                Lv.1
                            </div>
                        </div>
                    </div>

                    <div className="bg-neutral-000 rounded-lg p-4 flex flex-row items-start justify-between shrink-0 w-[311px] relative">
                        <div className="flex flex-row gap-2 items-start justify-start shrink-0 relative">
                            <img className="shrink-0 w-6 h-6 relative" src="profile-pic-2.png" />

                            <div className="flex flex-col gap-1 items-start justify-start shrink-0 relative">
                                <div
                                    className="text-neutral-700 text-left relative"
                                    style={{
                                        font: "var(--paragraph-mid-bold, 700 16px/24px 'Pretendard', sans-serif)",
                                    }}
                                >
                                    화성으로 이사
                                </div>

                                <div
                                    className="text-neutral-500 text-left relative"
                                    style={{
                                        font: "var(--paragraph-small-medium, 500 14px/20px 'Pretendard', sans-serif)",
                                    }}
                                >
                                    5 - 10번 접속, 포인트 25 - 75점
                                </div>
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

                    <div className="bg-neutral-000 rounded-lg p-4 flex flex-row items-start justify-between shrink-0 w-[311px] relative">
                        <div className="flex flex-row gap-2 items-start justify-start shrink-0 relative">
                            <img className="shrink-0 w-6 h-6 relative" src="profile-pic-3.png" />

                            <div className="flex flex-col gap-1 items-start justify-start shrink-0 relative">
                                <div
                                    className="text-neutral-700 text-left relative"
                                    style={{
                                        font: "var(--paragraph-mid-bold, 700 16px/24px 'Pretendard', sans-serif)",
                                    }}
                                >
                                    지구 정복
                                </div>

                                <div
                                    className="text-neutral-500 text-left relative"
                                    style={{
                                        font: "var(--paragraph-small-medium, 500 14px/20px 'Pretendard', sans-serif)",
                                    }}
                                >
                                    10번 이상 접속, 포인트 75 - 125점
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary-500-50 rounded pt-0 pr-1 pb-0 pl-1 flex flex-row gap-1 items-center justify-start shrink-0 relative">
                            <div
                                className="text-neutral-700 text-center relative"
                                style={{
                                    font: "var(--description-medium, 500 12px/16px 'Pretendard', sans-serif)",
                                }}
                            >
                                Lv.3
                            </div>
                        </div>
                    </div>

                    <div className="bg-neutral-000 rounded-lg p-4 flex flex-row items-start justify-between shrink-0 w-[311px] relative">
                        <div className="flex flex-row gap-2 items-start justify-start shrink-0 relative">
                            <img className="shrink-0 w-6 h-6 relative" src="profile-pic-4.png" />

                            <div className="flex flex-col gap-1 items-start justify-start shrink-0 relative">
                                <div
                                    className="text-neutral-700 text-left relative"
                                    style={{
                                        font: "var(--paragraph-mid-bold, 700 16px/24px 'Pretendard', sans-serif)",
                                    }}
                                >
                                    금성에서 정착
                                </div>

                                <div
                                    className="text-neutral-500 text-left relative"
                                    style={{
                                        font: "var(--paragraph-small-medium, 500 14px/20px 'Pretendard', sans-serif)",
                                    }}
                                >
                                    10번 이상 접속, 포인트 125 - 175점
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary-500-50 rounded pt-0 pr-1 pb-0 pl-1 flex flex-row gap-1 items-center justify-start shrink-0 relative">
                            <div
                                className="text-neutral-700 text-center relative"
                                style={{
                                    font: "var(--description-medium, 500 12px/16px 'Pretendard', sans-serif)",
                                }}
                            >
                                Lv.4
                            </div>
                        </div>
                    </div>

                    <div className="bg-neutral-000 rounded-lg p-4 flex flex-row items-start justify-between shrink-0 w-[311px] relative">
                        <div className="flex flex-row gap-2 items-start justify-start shrink-0 relative">
                            <img className="shrink-0 w-6 h-6 relative" src="profile-pic-5.png" />

                            <div className="flex flex-col gap-1 items-start justify-start shrink-0 relative">
                                <div
                                    className="text-neutral-700 text-left relative"
                                    style={{
                                        font: "var(--paragraph-mid-bold, 700 16px/24px 'Pretendard', sans-serif)",
                                    }}
                                >
                                    갓생성 탐구
                                </div>

                                <div
                                    className="text-neutral-500 text-left relative"
                                    style={{
                                        font: "var(--paragraph-small-medium, 500 14px/20px 'Pretendard', sans-serif)",
                                    }}
                                >
                                    10번 이상 접속, 포인트 175 - 225점
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary-500-50 rounded pt-0 pr-1 pb-0 pl-1 flex flex-row gap-1 items-center justify-start shrink-0 relative">
                            <div
                                className="text-neutral-700 text-center relative"
                                style={{
                                    font: "var(--description-medium, 500 12px/16px 'Pretendard', sans-serif)",
                                }}
                            >
                                Lv.5
                            </div>
                        </div>
                    </div>

                    <div className="bg-neutral-000 rounded-lg p-4 flex flex-row items-start justify-between shrink-0 w-[311px] relative">
                        <div className="flex flex-row gap-2 items-start justify-start shrink-0 relative">
                            <img className="shrink-0 w-6 h-6 relative" src="profile-pic-7.png" />

                            <div className="flex flex-col gap-1 items-start justify-start shrink-0 relative">
                                <div
                                    className="text-neutral-700 text-left relative"
                                    style={{
                                        font: "var(--paragraph-mid-bold, 700 16px/24px 'Pretendard', sans-serif)",
                                    }}
                                >
                                    갓생성 출발
                                </div>

                                <div
                                    className="text-neutral-500 text-left relative"
                                    style={{
                                        font: "var(--paragraph-small-medium, 500 14px/20px 'Pretendard', sans-serif)",
                                    }}
                                >
                                    10번 이상 접속, 포인트 225 - 275점
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary-500-50 rounded pt-0 pr-1 pb-0 pl-1 flex flex-row gap-1 items-center justify-start shrink-0 relative">
                            <div
                                className="text-neutral-700 text-center relative"
                                style={{
                                    font: "var(--description-medium, 500 12px/16px 'Pretendard', sans-serif)",
                                }}
                            >
                                Lv.6
                            </div>
                        </div>
                    </div>

                    <div className="bg-neutral-000 rounded-lg p-4 flex flex-row items-start justify-between shrink-0 w-[311px] relative">
                        <div className="flex flex-row gap-2 items-start justify-start shrink-0 relative">
                            <img className="shrink-0 w-6 h-6 relative" src="profile-pic-6.png" />

                            <div className="flex flex-col gap-1 items-start justify-start shrink-0 relative">
                                <div
                                    className="text-neutral-700 text-left relative"
                                    style={{
                                        font: "var(--paragraph-mid-bold, 700 16px/24px 'Pretendard', sans-serif)",
                                    }}
                                >
                                    갓생성 도착
                                </div>

                                <div
                                    className="text-neutral-500 text-left relative"
                                    style={{
                                        font: "var(--paragraph-small-medium, 500 14px/20px 'Pretendard', sans-serif)",
                                    }}
                                >
                                    10번 이상 접속, 포인트 275 - 350점
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary-500-50 rounded pt-0 pr-1 pb-0 pl-1 flex flex-row gap-1 items-center justify-start shrink-0 relative">
                            <div
                                className="text-neutral-700 text-center relative"
                                style={{
                                    font: "var(--description-medium, 500 12px/16px 'Pretendard', sans-serif)",
                                }}
                            >
                                Lv.7
                            </div>
                        </div>
                    </div>

                    <div className="bg-neutral-000 rounded-lg p-4 flex flex-row items-start justify-between shrink-0 w-[311px] relative">
                        <div className="flex flex-row gap-2 items-start justify-start shrink-0 relative">
                            <img className="shrink-0 w-6 h-6 relative" src="profile-pic-8.png" />

                            <div className="flex flex-col gap-1 items-start justify-start shrink-0 relative">
                                <div
                                    className="text-neutral-700 text-left relative"
                                    style={{
                                        font: "var(--paragraph-mid-bold, 700 16px/24px 'Pretendard', sans-serif)",
                                    }}
                                >
                                    갓생성 정복자
                                </div>

                                <div
                                    className="text-neutral-500 text-left relative"
                                    style={{
                                        font: "var(--paragraph-small-medium, 500 14px/20px 'Pretendard', sans-serif)",
                                    }}
                                >
                                    10번 이상 접속, 포인트 350점 이상
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary-500-50 rounded pt-0 pr-1 pb-0 pl-1 flex flex-row gap-1 items-center justify-start shrink-0 relative">
                            <div
                                className="text-neutral-700 text-center relative"
                                style={{
                                    font: "var(--description-medium, 500 12px/16px 'Pretendard', sans-serif)",
                                }}
                            >
                                Lv.8
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg pt-4 pr-3 pb-4 pl-3 flex flex-row gap-3 items-start justify-start shrink-0 w-[311px] h-[72px] relative"></div>
                </div>
            </div>
        </PointInfo>
    );
};

const PointInfo = styled.div`
    position: absolute;
    z-index: 110;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
`;

export default GradePop;
