import styled from 'styled-components';

export const MainTab = styled.div`
    padding: 15px 0;
    border-bottom: 6px solid #f8f8f9;
    .tabInner {
        padding: 4px 6px;
        background: #f8f8f9;
        display: flex;
        border-radius: 8px;
        width: calc(100% - 32px);
        margin: 0 auto;
        button {
            display: block;
            width: 50%;
            height: 28px;
            font-size: 14px;
            color: #aaacb3;
            font-family: 'Pretendard-Bold';
            &.active {
                background: #21242e;
                color: #fff;
                box-shadow: 0px 1px 3px rgba(213, 255, 102, 0.16);
                border-radius: 6px;
            }
        }
    }
    .tabCont {
        margin-top: 12px;

        .empty {
            text-align: center;
            padding: 32px 0 28px;
            p {
                display: inline-block;
                padding: 52px 0 0;
                background: url('/images/icons/img-empty.svg') no-repeat center top;
            }
        }
        .conditionList {
            & > div {
                display: flex;
                width: calc(100% - 32px);
                margin: 0 auto;
                padding: 12px;
                flex-direction: column;
                align-items: flex-start;
                border-radius: 8px;
                background: var(--neutral-100, #f8f8f9);
            }

            .btnArea {
                width: 100%;
                display: flex;
                justify-content: flex-end;
            }
            .btnEdit {
                display: block;
                width: 24px;
                height: 24px;
                background: url('/images/icons/icon-edit.svg') no-repeat center top;
            }
            ul {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                gap: 12px;
            }
            li {
                font-size: 14px;
                font-family: Pretendard;
                font-weight: 700;
                line-height: 20px;
            }
        }
        .imgList {
            overflow-y: scroll;
            padding: 0 16px;
            .imgRail {
                display: flex;
                justify-content: start;
                flex-wrap: nowrap;
                width: 720px;
                gap: 4px;
            }
            .img {
                width: 112px;
                height: 112px;
                border-radius: 8px;
                overflow: hidden;
                img {
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                }
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
        justify-content: center;
        margin-top: 12px;
        gap: 10px;
        .img {
            width: 112px;
            height: 112px;
            overflow: hidden;
            border-radius: 8px;
            background: #f8f8f9 url('/images/icons/img-star.svg') no-repeat center;
            img {
                object-fit: cover;
                width: 100%;
                height: 100%;
            }
        }
    }
`;
