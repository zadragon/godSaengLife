import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { MainApi, PostApi } from '../shared/api';
import { useCookies } from 'react-cookie';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import Calendar from 'react-calendar';
import OverlayImg from '../components/picture/OverlayImg';
import * as C from '../styles/common';
import * as H from '../styles/home';
import 'react-calendar/dist/Calendar.css';

function Home() {
    const [cookies] = useCookies();
    const [value, onChange] = useState(new Date());
    const [today, setToday] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const { data, isLoading, isError, isSuccess, refetch } = useQuery(['getMain'], () =>
        MainApi.getMain(cookies.Authorization)
    );
    const navigate = useNavigate();
    const [calendarData, setCalendarData] = useState([]);
    const [selectDate, setSelectDate] = useState([]);
    const [feedImgs, setFeedImgs] = useState([]);
    useEffect(() => {
        data?.data?.feeds &&
            setCalendarData(
                data?.data.feeds.map(item => {
                    return moment(item.createdAt).format('YYYY-MM-DD');
                })
            );
    }, [data]);
    console.log(calendarData);

    useEffect(() => {
        data?.data?.feeds &&
            setSelectDate(
                data?.data.feeds.filter(item => {
                    return moment(item.createdAt).format('YYYY-MM-DD') == moment(value).format('YYYY-MM-DD');
                })
            );
    }, [value, data]);

    useEffect(() => {
        selectDate &&
            setFeedImgs(
                selectDate?.map(item => {
                    return item.FeedImages;
                })
            );
        setTabId('condition');
    }, [selectDate]);

    const [tabId, setTabId] = useState('condition');
    const tabClick = e => {
        setTabId(e.target.id);
    };

    const [latestImgs, setLatestImgs] = useState([]);

    useEffect(() => {
        PostApi.getLatestImg()
            .then(response => {
                setLatestImgs(response.data.feedImages);
                // 이미지 데이터를 상태로 설정
                //console.log('피드:', response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const [imgViewUrl, setImgViewUrl] = useState({ view: false, url: '', feedId: '' });
    const viewDetail = (imgUrl, imageId) => {
        setImgViewUrl({ ...imgViewUrl, view: true, url: imgUrl, imageId: imageId });
    };

    //console.log(selectDate);

    return (
        <div>
            <div className="calendarArea">
                <Calendar
                    onChange={onChange}
                    value={value}
                    tileClassName={({ date, view }) => {
                        if (calendarData?.find(x => x === moment(date).format('YYYY-MM-DD'))) {
                            return 'highlight';
                        }
                    }}
                />
            </div>

            <H.MainTab>
                <C.TabInner className="tabInner" onClick={tabClick}>
                    <button className={tabId === 'condition' ? 'active' : ''} id="condition">
                        컨디션
                    </button>
                    <button className={tabId === 'picture' ? 'active' : ''} id="picture">
                        식단 사진
                    </button>
                </C.TabInner>

                {tabId === 'condition' && (
                    <div className="tabCont">
                        {selectDate == undefined || selectDate.length == 0 ? (
                            <div className="empty">
                                <p>기록이 없어요</p>
                            </div>
                        ) : (
                            <div className="conditionList">
                                {selectDate?.map(item => {
                                    return (
                                        <div key={item.feedId}>
                                            <div className="btnArea">
                                                <Link
                                                    to={`/feed/${item.feedId}`}
                                                    state={{ feedId: item.feedId }}
                                                    className="btnEdit"
                                                >
                                                    <span className="hidden">수정</span>
                                                </Link>
                                            </div>

                                            <div>
                                                <div>
                                                    <ul>
                                                        <li>😁 {item.emotion}</li>
                                                        <li>
                                                            {item.didGym ? '✅ 오늘 진짜 운동 잘됨' : '✅ 운동못함ㅜㅜ'}
                                                        </li>
                                                        <li>
                                                            {item.goodSleep
                                                                ? '🙌🏻 꿀잠 자고 개운한 날'
                                                                : '🙌🏻 잠못자서 두드려맞은듯 ㅜㅜ'}
                                                        </li>
                                                        <li>{item.howEat ? '😁 건강하게 먹음!!' : '😁 주워먹음'}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {tabId === 'picture' && (
                    <div className="tabCont">
                        {feedImgs && feedImgs[0]?.length == 0 && (
                            <div className="empty">
                                <p>기록이 없어요</p>
                            </div>
                        )}
                        <div className="imgList">
                            <div className="imgRail">
                                {feedImgs[0]?.map(item => {
                                    return (
                                        <div
                                            key={item.FeedId}
                                            className="img"
                                            onClick={() => viewDetail(item.imagePath, item.imageId)}
                                        >
                                            <img src={`${item.imagePath}`} alt="" />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
                {imgViewUrl.view && (
                    <OverlayImg imgUrl={imgViewUrl.url} imageId={imgViewUrl.imageId} setImgViewUrl={setImgViewUrl} />
                )}
            </H.MainTab>
            <H.MainAlbum>
                <div>
                    <h2>식단 사진첩</h2>
                    <Link to="/everyImgList" className="linkMore">
                        전체보기 &nbsp;＞
                    </Link>
                </div>
                <div className={`albumList col${latestImgs.length}`}>
                    {latestImgs.length === 0 ? (
                        <div className="img"></div>
                    ) : (
                        latestImgs.map((item, index) => (
                            <div className="img" key={index}>
                                <img src={item.imagePath} alt="" />
                            </div>
                        ))
                    )}
                </div>
            </H.MainAlbum>

            <C.AddPost>
                <Link to="/writetoday">
                    <span>+</span>
                    <span className="hidden">오늘 하루 기록하기</span>
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
