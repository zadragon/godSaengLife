import React from 'react';
import { styled } from 'styled-components';

const Swiperpage = ({ title, paragraph, imgSrc }) => {
    return (
        <SwiperpageWrap>
            <TextArea>
                <strong>{title}</strong>
                <p>{paragraph}</p>
            </TextArea>
            <ImgArea>
                <img src={imgSrc} alt="" />
            </ImgArea>
        </SwiperpageWrap>
    );
};
const SwiperpageWrap = styled.div`
    position: relative;
    height: 100vh;
    padding: 76px 16px 44px;
    display: flex;
    flex-direction: column;
    /* 400px 이상인 경우에만 적용될 스타일 */
    @media screen and (min-width: 400px) {
        height: calc(100vh - 70px);
    }
`;

const TextArea = styled.div`
    text-align: center;
    strong {
        color: var(--neutral-900, #21242e);
        text-align: center;
        font-size: 20px;
        line-height: 32px; /* 160% */
        font-weight: normal;
        font-family: 'Pretendard-Bold';
    }
    p {
        display: block;
        width: 220px;
        margin: 12px auto 0;
        color: var(--neutral-900, #21242e);
        font-size: 14px;
        line-height: 20px; /* 114.286% */
    }
`;

const ImgArea = styled.div`
    width: 100%;
    margin-top: 60px;
    padding: 0 21px;
    text-align: center;
    display: flex;
    justify-content: center;
`;

export default Swiperpage;
