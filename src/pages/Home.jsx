import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MainApi, PostApi } from '../shared/api';
import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import moment from 'moment';
import Calendar from 'react-calendar';
import OverlayImg from '../components/picture/OverlayImg';
import * as C from '../styles/common';
import * as H from '../styles/home';
import 'react-calendar/dist/Calendar.css';
import Loading from '../components/common/Loading';
import MetaTag from '../components/MetaTag';

function Home() {
    const [cookies] = useCookies();
    const [value, onChange] = useState(new Date());
    const { data, isLoading, isError, isSuccess, refetch } = useQuery(['getMain'], () => MainApi.getMain());
    const [calendarData, setCalendarData] = useState([]);
    const [selectDate, setSelectDate] = useState([]);
    const [feedImgs, setFeedImgs] = useState([]);
    useEffect(() => {
        data?.data?.feeds &&
            setCalendarData(
                data?.data.feeds.map(item => {
                    return {
                        date: moment(item.createdAt).format('YYYY-MM-DD'),
                        isImg: item.FeedImages.length > 0 ? true : false,
                    };
                })
            );
    }, [data]);

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
                //console.log(error);
            });
    }, []);

    const [imgViewUrl, setImgViewUrl] = useState({ view: false, url: '', feedId: '' });
    const viewDetail = (imgUrl, imageId) => {
        setImgViewUrl({ ...imgViewUrl, view: true, url: imgUrl, imageId: imageId });
    };

    if (isLoading) return <Loading />;

    return (
        <div>
            <MetaTag title="홈 :: 갓생러" description="습관기록 서비스" keywords="습관기록, 커뮤니티, 갓생러" />
            <div className="calendarArea">
                <Calendar
                    onChange={onChange}
                    value={value}
                    calendarType="US"
                    minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
                    maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
                    tileContent={({ date }) => {
                        if (calendarData?.find(x => x.isImg && x.date === moment(date).format('YYYY-MM-DD'))) {
                            return (
                                <>
                                    <div>
                                        {moment(date).format('DD') < 10
                                            ? moment(date).format('D')
                                            : moment(date).format('DD')}
                                    </div>
                                    <div className="dotArea">
                                        <span className="greenDot"></span>
                                        <span className="purpleDot"></span>
                                    </div>
                                </>
                            );
                        } else if (calendarData?.find(x => x.date === moment(date).format('YYYY-MM-DD'))) {
                            return (
                                <>
                                    <div>
                                        {moment(date).format('DD') < 10
                                            ? moment(date).format('D')
                                            : moment(date).format('DD')}
                                    </div>
                                    <div className="dotArea">
                                        <span className="greenDot"></span>
                                    </div>
                                </>
                            );
                        } else {
                            return (
                                <>
                                    <div>
                                        {moment(date).format('DD') < 10
                                            ? moment(date).format('D')
                                            : moment(date).format('DD')}
                                    </div>
                                </>
                            );
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
                                    let emojiSrc;
                                    let conditiontxt;
                                    if (item.emotion === 'happy') {
                                        emojiSrc = '/images/emoji/happy.png';
                                        conditiontxt = '아주 상쾌함';
                                    } else if (item.emotion === 'soso') {
                                        emojiSrc = '/images/emoji/soso.png';
                                        conditiontxt = '그냥 그럼';
                                    } else if (item.emotion === 'tired') {
                                        emojiSrc = '/images/emoji/tired.png';
                                        conditiontxt = '피곤함';
                                    } else if (item.emotion === 'good') {
                                        emojiSrc = '/images/emoji/bad.png';
                                        conditiontxt = '안좋음';
                                    } else if (item.emotion === 'stress') {
                                        emojiSrc = '/images/emoji/stress.png';
                                        conditiontxt = '나쁨';
                                    }
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
                                                        <li style={{ display: 'flex' }}>
                                                            {item.emotion && (
                                                                <img
                                                                    src={emojiSrc}
                                                                    alt={item.emotion}
                                                                    width="20px"
                                                                    height="20px"
                                                                />
                                                            )}
                                                            {item.emotion && <p>{conditiontxt}</p>}
                                                        </li>
                                                        <li>
                                                            {item.didGym
                                                                ? '✅ 오늘 운동 완료'
                                                                : '❌ 오늘 운동 실패.. 내일은 꼭 해야지!'}
                                                        </li>
                                                        <li>
                                                            {item.goodSleep
                                                                ? '🙌🏻 꿀잠 자고 일어남'
                                                                : '❌ 꿀잠 못잠.. 왜지?'}
                                                        </li>
                                                        <li>
                                                            {item.howEat
                                                                ? '😁 80% 이상 건강하게 먹음'
                                                                : '❌ 오늘은 갓생 보류..'}
                                                        </li>
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
                    {cookies.Authorization ? (
                        <Link to="/everyImgList" className="linkMore">
                            전체보기 &nbsp;＞
                        </Link>
                    ) : (
                        <Link className="linkMore" onClick={() => alert('로그인이 필요한 서비스입니다.')}>
                            전체보기 &nbsp;＞
                        </Link>
                    )}
                </div>
                <div className={`albumList col${latestImgs.length}`}>
                    {latestImgs.length === 0 ? (
                        <div className="img"></div>
                    ) : (
                        latestImgs.map(item => (
                            <div className="img" key={item.imagePath}>
                                <img src={item.imagePath} alt="" />
                            </div>
                        ))
                    )}
                </div>
            </H.MainAlbum>

            {cookies.Authorization && (
                <C.AddPost>
                    <Link to="/writetoday">
                        <span>+</span>
                        <span className="hidden">오늘 하루 기록하기</span>
                    </Link>
                </C.AddPost>
            )}
        </div>
    );
}

export default Home;
