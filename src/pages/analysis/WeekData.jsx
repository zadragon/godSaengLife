import React, { useEffect, useRef, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import * as A from '../../styles/analysis';
import { useQuery } from '@tanstack/react-query';
import { analysis } from '../../shared/api';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { setGraphImg } from '../../redux/modules/community';
import moment from 'moment';

const WeekData = () => {
    const navigate = useNavigate();
    const captureRef = useRef(null);
    const dispatch = useDispatch();
    const [weekState, setWeekState] = useState(0);
    const {
        data: dataG,
        isLoading,
        isError,
        refetch: moveWeek,
    } = useQuery(['getWeekData', weekState], () => analysis.getWeekData(weekState));
    //const { data: dataG, isLoading, isError, refetch } = useQuery(['getWeekData'], () => analysis.getWeekData());
    // const { periodData = [] } = dataG;
    console.log(dataG);

    const [chart, setChart] = useState([
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
        dataG?.periodData &&
            setChart(
                dataG?.periodData?.map((item, idx) => {
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
    }, [dataG]);
    // console.log('dataG', dataG);

    const handleCapture = () => {
        html2canvas(captureRef.current).then(canvas => {
            // 캡처된 이미지를 사용하여 원하는 작업을 수행합니다.
            // 예를 들어, 이미지를 다운로드하거나 캡처된 이미지를 다른 요소에 삽입할 수 있습니다.
            const image = canvas.toDataURL();
            dispatch(setGraphImg(image));
        });
        navigate('/addArticle');
    };

    //console.log(dataG?.periodData);
    const conditionInfo = {
        dayName: ['월', '화', '수', '목', '금', '토', '일'],
        emotionImg: {
            happy: '/images/chart/icon-emoji-01.svg',
            good: '/images/chart/icon-emoji-02.svg',
            soso: '/images/chart/icon-emoji-03.svg',
            tired: '/images/chart/icon-emoji-04.svg',
            stress: '/images/chart/icon-emoji-05.svg',
        },
    };

    const btnWeekMove = move => {
        if (move == 'prev') {
            setWeekState(weekState => --weekState);
        } else if (move == 'next') {
            setWeekState(weekState => ++weekState);
        }
        console.log(weekState);
        moveWeek(weekState);
    };

    //console.log(conditionInfo.emotionImg);
    if (isLoading) return <div>...로딩중</div>;
    if (isError) return <div>...에러발생</div>;

    return (
        <div className="tabCont">
            <A.SelectPeriod>
                <span>
                    {moment(dataG?.periodData[0].date).format('MM-DD')} (월) -{' '}
                    {moment(dataG?.periodData[6].date).format('MM-DD')} (일)
                </span>
                <button
                    className="btnPrev"
                    onClick={() => {
                        btnWeekMove('prev');
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
                        btnWeekMove('next');
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
                    <ul>
                        {dataG?.periodData &&
                            dataG?.periodData.map((item, idx) => {
                                return (
                                    <li key={idx}>
                                        <p>
                                            <img src={conditionInfo.emotionImg[item.emotion]} />
                                        </p>
                                        <span>{conditionInfo.dayName[idx]}</span>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
                <div className="godRecord relative">
                    <h3>갓생 기록</h3>
                    <button className="btnShare" onClick={() => handleCapture()}>
                        <span>커뮤니티 공유</span>
                    </button>
                </div>
                <div className="dataArea" ref={captureRef}>
                    <div className="recordWrap">
                        <div className="col type1">
                            <strong>건강한식단</strong>
                            <div className="w-full flex justify-between">
                                <span>
                                    <img src="/images/chart/icon-meal.svg" alt="" />
                                </span>
                                <span>{dataG.howEatScore}점</span>
                            </div>
                        </div>
                        <div className="col type2">
                            <strong>운동</strong>
                            <div className="w-full flex justify-between">
                                <span>
                                    <img src="/images/chart/icon-play.svg" alt="" />
                                </span>
                                <span>{dataG.didGymScore}점</span>
                            </div>
                        </div>
                        <div className="col type3">
                            <strong>꿀잠</strong>
                            <div className="w-full flex justify-between">
                                <span>
                                    <img src="/images/chart/icon-sleep.svg" alt="" />
                                </span>
                                <span>{dataG.goodSleepScore}점</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ height: '400px' }}>
                        <ResponsiveBar
                            data={chart}
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
                <div className="pointBox">
                    <h3>
                        현재 갓생 포인트 <img src="/images/chart/icon-medal.svg" alt="" />
                    </h3>
                    <div className="pointArea">
                        <div className="w-full flex justify-between">
                            <div className="row">
                                기록을 시작한지 : <strong> {dataG?.totalFeedDays} 일</strong>
                            </div>
                            <div className="row">
                                나의 갓생 포인트는? <strong>{dataG?.totalPointScore} 점</strong>
                            </div>
                        </div>

                        <p>기록시 1점, 사진 업로드시 2점 | 하루 최대 5점</p>
                    </div>
                </div>
            </A.Wrapper>
        </div>
    );
};

export default WeekData;
