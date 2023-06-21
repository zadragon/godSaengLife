import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { AuthApi, PostApi } from '../shared/api';
import { useCookies } from 'react-cookie';

const Allmeal = () => {
    const [cookies] = useCookies();
    const breakpointColumnsObj = {
        default: 3,
        1100: 2,
        700: 1,
        //화면 크기에따라 보여지는 column수
    };

    const [images, setImages] = useState([]);

    useEffect(() => {
        PostApi.getAllMeal(cookies.Authorization);
        // const fetchPost = async () => {
        //     try {
        //         const response = await AuthApi.getpost();
        //         const data = response.data.feedImage;
        //         setImages(data);
        //     } catch (error) {
        //         console.error(error);
        //     }
        // };
        // fetchPost();
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

export default Allmeal;
