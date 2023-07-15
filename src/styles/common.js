import styled from 'styled-components';

/*헤더*/
export const Header = styled.header`
    position: relative;
    width: 100%;
    padding: 20px 16px;
    text-align: left;

    .txtWelcome {
        display: inline-block;
        padding: 12px 24px;
        align-items: center;
        gap: 8px;
        border-radius: 16px 16px 16px 0px;
        background: var(--neutral-900, #21242e);
        font-family: 'Pretendard-Bold';
        font-size: 16px;
        color: #fff;
    }
    .signInOut {
        margin-left: 10px;
        text-decoration: underline;
        cursor: pointer;
    }
`;

/* 페이지 내부 헤더 */
export const PageHeader = styled.div`
    position: relative;
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 121px;
    border-bottom: 0.3px solid var(--neutral-300, #d5d6d9);
    h2 {
        font-size: 20px;
        color: #21242e;
        font-family: 'Pretendard-Bold';
        &.date {
            color: var(--neutral-900, #21242e);
            font-size: 14px;
            line-height: 20px;
        }
    }
    .btnClose {
        position: absolute;
        top: 17px;
        right: 16px;
        width: 24px;
        height: 24px;
        background: url('/images/icons/icon-close.svg') no-repeat center;
    }
    .btnPrev {
        position: absolute;
        top: 17px;
        left: 16px;
        width: 24px;
        height: 24px;
        background: url('/images/icons/icon-prev.svg') no-repeat center;
    }
    .btnDel {
        position: absolute;
        top: 17px;
        right: 16px;
        width: 24px;
        height: 24px;
        background: url('/images/icons/icon-delete.svg') no-repeat center;
    }
    .btnCommon {
        position: absolute;
        top: 17px;
        right: 16px;
        font-size: 14px;
        font-family: 'Pretendard-Medium';
    }
`;

export const GnbBar = styled.nav`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background: #f8f8f9;
    border-top: 0.3px solid #d5d6d9;
    z-index: 100;
    ul {
        display: flex;
        height: 100%;
        justify-content: center;
        gap: 21px;
        li {
            display: flex;
            align-items: center;
            width: 56px;
            font-size: 11px;
            color: #393e4f;
            justify-content: center;
            a {
                display: block;
                width: 100%;
                padding-top: 22px;
                text-align: center;
                color: #8d9996;
            }
            &.active {
                transition: 0.5s;
                a {
                    color: #393e4f;
                    font-family: 'Pretendard-Medium';
                }
            }
            &.home {
                background: url('/images/gnb/menu-home.svg') no-repeat center 5px;
                &.active {
                    background: url('/images/gnb/menu-home-active.svg') no-repeat center 5px;
                }
            }
            &.analyse {
                background: url('/images/gnb/menu-pie.svg') no-repeat center 5px;
                &.active {
                    background: url('/images/gnb/menu-pie-active.svg') no-repeat center 5px;
                }
            }
            &.community {
                background: url('/images/gnb/menu-community.svg') no-repeat center 5px;
                &.active {
                    background: url('/images/gnb/menu-community-active.svg') no-repeat center 5px;
                }
            }
            &.mypage {
                background: url('/images/gnb/menu-user.svg') no-repeat center 5px;
                &.active {
                    background: url('/images/gnb/menu-user-active.svg') no-repeat center 5px;
                }
            }
        }
    }

    /* 500px 이상인 경우에만 적용될 스타일 */
    @media screen and (min-width: 400px) {
        width: 400px;
        margin: 0 auto;
        bottom: 35px;
        left: 50%;
        margin-left: -200px;
    }
`;

export const AddPost = styled.div`
    position: fixed;
    bottom: 70px;
    right: 10px;
    width: 56px;
    height: 56px;
    background: #d5ff66;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.16);
    border-radius: 200px;
    text-align: center;
    line-height: 56px;
    z-index: 100;
    a {
        display: block;
        width: 100%;
        height: 100%;
    }
    span {
        font-size: 22px;
        color: #21242e;
    }
    /* 500px 이상인 경우에만 적용될 스타일 */
    @media screen and (min-width: 400px) {
        left: 50%;
        bottom: 110px;
        margin-left: 133px;
    }
`;

export const TabInner = styled.div`
    padding: 4px 6px;
    background: #f8f8f9;
    display: flex;
    border-radius: 8px;
    width: calc(100% - 32px);
    margin: 0 auto;
    background-color: #fff;
    button {
        display: block;
        width: 50%;
        height: 40px;
        font-size: 14px;
        color: #aaacb3;
        font-family: 'Pretendard-Bold';
        &.active {
            transition: 0.3s;
            position: relative;
            background: #21242e;
            color: #fff;
            box-shadow: 0px 1px 3px rgba(213, 255, 102, 0.16);
            border-radius: 6px;
            &:after {
                content: '';
                position: absolute;
                top: 4px;
                right: 4px;
                display: block;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: var(--secondary-500, #d1c8ff);
            }
        }
    }
    &.gapTop {
        margin-top: 12px;
    }
`;

export const Loading = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 100;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 139px;
        height: 124px;
    }
`;

export const ConfirmLayer = styled.div`
    position: fixed;
    z-index: 100;
    left: 0;
    bottom: 0;
    transform: translateY(100%);
    width: 100%;
    padding: 32px 16px 24px 16px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
    background-color: #fff;
    border-radius: 8px;
    transition: transform 0.15s ease;
    p {
        color: #000;
        /* Paragraph/Small Bold */
        font-size: 14px;
        font-family: Pretendard;
        font-weight: 700;
        line-height: 20px;
        text-align: center;
        display: block;
        margin-bottom: 24px;
    }
    &.active {
        transform: translateY(0);
    }
    button {
        width: 100%;
        height: 44px;
        color: #f44336;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-family: Pretendard;
        font-weight: 700;
        line-height: 20px;
        border-radius: 8px;
        &.black {
            background-color: #21242e;
            color: #fff;
        }
    }
    /* 400px 이상인 경우에만 적용될 스타일 */
    @media screen and (min-width: 400px) {
        width: 400px;
        left: 50%;

        margin-left: -200px;
        &.active {
            bottom: 35px;
        }
    }
`;

export const BtnOnBoarding = styled.button`
    position: absolute;
    bottom: 44px;
    left: 16px;
    width: calc(100% - 32px);
    display: flex;
    padding: 16px 24px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 8px;
    background: var(--primary-500, #c7f860);
    z-index: 100;
    font-family: 'Pretendard-Bold';
    color: #21242e;
    &.bgEmpty {
        background: none;
        color: #727580;
    }
`;

export const BtnOnBoardingWrap = styled.div`
    position: absolute;
    bottom: 44px;
    left: 16px;
    gap: 12px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    padding: 16px 24px;
    justify-content: center;
    align-items: center;
    ${BtnOnBoarding} {
        position: static;
        width: 100%;
    }
`;
