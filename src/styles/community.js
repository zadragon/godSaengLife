import styled from 'styled-components';

export const AddArticleWrap = styled.div`
    padding: 12px 16px;
    height: calc(100vh - 218px);
    overflow-y: auto;
    .row {
        padding: 12px 0 24px;
        &:first-child {
            padding: 0;
            border-bottom: 0.3px solid var(--neutral-300, #d5d6d9);
        }
        input {
            width: 100%;
            height: 48px;
            font-family: 'Pretendard-Medium';
            color: var(--neutral-400, #21242e);
            font-size: 20px;
            line-height: 32px;
            &:focus {
                outline: 0;
            }
        }
        textarea {
            width: 100%;
            height: 100px;
            border-radius: 8px;
            padding: 12px 16px;
            background: var(--neutral-100, #f8f8f9);
            color: var(--neutral-700, #393e4f);
            font-family: 'Pretendard-Bold';
            font-size: 14px;
            line-height: 16px;
            &:focus {
                outline: 0;
                border-radius: 8px;
                background-color: #fff;
                outline: 1px solid var(--neutral-500, #727580);
            }
        }
    }
`;

export const btnAreaFixed = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 16px 16px 20px;
    .row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .label {
            color: var(--neutral-500, #727580);
            font-size: 14px;
            line-height: 20px;
        }
        .MuiSwitch-root,
        .MuiFormControlLabel-root {
            margin: 0;
        }
    }

    button {
        margin-top: 44px;
        display: flex;
        width: 100%;
        color: #fff;
        padding: 16px 24px;
        justify-content: center;
        align-items: center;
        gap: 8px;
        border-radius: 8px;
        background: var(--neutral-900, #21242e);
    }
    /* 500px 이상인 경우에만 적용될 스타일 */
    @media screen and (min-width: 400px) {
        width: 400px;
        margin: 0 auto;
        left: 50%;
        margin-left: -200px;
    }
`;

export const SearchBox = styled.div`
    padding: 16px;
`;

export const CommList = styled.div`
    padding: 0 16px;
`;

export const CommDetail = styled.div`
    padding: 0 16px 16px;
`;

export const AddArticleDone = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 100;
    width: 100%;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    div {
        text-align: center;
        margin-top: -100px;
        width: 280px;
        padding: 24px 0;
        gap: 28px;
        border-radius: 8px;
        background: var(--primary-500, #c7f860);
        strong {
            color: var(--neutral-900, #21242e);
            text-align: center;
            font-size: 20px;
        }
        p {
            color: var(--neutral-500, #727580);
            text-align: center;
            font-size: 12px;
        }
        ul {
            margin-top: 15px;
            display: flex;
            justify-content: center;
            color: var(--neutral-500, #21242e);
            text-align: center;
            font-size: 12px;
            vertical-align: top;
            li:after {
                content: '';
                display: inline-block;
                margin: 0 5px;
                width: 1px;
                height: 10px;
                background-color: #727580;
                margin-top: 3px;
            }
            li:last-child:after {
                display: none;
            }
            a {
                text-decoration: underline;
            }
        }
    }
`;

export const Title = styled.div`
    color: var(--neutral-900, #21242e);
    font-size: 20px;
    line-height: 32px;
    font-family: 'Pretendard-Bold';
    display: flex;
    padding: 8px 0px;
    align-items: flex-start;
    gap: 8px;
    border-bottom: 0.3px solid var(--neutral-300, #d5d6d9);
`;

export const btnLike = styled.button`
    width: 100%;
    padding: 16px 0px;
    gap: 8px;
    border-bottom: 4px solid var(--neutral-300, #d5d6d9);
    background: var(--primary-100, #f7ffe2);
    font-family: 'Pretendard-Bold';
    color: var(--neutral-900, #21242e);
    font-size: 14px;
    line-height: 16px;
    p {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        &:after {
            content: '';
            display: inline-block;
            width: 24px;
            height: 24px;
            background: url('/images/community/icon-heart.svg') no-repeat;
        }
    }
    &.active {
        p:after {
            background: url('/images/community/icon-heart-active.svg') no-repeat;
        }
    }
`;

export const Count = styled.div`
    color: var(--neutral-500, #727580);
    font-size: 12px;
    line-height: 16px;
`;

export const UserNickName = styled.div`
    color: var(--neutral-700, #393e4f);
    font-family: 'Pretendard-Bold';
    font-size: 16px;
    line-height: 24px;
`;

export const CreateAt = styled.div`
    color: var(--neutral-500, #727580);
    font-size: 12px;
    line-height: 16px;
`;

export const CommentAddArea = styled.div`
    position: fixed;
    width: 100%;
    bottom: 60px;
    left: 0;
    border-top: 0.3px solid #d5d6d9;
    padding: 8px 16px 12px;
    width: 100%;
    background-color: #fff;
    input {
        padding: 0 16px;
        width: 100%;
        height: 48px;
        border-radius: 8px;
        background: #f8f8f9;
        color: var(--neutral-400, #393e4f);
        font-size: 14px;
        font-family: 'Pretendard-Medium';
        &::placeholder {
            color: var(--neutral-400, #aaacb3);
            font-size: 14px;
            font-family: 'Pretendard-Medium';
        }
        &:focus {
            border: 1px solid var(--neutral-500, #727580);
            background-color: #fff;
            outline: 0;
        }
    }
    .btnSend {
        position: absolute;
        top: 19px;
        right: 26px;
        width: 24px;
        height: 24px;
        background: url('/images/community/icon-send.svg');
    }

    &.active {
        .btnSend {
            width: 24px;
            height: 24px;
            background: url('/images/community/icon-send-active.svg');
        }
    }

    /* 400px 이상인 경우에만 적용될 스타일 */
    @media screen and (min-width: 400px) {
        width: 400px;
        left: 50%;
        bottom: 95px;
        margin-left: -200px;
    }
`;
