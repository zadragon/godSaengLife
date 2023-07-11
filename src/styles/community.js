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
    padding: 16px;
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
