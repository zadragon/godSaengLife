import styled from 'styled-components';

export const AlbumList = styled.div`
    display: flex;
    justify-content: flex-start;
    gap: 1.25%;
    flex-wrap: wrap;
    padding: 0 16px;
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
