import styled from 'styled-components';

export const PostTab = styled.div`
    margin-top: 50px;
    padding: 0 16px;
    ul {
        display: flex;
        li {
            width: 20%;
            height: 6px;
            border-radius: 4px;
            background: var(--neutral-900, #21242e);
        }
    }
`;

export const SelectCondition = styled.div`
    margin-top: 50px;
    padding: 0 16px;
    h3 {
        color: var(--neutral-900, #21242e);
        /* Paragraph/Large Bold */
        font-size: 20px;
        font-family: Pretendard;
        font-weight: 700;
        line-height: 32px;
    }
    .selectArea {
        margin-top: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 24px;
        button {
            display: inline-flex;
            min-width: 135px;
            width: auto;
            height: 52px;
            padding: 12px 24px 12px 20px;
            justify-content: center;
            align-items: center;
            gap: 8px;
            border-radius: 200px;
            background: var(--neutral-100, #f8f8f9);
            font-size: 16px;
            font-family: Pretendard;
            font-weight: 700;
            line-height: 24px;
            color: var(--neutral-500, #727580);
            text-align: center;
            transition: 0.3s;
            &:hover {
                background: var(--primary-200, #ebffb8);
            }
            &:focus {
                background: var(--neutral-900, #21242e);
                color: #fff;
            }
        }
    }
`;
