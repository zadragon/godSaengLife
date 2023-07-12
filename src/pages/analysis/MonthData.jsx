import React, { useEffect, useState } from 'react';
import * as A from '../../styles/analysis';
import { ResponsiveBar } from '@nivo/bar';
import { analysis } from '../../shared/api';
import { useQuery } from '@tanstack/react-query';
import Calendar from 'react-calendar';
import moment from 'moment';
import Loading from '../../components/common/Loading';

const MonthData = () => {
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
                    let d = new Date();
                    let sel_day = -idx; //일자를 조절하시면 됩니다. -1이면 하루전/ +1이면 내일
                    d.setDate(d.getDate() + sel_day);

                    const howEat = item.howEat == false || item.howEat == null ? 0 : 1;
                    const didGym = item.didGym == false || item.howEat == null ? 0 : 1;
                    const goodSleep = item.goodSleep == false || item.howEat == null ? 0 : 1;

                    return {
                        country: d.getDate(),
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
            imgSrc: '/images/emoji/happy.png',
            emotionKr: '아주 상쾌함',
        },
        {
            emotion: 'good',
            imgSrc: '/images/emoji/soso.png',
            emotionKr: '편안한 날',
        },
        {
            emotion: 'soso',
            imgSrc: '/images/emoji/tired.png',
            emotionKr: '그냥 그럼',
        },
        {
            emotion: 'tired',
            imgSrc: '/images/emoji/bad.png',
            emotionKr: '피곤함',
        },
        {
            emotion: 'stress',
            imgSrc: '/images/emoji/stress.png',
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
                        <div className="chartArea">
                            <ResponsiveBar
                                data={chartM}
                                keys={['건강식', '운동', '꿀잠']}
                                indexBy="country"
                                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                                padding={0.3}
                                valueScale={{ type: 'linear' }}
                                indexScale={{ type: 'band', round: true }}
                                colors={{ scheme: 'nivo' }}
                                defs={[
                                    {
                                        id: 'dots',
                                        type: 'patternDots',
                                        background: 'inherit',
                                        color: '#38bcb2',
                                        size: 4,
                                        padding: 1,
                                        stagger: true,
                                    },
                                    {
                                        id: 'lines',
                                        type: 'patternLines',
                                        background: 'inherit',
                                        color: '#eed312',
                                        rotation: -45,
                                        lineWidth: 6,
                                        spacing: 10,
                                    },
                                ]}
                                fill={[
                                    {
                                        match: {
                                            id: 'fries',
                                        },
                                        id: 'dots',
                                    },
                                    {
                                        match: {
                                            id: 'sandwich',
                                        },
                                        id: 'lines',
                                    },
                                ]}
                                borderColor={{
                                    from: 'color',
                                    modifiers: [['darker', 1.6]],
                                }}
                                axisTop={null}
                                axisRight={null}
                                axisBottom={{
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legend: 'country',
                                    legendPosition: 'middle',
                                    legendOffset: 32,
                                }}
                                axisLeft={{
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legend: 'food',
                                    legendPosition: 'middle',
                                    legendOffset: -40,
                                }}
                                labelSkipWidth={12}
                                labelSkipHeight={12}
                                labelTextColor={{
                                    from: 'color',
                                    modifiers: [['darker', 1.6]],
                                }}
                                legends={[
                                    {
                                        dataFrom: 'keys',
                                        anchor: 'bottom-right',
                                        direction: 'column',
                                        justify: false,
                                        translateX: 120,
                                        translateY: 0,
                                        itemsSpacing: 2,
                                        itemWidth: 100,
                                        itemHeight: 20,
                                        itemDirection: 'left-to-right',
                                        itemOpacity: 0.85,
                                        symbolSize: 20,
                                        effects: [
                                            {
                                                on: 'hover',
                                                style: {
                                                    itemOpacity: 1,
                                                },
                                            },
                                        ],
                                    },
                                ]}
                                role="application"
                                ariaLabel="Nivo bar chart demo"
                                barAriaLabel={e => e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue}
                            />
                        </div>
                    </div>
                </div>
                <div className="pointBox">
                    <h3>
                        현재 갓생 포인트 <img src="/images/chart/icon-medal.svg" alt="" />
                    </h3>
                    <div className="pointArea">
                        <div className="w-full flex justify-between">
                            <div className="row">
                                기록을 시작한지 : <strong> {dataM?.totalFeedDays} 일</strong>
                            </div>
                            <div className="row">
                                나의 갓생 포인트는? <strong>{dataM?.totalPointScore} 점</strong>
                            </div>
                        </div>

                        <p>기록시 1점, 사진 업로드시 2점 | 하루 최대 5점</p>
                    </div>
                </div>
            </A.Wrapper>
        </div>
    );
};

export default MonthData;
