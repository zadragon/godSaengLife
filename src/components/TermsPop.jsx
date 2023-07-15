import React from 'react';
import { styled } from 'styled-components';

const TermsPop = ({ setShowTooltip }) => {
    const popClose = e => {
        (e.target.classList.contains('dimmed') || e.target.classList.contains('btnClose')) && setShowTooltip(false);
    };
    return (
        <PointInfo onClick={e => popClose(e)} className="dimmed">
            <div
                className=" bg-neutral-100 rounded-2xl w-[343px] relative overflow-hidden"
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    height: '420px',
                    transform: 'translate(-50%, -50%)',
                    background: '#F8F8F9',
                }}
            >
                <div
                    className="border-solid border-neutral-500 pt-0 pr-4 pb-0 pl-4 w-[343px] h-20 absolute left-[calc(50%_-_171.5px)] top-0"
                    style={{ borderWidth: '0px 0px 0.3px 0px' }}
                >
                    <div
                        className="text-[#000000] text-center left-[115px]"
                        style={{
                            font: "var(--paragraph-large-bold, 700 20px/32px 'Pretendard', sans-serif)",
                            paddingTop: '22px',
                        }}
                    >
                        [개인정보 수집 및 이용 동의서]
                    </div>

                    <svg
                        className="btnClose cursor-pointer absolute left-[303px] top-6 overflow-visible"
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
                    style={{
                        height: '480px',
                        overflowY: 'scroll',
                        padding: '0 30px 10px 10px',
                        fontSize: '13px',
                        textAlign: 'justify',
                    }}
                >
                    이용자가 제공한 모든 정보는 다음의 목적을 위해 활용하며, 하기 목적 이외의 용도로를 사용되지
                    않습니다.
                    <br /> <br /> - 수집, 이용 목적 경품 지급 대상자 선정 및 경품 지급 <br /> - 수집 항목 성명,
                    전화번호(휴대전화) <br />- 개인정보 보유 및 이용 기간 수집, 이용 동의일로부터 경품 지급을 완료할 때
                    까지(완료 후 즉시 폐기) <br />- 동의/거부 관리 거부 시 경품 이벤트에 참여하실 수 없음을 알립니다.{' '}
                    <br />
                    <br />
                    개인정보보호법 제15조(개인정보의 수집, 이용) 개인정보처리자는 다음 각 호의 어느 하나에 해당하는
                    경우에는 개인 정보를 수집할 수 있으며, 그 수집 목적의 범위에서 이용할 수 있다.
                </div>
            </div>
        </PointInfo>
    );
};

const PointInfo = styled.div`
    position: fixed;
    z-index: 110;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
`;

export default TermsPop;
