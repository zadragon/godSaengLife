import styled from 'styled-components';

export const Header = styled.div`
    h2 {
    }
`;

export const MemHeader = styled.div`
    position: relative;
    width: 100%;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 121px;
    border-bottom: 0.3px solid var(--neutral-300, #d5d6d9);
    h2 {
        font-size: 20px;
        color: #21242e;
        font-family: 'Pretendard-Bold';
    }
    .btnClose {
        position: absolute;
        top: 10px;
        right: 16px;
        width: 24px;
        height: 24px;
        background: url('/images/icons/icon-close.svg') no-repeat center;
    }
`;

export const Inputs = styled.div`
    width: calc(100% - 32px);
    margin: 48px auto 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const loginFunc = styled.div`
    padding: 0 16px;
    .buttonlogin {
        width: 100%;
        height: 56px;
        color: #21242e;
        background-color: #c7f860;
        font-size: 16px;
        font-family: 'Pretendard-Bold';
        border-radius: 8px;
    }
    .btnLogin {
        display: flex;
        width: 100%;
        margin: 24px auto 0;
        padding: 16px 24px;
        justify-content: center;
        align-items: center;
        gap: 8px;
        border-radius: 8px;
        background: var(--primary-500, #c7f860);
    }
    .loginUtil {
        margin-top: 12px;
        display: flex;
        justify-content: center;
        > * {
            color: var(--neutral-500, #727580);
            font-size: 14px;
            line-height: 20px;
            text-decoration-line: underline;
            &::before {
                content: '|';
                display: inline-block;
                padding: 0 5px;
            }
            &:first-child::before {
                display: none;
            }
        }
    }
`;
