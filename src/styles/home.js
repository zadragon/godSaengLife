import styled from 'styled-components';

export const MainTab = styled.div`
    padding: 15px 16px;
    border-bottom: 6px solid #f8f8f9;
    .tabInner {
        padding: 4px 6px;
        background: #f8f8f9;
        display: flex;
        border-radius: 8px;
        button {
            display: block;
            width: 50%;
            height: 28px;
            font-size: 14px;
            color: #aaacb3;
            font-family: 'Pretendard-Bold';
            &.active {
                background: #ddff85;
                color: #21242e;
                box-shadow: 0px 1px 3px rgba(213, 255, 102, 0.16);
                border-radius: 6px;
            }
        }
    }
    .tabCont {
        .empty {
            text-align: center;
            padding: 32px 0 28px;
            p {
                display: inline-block;
                padding: 52px 0 0;
                background: url('/images/icons/img-empty.svg') no-repeat center top;
            }
        }
    }
`;

export const MainAlbum = styled.div`
    position: relative;
    padding: 5px 16px;
    h2 {
        font-size: 16px;
        font-family: 'Pretendard-Bold';
    }
    .linkMore {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 12px;
    }
    .albumList {
        display: flex;
        justify-content: space-between;
        margin-top: 12px;
        .img {
            width: 112px;
            height: 112px;
            background: #f8f8f9 url('/images/icons/img-star.svg') no-repeat center;
        }
    }
`;
