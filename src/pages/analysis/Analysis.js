import React, { useEffect, useState } from 'react';
import { analysis } from '../../shared/api';
import { useCookies } from 'react-cookie';
import { ResponsiveLine } from '@nivo/line';

const Analysis = () => {
    const [cookies] = useCookies();
    const [chart1, setChart1] = useState([]);

    useEffect(() => {
        analysis.getWeekData(cookies.Authorization, setChart1);
    }, []);

    const data = [
        {
            id: 'japan',
            color: 'hsl(136, 70%, 50%)',
            data: [
                {
                    x: 'plane',
                    y: 147,
                },
                {
                    x: 'helicopter',
                    y: 198,
                },
                {
                    x: 'boat',
                    y: 158,
                },
                {
                    x: 'train',
                    y: 277,
                },
                {
                    x: 'subway',
                    y: 78,
                },
                {
                    x: 'bus',
                    y: 99,
                },
                {
                    x: 'car',
                    y: 55,
                },
                {
                    x: 'moto',
                    y: 204,
                },
                {
                    x: 'bicycle',
                    y: 282,
                },
                {
                    x: 'horse',
                    y: 91,
                },
                {
                    x: 'skateboard',
                    y: 280,
                },
                {
                    x: 'others',
                    y: 34,
                },
            ],
        },
    ];

    return (
        <div>
            <div style={{ height: '400px' }}>
                <ResponsiveLine
                    data={data}
                    style={{ height: '400px' }}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    xScale={{ type: 'point' }}
                    yScale={{
                        type: 'linear',
                        min: 'auto',
                        max: 'auto',
                        stacked: true,
                        reverse: false,
                    }}
                    yFormat=" >-.2f"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'transportation',
                        legendOffset: 36,
                        legendPosition: 'middle',
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'count',
                        legendOffset: -40,
                        legendPosition: 'middle',
                    }}
                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        },
                    ]}
                />
            </div>
        </div>
    );
};

export default Analysis;
