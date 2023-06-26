import React, { useEffect, useState } from 'react';
import { analysis } from '../../shared/api';
import { useCookies } from 'react-cookie';
import { ResponsiveBar } from '@nivo/bar';
import { useQuery } from '@tanstack/react-query';

const Analysis = () => {
    const [cookies] = useCookies();

    const {
        data: dataG,
        isLoading,
        isError,
        refetch,
    } = useQuery(['getMain'], () => analysis.getWeekData(cookies.Authorization));
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
        console.log(dataG);

        setChart(
            dataG?.periodData.map((item, idx) => {
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

    if (isLoading) return <div>...로딩중</div>;
    return (
        <div>
            <div>
                기록을 시작한지 : <strong> {dataG.totalFeedDays} 일</strong>
            </div>
            <div>
                나의 갓생 포인트는? <strong>{dataG.totalPointScore} 점</strong>
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
    );
};

export default Analysis;
