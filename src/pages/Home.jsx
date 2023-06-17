import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { styled } from 'styled-components';
import { MainApi } from '../shared/api';
import { useCookies } from 'react-cookie';
import { useQuery } from '@tanstack/react-query';

function Home() {
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();

    const { isLoading, error, data, refetch: getMain } = useQuery(['getMain'], payload => MainApi.getMain(payload));

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
        getMain(cookies.token);
    }, []);
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
                    <div>식단 사진첩</div>
                    <div
                        onClick={() => {
                            navigate('/post');
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
        </div>
    );
}

const Markers = styled.div`
    width: 5px;
    height: 5px;
    background-color: blue;
`;

export default Home;
