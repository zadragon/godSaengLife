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
`;

export const GnbBar = styled.nav`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background: #f8f8f9;
    border-top: 0.3px solid #d5d6d9;
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
            padding-top: 22px;
            justify-content: center;
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
                background: url('/images/gnb/menu-home.svg') no-repeat center 5px;
            }
            &.mypage {
                background: url('/images/gnb/menu-user.svg') no-repeat center 5px;
            }
        }
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
    span {
        font-size: 22px;
        color: #21242e;
    }
`;
