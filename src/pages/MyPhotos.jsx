import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { AuthApi } from '../shared/api';

const MyPhotos = () => {
    const breakpointColumnsObj = {
        default: 3,
        1100: 2,
        700: 1,
    };

    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await AuthApi.getpost();
                const data = response.data.feedImage; // 받아온 데이터 중 이미지 배열을 가져옵니다.
                setImages(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPost();
    }, []);

    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid-column"
        >
            {images.map((image, index) => (
                <div key={index}>
                    <img src={image} alt={`Image ${index + 1}`} />
                </div>
            ))}
        </Masonry>
    );
};

export default MyPhotos;
