import styled from 'styled-components';

export const Font = styled.p`
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
`;

export const NicknameFont = styled.p`
    color: var(--neutral-900, #21242e);
    /* Paragraph/Large Bold */
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 32px;
`;

export const SubjectFont = styled.div`
    color: var(--neutral-900, #21242e);
    /* Paragraph/Mid Bold */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
`;

export const Container = styled.div`
    margin-top: 12px;
    padding: 0px 16px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 24px;
`;

export const ContainerBottom = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    > div:not(:last-child) {
        margin-bottom: 16px;
    }
`;

export const RightAligned = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

export const FlexContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const Between = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const Graybg = styled.div`
    width: 100%;
    height: 112px;
    background-color: #f8f8f9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
`;
