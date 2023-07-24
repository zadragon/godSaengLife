import React, { useState } from 'react';
import styled from '@emotion/styled';
import { PostApi } from '../../shared/api';
import { useCookies } from 'react-cookie';

const OverlayImg = ({ imgUrl, imageId, setImgViewUrl }) => {
    const [cookies] = useCookies();

    const deleteImg = () => {
        PostApi.deleteOneImg(imageId, cookies.Authorization);
        setImgViewUrl({ view: false, url: '', feedId: '' });
    };

    const closeDimmed = e => {
        console.log(e.target.id);
        e.target.id == 'dimmed' && setImgViewUrl({ view: false, url: '', feedId: '' });
    };

    const [popActive, setPopActive] = useState(false);
    const confirmTool = bool => {
        setPopActive(bool);
    };

    return (
        <OverLayArea onClick={e => closeDimmed(e)} id="dimmed">
            <div className="imgArea">
                <img src={imgUrl} alt="" />
                <button className="btnClose" onClick={() => setImgViewUrl({ view: false, url: '', feedId: '' })}>
                    <span className="hidden">닫기</span>
                </button>
                <button className="btnDelImg" onClick={() => confirmTool(true)}>
                    <span className="hidden">이미지 삭제</span>
                </button>
            </div>

            <div className={`tool ${popActive ? 'active' : ''}`}>
                <p>정말로 삭제하시겠어요?</p>
                <button onClick={() => confirmTool(false)} className="black">
                    취소
                </button>
                <button onClick={() => deleteImg()}>삭제하기</button>
            </div>
        </OverLayArea>
    );
};

const OverLayArea = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background: rgba(0, 0, 0, 0.65);

    .tool {
        position: absolute;
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
    }

    .imgArea {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 8px;
        overflow: hidden;
        width: 300px;
        img {
            width: 100%;
            height: auto;
        }
    }

    .btnClose {
        position: absolute;
        top: 16px;
        right: 16px;
        width: 24px;
        height: 24px;
        background: url('/images/icons/icon-close.svg') no-repeat;
    }
    .btnDelImg {
        position: absolute;
        bottom: 16px;
        right: 16px;
        width: 24px;
        height: 24px;
        background: url('/images/icons/icon-delete.svg') no-repeat;
    }
`;

export default OverlayImg;
