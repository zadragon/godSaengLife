import styled from 'styled-components';

export const AlbumList = styled.div`
    display: flex;
    justify-content: space-between;
    .img {
        width: 32%;
        overflow: hidden;
        display: flex;
        img {
            object-fit: cover;
        }
    }
`;
