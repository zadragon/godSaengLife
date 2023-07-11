import styled from 'styled-components';

export const PostTab = styled.div`
    margin-top: 50px;
    padding: 0 16px;
    ul {
        position: relative;
        display: flex;
        gap: 2px;
        background-color: #f8f8f9;
        flex-wrap: wrap;
        li {
            width: calc(20% - 2px);
            height: 6px;
            border-radius: 4px;
        }
        &.condition {
            li:nth-child(-n + 1) {
                background: var(--neutral-900, #21242e);
            }
        }
        &.healthyFood {
            li:nth-child(-n + 2) {
                background: var(--neutral-900, #21242e);
            }
        }
        &.exercise {
            li:nth-child(-n + 3) {
                background: var(--neutral-900, #21242e);
            }
        }
        &.goodSleep {
            li:nth-child(-n + 4) {
                background: var(--neutral-900, #21242e);
            }
        }
        &.photo {
            li:nth-child(-n + 5) {
                &::before {
                    content: '';
                    display: block;
                    width: 100%;
                    height: 6px;
                    border-radius: 4px;
                    position: absolute;
                    top: 0;
                    left: 0;
                    background-color: #c7f860;
                }
                background: var(--neutral-900, #21242e);
            }
        }
    }
`;

export const SelectCondition = styled.div`
    margin-top: 24px;
    padding: 0 16px;
    h3 {
        color: var(--neutral-900, #21242e);
        /* Paragraph/Large Bold */
        font-size: 20px;
        font-family: Pretendard;
        font-weight: 700;
        line-height: 32px;
        & + p {
            color: var(--neutral-500, #727580);
            font-size: 14px;
            line-height: 16px;
        }
    }
    .selectArea {
        margin-top: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 12px;
        button {
            display: inline-flex;
            width: 100%;
            height: 72px;
            padding: 12px 24px 12px 20px;
            border-radius: 8px;
            justify-content: flex-start;
            align-items: center;
            gap: 8px;
            background: var(--neutral-100, #f8f8f9);
            font-size: 16px;
            font-family: Pretendard;
            font-weight: 700;
            line-height: 24px;
            color: var(--neutral-500, #393e4f);
            text-align: center;
            transition: 0.3s;
            &:hover {
                background: var(--primary-200, #ebffb8);
            }
            &:focus,
            &.active {
                background: var(--neutral-900, #21242e);
                color: #fff;
            }
        }
    }
    .FeedDelBtn {
        display: flex;
        justify-content: center;
        align-items: center;

        button {
            color: red;
        }
    }
    .image-container {
        display: flex;
        flex-wrap: wrap;

        flex-direction: row;
        justify-content: space-between;
        img {
            width: 32%;
        }
    }
`;

export const PhotoInput = styled.label`
    border-radius: 8px;
    background: #21242e;
    display: flex;
    width: 112px;
    height: 112px;
    padding: 32px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    cursor: pointer;
`;

export const FileInput = styled.input`
    display: none;
`;

export const FileIcon = styled.img`
    width: 24px;
    height: 24px;
`;

export const pictureTool = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 56px;
    gap: 16px;
`;

export const ImgTool = styled.div`
    width: 112px;
    height: 112px;
    overflow: hidden;
    border-radius: 8px;
    img {
        width: auto;
        height: 100%;
        object-fit: cover;
    }
`;
// export const FeedDelBtn = styled.button`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     color: red;
// `;
