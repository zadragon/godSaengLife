import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { styled } from 'styled-components';
import { MainApi } from '../shared/api';
import { useCookies } from 'react-cookie';

function Home() {
    const [cookies, setCookie, removeCookie] = useCookies();

    console.log(cookies.token);
    const navigate = useNavigate();

    const handleClick = (date, jsEvent) => {
        console.log('Date clicked:', date);
        console.log('JS event:', jsEvent);
    };

    const handleDateClick = info => {
        console.log('클릭된 날짜:', info.dateStr);
        console.log('시작 날짜:', info.startStr);
        console.log('끝 날짜:', info.endStr);
        console.log('모든 정보:', info);
    };

    useEffect(() => {
        const response = MainApi.getMain(cookies.token);
        console.log(response);
    }, []);

    const [currentTab, clickTab] = useState(0);
    const menuArr = [
        { name: '컨디션', content: 'Tab menu ONE' },
        { name: '식단 사진', content: 'Tab menu TWO' },
    ];

    const selectMenuHandler = index => {
        // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
        // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
        clickTab(index);
    };
    return (
        <div>
            <button
                onClick={() => {
                    navigate('/login');
                }}
            >
                로그인
            </button>

            <div style={{ width: '500px' }}>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={[{ date: '2023-06-01' }, { date: '2023-06-02' }]}
                    eventClick={handleClick}
                    dateClick={e => handleDateClick(e)}
                    selectable
                />
            </div>
            <div className="max-w-[500px]">
                <div className="flex justify-between bg-slate-100 mt-3">
                    <button>컨디션</button>
                    <button>식단 사진</button>
                </div>
            </div>
            <div className="max-w-[500px]">
                <div className="flex justify-between bg-slate-100 mt-3">
                    <div>식단 사진첩</div>
                    <div
                        onClick={() => {
                            navigate('/allmeal');
                        }}
                    >
                        전체보기&nbsp;＞
                    </div>
                </div>
                <div className="flex justify-between bg-slate-100 mt-3">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                </div>
            </div>

            <div className="flex justify-center">
                오늘 하루 기록하기
                <button
                    onClick={() => {
                        navigate('/writetoday');
                    }}
                >
                    +
                </button>
            </div>
        </div>
    );
}

const Markers = styled.div`
    width: 5px;
    height: 5px;
    background-color: blue;
`;

export default Home;
