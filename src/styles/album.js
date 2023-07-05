import styled from 'styled-components';

export const AlbumList = styled.div`
    display: flex;
    justify-content: flex-start;
    gap: 1.25%;
    flex-wrap: wrap;
    padding: 0 16px;
    margin-top: 12px;
    .img {
        width: 32.5%;
        overflow: hidden;
        border-radius: 8px;
        display: flex;
        margin-bottom: 5px;
        marginb0tt img {
            object-fit: cover;
        }
    }
`;

export const Filter = styled.div`
    width: calc(100% - 32px);
    margin: 0 auto;
    overflow-x: auto;
    margin-top: 12px;
    ul {
        display: flex;
        flex-wrap: nowrap;
        gap: 8px;
        li {
            display: flex;
            height: 32px;
            padding: 0px 8px 0 32px;
            justify-content: space-between;
            align-items: center;
            gap: 4px;
            border-radius: 4px;
            white-space: nowrap;
            flex-wrap: nowrap;
            color: var(--neutral-500, #727580);
            cursor: pointer;

            /* Description/Medium */
            font-size: 12px;
            line-height: 16px;
            &.type00 {
                padding: 0px 8px;
            }
            &.type01 {
                background: #f8f8f9 url('/images/emoji/happy.png') no-repeat 8px center;
                background-size: 20px;
            }
            &.type02 {
                background: #f8f8f9 url('/images/emoji/soso.png') no-repeat 8px center;
                background-size: 20px;
            }
            &.type03 {
                background: #f8f8f9 url('/images/emoji/tired.png') no-repeat 8px center;
                background-size: 20px;
            }
            &.type04 {
                background: #f8f8f9 url('/images/emoji/bad.png') no-repeat 8px center;
                background-size: 20px;
            }
            &.type05 {
                background: #f8f8f9 url('/images/emoji/stress.png') no-repeat 8px center;
                background-size: 20px;
            }
            img {
                width: 20px;
                height: 20px;
                display: inline-block;
            }
            &.active {
                color: var(--neutral-900, #21242e);
                background-color: var(--primary-400, #ddff85);
            }
        }
    }
`;

export const btnUtilArea = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 0 16px;
    margin-top: 12px;
    button {
        display: flex;
        height: 32px;
        padding: 0px 8px;
        justify-content: center;
        align-items: center;
        gap: 4px;
        border-radius: 4px;
        background: var(--neutral-100, #f8f8f9);
        color: var(--neutral-900, #21242e);

        /* Description/Medium */
        font-size: 12px;
        line-height: 16px;
    }
`;
