import styled from 'styled-components';

export const Wrapper = styled.div`
    margin-top: 24px;
    padding: 0 16px 100px;
    .condition {
        h3 {
            color: var(--neutral-900, #21242e);
            /* Paragraph/Mid Bold */
            font-family: 'Pretendard-Bold';
            font-size: 16px;
            font-weight: 700;
            line-height: 24px;
        }
        ul {
            margin-top: 8px;
            display: flex;
            background-color: #fff;
            border-radius: 8px;
            justify-content: space-between;
            padding: 16px 24px;
            li {
                width: 14.28%;
                text-align: center;
                p {
                    display: block;
                    height: 26px;
                    text-align: center;
                    padding-bottom: 2px;
                    img {
                        margin: 0 auto;
                    }
                }
                span {
                    margin-top: 2px;
                    display: block;
                    border-top: 0.3px solid var(--neutral-300, #d5d6d9);
                    color: var(--neutral-500, #727580);
                    text-align: center;
                    font-size: 12px;
                    font-weight: 500;
                    line-height: 20px;
                }
            }
        }
    }
    .godRecord {
        margin-top: 24px;
        .btnShare {
            position: absolute;
            top: 0;
            right: 0;
            color: var(--neutral-500, #727580);

            /* Paragraph/Small Medium */
            font-size: 14px;
            font-family: Pretendard;
            font-style: normal;
            font-weight: 500;
            line-height: 20px;
        }
        h3 {
            color: var(--neutral-900, #21242e);
            /* Paragraph/Mid Bold */
            font-family: 'Pretendard-Bold';
            font-size: 16px;
            font-weight: 700;
            line-height: 24px;
        }
    }
    .recordWrap {
        display: flex;
        justify-content: space-between;
        margin-top: 8px;
        .col {
            width: 32%;
            border-radius: 8px;
            display: flex;
            padding: 8px;
            flex-direction: column;
            justify-content: center;
            &.type1 {
                background: var(--primary-400, #ddff85);
            }
            &.type2 {
                background: var(--secondary-400, #e2d9ff);
            }
            &.type3 {
                background: var(--warning-400, #fef58c);
            }
        }
    }
    .pointBox {
        margin-top: 24px;
        h3 {
            display: flex;

            color: var(--neutral-900, #21242e);
            /* Paragraph/Mid Bold */
            font-family: 'Pretendard-Bold';
            font-size: 16px;
            font-weight: 700;
            line-height: 24px;
        }
        .pointArea {
            display: flex;
            width: 100%;
            margin-top: 8px;
            padding: 8px 24px;
            flex-direction: column;
            align-items: flex-start;
            gap: 2px;
            border-radius: 8px;
            background: #fff;
            strong {
                color: var(--neutral-900, #21242e);

                /* Paragraph/Mid Bold */
                font-size: 16px;
                font-family: Pretendard;
                font-weight: 700;
                line-height: 24px;
            }
            p {
                color: var(--neutral-400, #aaacb3);

                /* Description/Medium */
                font-size: 12px;
                font-family: Pretendard;
                font-weight: 500;
                line-height: 20px;
            }
        }
    }
    .calendarArea {
        margin-top: 12px;
        border-radius: 8px;
        overflow: hidden;
        .react-calendar__month-view__days button {
            background-color: #fff;
            border: 0;
        }
        .react-calendar__tile--active:after {
            display: none;
        }
    }
    .scrollBar {
        overflow-y: auto;
        padding-bottom: 10px;

        .chartArea {
            width: '1000px';
            height: '400px';
        }
    }
`;
export const SelectPeriod = styled.div`
    position: relative;
    width: calc(100% - 32px);
    height: 48px;
    margin: 12px auto 0;
    display: flex;
    align-items: center;
    border-bottom: 0.3px solid var(--neutral-300, #d5d6d9);
    justify-content: center;
    button {
        position: absolute;
        width: 24px;
        height: 24px;
        &.btnPrev {
            left: 0;
        }
        &.btnNext {
            right: 0;
        }
    }
`;
