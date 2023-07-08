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
`;
