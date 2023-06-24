import styled from 'styled-components';

export const ProfileImg = styled.div`
    width: 85px;
    height: 85px;
    border-radius: 50%;
    margin: 24px auto 0;
    overflow: hidden;
    background: #21242e url('/images/icons/img-profile.png') no-repeat;
`;

export const Inputs = styled.div`
    width: calc(100% - 32px);
    margin: 48px auto 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    .txtTerms {
        margin-top: 43px;
        text-align: center;
        line-height: 16px;
        font-size: 13px;
        color: #888d9a;
        span {
            margin-top: 20px;
            display: block;
            text-decoration: underline;
            color: #21242e;
        }
    }
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

export const BtnJoinArea = styled.div`
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 10px 16px;
    background: #fff;
    width: 100%;
`;

export const BtnJoin = styled.button`
    width: 100%;
    height: 56px;
    border-radius: 8px;
    background: #21242e;
    color: var(--neutral-000, #fff);
    /* Paragraph/Mid Bold */
    font-size: 16px;
    font-family: 'Pretendard-Medium';
`;

export const JoinDone = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
    .message {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 280px;
        padding: 24px 30px;
        flex-direction: column;
        align-items: center;
        gap: 28px;
        border-radius: 8px;
        background: var(--primary-500, #c7f860);
        text-align: center;
        p {
            color: var(--neutral-900, #21242e);
            text-align: center;

            /* Paragraph/Large Bold */
            font-size: 20px;
            font-family: Pretendard;
            font-weight: 700;
            line-height: 32px;
        }
        span {
            color: var(--neutral-500, #727580);
            text-align: center;

            /* Description/Bold */
            font-size: 12px;
            font-family: Pretendard;
            font-weight: 700;
            line-height: 20px;
        }
        a {
            display: block;
            margin-top: 20px;
            font-size: 14px;
            font-family: Pretendard;
            font-weight: 700;
            line-height: 32px;
            text-decoration: underline;
        }
    }
`;
