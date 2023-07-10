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

export const LvFont = styled.p`
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
`;

export const LvFontBg = styled.div`
    margin-top: -30px;
    padding: 0px 4px;
    border-radius: 4px;
    background: var(--primary-50050, rgba(214, 247, 129, 0.5));
`;

export const SubjectFont = styled.div`
    /* Paragraph/Mid Bold */
    color: var(--neutral-900, #21242e);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
`;

export const BadgeFont = styled.div`
    /* Paragraph/Mid Bold */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
`;

export const BadgeContent = styled.div`
    color: var(--neutral-500, #727580);
    /* Paragraph/Small Medium */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
`;

export const BadgeContentContainer = styled.div`
    padding: 16px;
    border-radius: 8px;
`;

export const Container = styled.div`
    margin-top: 12px;
    padding: 0px 16px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 12px;
    .ProfileImg {
        border-bottom: 0.3px solid var(--neutral-300, #d5d6d9);
    }
`;

export const ProfileImg = styled.img`
    margin: 0px auto;
    align-self: stretch;
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

export const Input = styled.input`
    border-radius: 8px;
    border: 3px solid var(--primary-50050, rgba(214, 247, 129, 0.5));
    display: flex;
    width: 100%;
    height: 48px;
    padding: 12px 16px;
    align-items: center;
`;

export const ButtonEditNickname = styled.button`
    display: flex;
    width: 100&;
    min-width: 343px;
    padding: 16px 24px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 8px;
    background: var(--primary-50050, rgba(214, 247, 129, 0.5));
`;

export const BadgeContainer = styled.div`
    display: flex;
    width: 100%;
    padding: 24px 0px;
    justify-content: center;
    align-items: flex-start;
    align-content: flex-start;
    gap: 32px 24px;
    flex-wrap: wrap;
    border-radius: 12px;
    background: var(--neutral-900, #21242e);
`;

export const Frame = styled.div`
    display: flex;
    height: 84px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    flex: 1 0 0;
    border-radius: 4px;
    background: url(<path-to-image>), lightgray 50% / cover no-repeat, #21242e;
`;
