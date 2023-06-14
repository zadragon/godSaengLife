import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { styled } from 'styled-components';

function Home() {
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

            <div className="bg-blue-500"> Tailwind Css 적용 테스트 </div>
            <div className="bg-blue-500">
                <div>식단 사진첩</div>
                <div>전체보기&nbsp;＞</div>
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
