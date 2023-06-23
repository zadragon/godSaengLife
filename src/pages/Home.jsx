import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { styled } from 'styled-components';
import { MainApi } from '../shared/api';
import { useCookies } from 'react-cookie';
import 'react-calendar/dist/Calendar.css'; // css import
import * as C from '../styles/common';
import * as H from '../styles/home';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import Calendar from 'react-calendar';

function Home() {
    const [cookies, setCookie, removeCookie] = useCookies();
    const [allData, setAllData] = useState();
    const [calData, setCalData] = useState();
    const navigate = useNavigate();

    const { data, isLoading, error, refetch } = useQuery(['getMain'], () => MainApi.getMain(cookies.Authorization));

    const calendarData = data?.data.feeds.map(item => {
        return moment(item.createdAt).format('DD-MM-YYYY');
    });

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
        MainApi.getMain(cookies.Authorization, setAllData);
    }, []);

    const calDataArr = allData?.map(item => {
        return { date: item.createdAt };
    });

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
    const [value, onChange] = useState(new Date());

    const selectCondition = data?.data.feeds.filter(item => {
        return moment(item.createdAt).format('DD-MM-YYYY') == moment(value).format('DD-MM-YYYY');
    });
    const feedImgs = selectCondition?.map(item => {
        return item.FeedImages[0]?.imagePath;
    });

    const [tabId, setTabId] = useState('condition');
    const tabClick = e => {
        setTabId(e.target.id);
    };

    return (
        <div>
            <div className="calendarArea">
                <Calendar
                    onChange={onChange}
                    value={value}
                    tileClassName={({ date, view }) => {
                        if (calendarData?.find(x => x === moment(date).format('DD-MM-YYYY'))) {
                            return 'highlight';
                        }
                    }}
                />
            </div>

            <H.MainTab>
                <div className="tabInner" onClick={tabClick}>
                    <button className={tabId == 'condition' ? 'active' : ''} id="condition">
                        컨디션
                    </button>
                    <button className={tabId == 'picture' ? 'active' : ''} id="picture">
                        식단 사진
                    </button>
                </div>

                {tabId == 'condition' && (
                    <div className="tabCont">
                        {selectCondition?.length === 0 && (
                            <div className="empty">
                                <p>기록이 없어요</p>
                            </div>
                        )}
                        <div className="conditionList">
                            <div className="btnArea">
                                <button className="btnEdit">
                                    <span className="sr-only">수정</span>
                                </button>
                            </div>

                            <ul>
                                {selectCondition?.map((item, idx) => {
                                    return (
                                        <>
                                            <li key={idx}>😁 {item.emotion}</li>
                                            <li>{item.didGym ? '✅ 오늘 진짜 운동 잘됨' : '✅ 운동못함ㅜㅜ'}</li>
                                            <li>
                                                {item.goodSleep
                                                    ? '🙌🏻 꿀잠 자고 개운한 날'
                                                    : '🙌🏻 잠못자서 두드려맞은듯 ㅜㅜ'}
                                            </li>
                                            <li>{item.howEat ? '😁 건강하게 먹음!!' : '😁 주워먹음'}</li>
                                        </>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                )}

                {tabId == 'picture' && (
                    <div className="tabCont">
                        <div className="imgList">
                            <div className="imgRail">
                                {feedImgs?.map((item, idx) => {
                                    return (
                                        <div key={idx} className="img">
                                            <img src={`${item}`} alt="" />
                                        </div>
                                    );
                                })}
                                <div className="img">
                                    <img
                                        src="https://god-seangler.s3.ap-northeast-2.amazonaws.com/1687518720107.jpg"
                                        alt=""
                                    />
                                </div>
                                <div className="img">
                                    <img
                                        src="https://god-seangler.s3.ap-northeast-2.amazonaws.com/1687518720107.jpg"
                                        alt=""
                                    />
                                </div>
                                <div className="img">
                                    <img
                                        src="https://god-seangler.s3.ap-northeast-2.amazonaws.com/1687518720107.jpg"
                                        alt=""
                                    />
                                </div>
                                <div className="img">
                                    <img
                                        src="https://god-seangler.s3.ap-northeast-2.amazonaws.com/1687518720107.jpg"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </H.MainTab>
            <H.MainAlbum>
                <div>
                    <h2>식단 사진첩</h2>
                    <Link to="/allmeal" className="linkMore">
                        전체보기 &nbsp;＞
                    </Link>
                </div>
                <div className="albumList">
                    <div className="img"></div>
                    <div className="img"></div>
                    <div className="img"></div>
                </div>
            </H.MainAlbum>

            <C.AddPost>
                <Link to="/writetoday">
                    <span>+</span>
                    <span className="sr-only">오늘 하루 기록하기</span>
                </Link>
            </C.AddPost>
        </div>
    );
}

const Markers = styled.div`
    width: 5px;
    height: 5px;
    background-color: blue;
`;

export default Home;
