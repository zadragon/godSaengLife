import React, { useEffect, useState } from 'react';
import * as A from '../../styles/analysis';
import { ResponsiveBar } from '@nivo/bar';
import { analysis } from '../../shared/api';
import { useQuery } from '@tanstack/react-query';
import Calendar from 'react-calendar';
import moment from 'moment';
import Loading from '../../components/common/Loading';

const MonthData = ({ setShowTooltip }) => {
    const [monthState, setMonthState] = useState(0);
    const {
        data: dataM,
        isLoading: isLoadingM,
        isError: isErrorM,
        refetch: moveMonth,
    } = useQuery(['getMonthData', monthState], () => analysis.getMonthData(monthState));

    const [chartM, setChartM] = useState([
        {
            country: 0,
            건강식: 0,
            건강식Color: 'hsl(46, 70%, 50%)',
            운동: 0,
            운동Color: 'hsl(105, 70%, 50%)',
            꿀잠: 0,
            꿀잠Color: 'hsl(170, 70%, 50%)',
        },
    ]);

    useEffect(() => {
        dataM?.periodData &&
            setChartM(
                dataM?.periodData?.map((item, idx) => {
                    const howEat = item.howEat == false || item.howEat == null ? 0 : 1;
                    const didGym = item.didGym == false || item.howEat == null ? 0 : 1;
                    const goodSleep = item.goodSleep == false || item.howEat == null ? 0 : 1;

                    return {
                        id: idx + 1,
                        country: idx + 1,
                        건강식: howEat,
                        건강식Color: 'hsl(46, 70%, 50%)',
                        운동: didGym,
                        운동Color: 'hsl(105, 70%, 50%)',
                        꿀잠: goodSleep,
                        꿀잠Color: 'hsl(170, 70%, 50%)',
                    };
                })
            );
    }, [dataM]);

    const [emotionFilter, setEmotionFilter] = useState([
        {
            emotion: 'happy',
            imgSrc: '/images/emoji/happy.svg',
            emotionKr: '아주 상쾌함',
        },
        {
            emotion: 'good',
            imgSrc: '/images/emoji/soso.svg',
            emotionKr: '편안한 날',
        },
        {
            emotion: 'soso',
            imgSrc: '/images/emoji/tired.svg',
            emotionKr: '그냥 그럼',
        },
        {
            emotion: 'tired',
            imgSrc: '/images/emoji/bad.svg',
            emotionKr: '피곤함',
        },
        {
            emotion: 'stress',
            imgSrc: '/images/emoji/stress.svg',
            emotionKr: '안좋음',
        },
    ]);

    const btnMonthMove = move => {
        if (move == 'prev') {
            setMonthState(monthState => --monthState);
        } else if (move == 'next') {
            setMonthState(monthState => ++monthState);
        }
        moveMonth(monthState);
    };

    const handleMonthClick = () => {};

    if (isLoadingM) return <Loading />;
    if (isErrorM) return <div>...에러발생</div>;

    return (
        <div className="tabCont">
            <A.SelectPeriod>
                <span>
                    {moment(dataM?.periodData[0].date).format('MM') < 10
                        ? moment(dataM?.periodData[0].date).format('YYYY년 M월')
                        : moment(dataM?.periodData[0].date).format('YYYY년 MM월')}
                </span>
                <button
                    className="btnPrev"
                    onClick={() => {
                        btnMonthMove('prev');
                    }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M14 17L10 12L14 7"
                            stroke="#21242E"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <button
                    className="btnNext"
                    onClick={() => {
                        btnMonthMove('next');
                    }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10 17L14 12L10 7"
                            stroke="#21242E"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </A.SelectPeriod>

            <A.Wrapper>
                <div className="condition">
                    <h3>컨디션</h3>
                </div>

                <div className="calendarArea analysis">
                    <Calendar
                        value={dataM?.periodData[0].date}
                        onClickMonth={handleMonthClick}
                        calendarType="US"
                        tileContent={({ date, view }) => {
                            const todayEmotion = dataM?.periodData?.filter(
                                x => x.date && moment(x.date).format('MM/DD/YYYY') == moment(date).format('MM/DD/YYYY')
                            );
                            if (todayEmotion.length > 0) {
                                return (
                                    <div className="emotionArea">
                                        <span className="imoji">
                                            {todayEmotion[0].emotion && (
                                                <img
                                                    src={
                                                        emotionFilter.find(
                                                            item =>
                                                                item.emotion == todayEmotion[0].emotion && item.imgSrc
                                                        )?.imgSrc
                                                    }
                                                />
                                            )}
                                        </span>
                                        <div className="today">
                                            {moment(date).format('DD') < 10
                                                ? moment(date).format('D')
                                                : moment(date).format('DD')}
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <div className="emotionArea">
                                        <span className="imoji"></span>
                                        <div className="today">
                                            {moment(date).format('DD') < 10
                                                ? moment(date).format('D')
                                                : moment(date).format('DD')}
                                        </div>
                                    </div>
                                );
                            }
                        }}
                    />
                </div>

                <div className="godRecord relative">
                    <h3>갓생 기록</h3>
                </div>
                <div className="dataArea">
                    <div className="recordWrap">
                        <div className="col type1">
                            <strong>건강한식단</strong>
                            <div className="w-full flex justify-between">
                                <span>
                                    <img src="/images/chart/icon-meal.svg" alt="" />
                                </span>
                                <span>{dataM.howEatScore}점</span>
                            </div>
                        </div>
                        <div className="col type2">
                            <strong>운동</strong>
                            <div className="w-full flex justify-between">
                                <span>
                                    <img src="/images/chart/icon-play.svg" alt="" />
                                </span>
                                <span>{dataM.didGymScore}점</span>
                            </div>
                        </div>
                        <div className="col type3">
                            <strong>꿀잠</strong>
                            <div className="w-full flex justify-between">
                                <span>
                                    <img src="/images/chart/icon-sleep.svg" alt="" />
                                </span>
                                <span>{dataM.goodSleepScore}점</span>
                            </div>
                        </div>
                    </div>
                    <div className="scrollBar">
                        <div className="barChartArea" style={{ height: '190px' }}>
                            <ResponsiveBar
                                minHeight={300}
                                data={chartM}
                                keys={['건강식', '운동', '꿀잠']}
                                indexBy="country"
                                margin={{ top: 0, right: 0, bottom: 25, left: 0 }}
                                padding={0.5}
                                colors={['#DDFF85', '#E2D9FF', '#FEF58C']}
                                borderRadius={5}
                                innerPadding={3}
                                axisLeft={null}
                                labelSkipWidth={12}
                                labelSkipHeight={12}
                                enableGridY={true}
                                gridYValues={[0]}
                                enableLabel={false}
                                role="application"
                                ariaLabel="Nivo bar chart demo"
                                axisBottom={{
                                    tickSize: 0,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legend: 'country',
                                    legendPosition: 'middle',
                                    legendOffset: 32,
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="pointBox relative">
                    <h3>현재 갓생 포인트</h3>
                    <button className="btnHelpPoint" onClick={() => setShowTooltip(prev => !prev)}>
                        <span className="hidden">갓생포인트 정보</span>
                    </button>
                </div>
                <div className="pointArea">
                    <div className="w-full flex justify-between flex-col gap-4">
                        <div className="row">
                            <strong>{dataM?.totalPointScore} 점</strong>
                            <p>기록시 1점, 사진 업로드시 2점 | 하루 최대 5점</p>
                        </div>
                        <div className="row">
                            <strong> {dataM?.totalFeedDays} 일</strong>
                            <p>기록을 시작한지</p>
                        </div>
                    </div>
                </div>
            </A.Wrapper>
        </div>
    );
};

export default MonthData;
