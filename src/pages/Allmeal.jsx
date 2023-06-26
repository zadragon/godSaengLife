import React, { useEffect, useState } from 'react';
import { PostApi } from '../shared/api';
import { useCookies } from 'react-cookie';

const Allmeal = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const [allMeal, setAllMeal] = useState([]);

    useEffect(() => {
        if (cookies.Authorization) {
            PostApi.getAllMeal(cookies.Authorization)
                .then(response => {
                    setAllMeal(response.data.feeds);
                    console.log('전체사진:', response.data.feeds);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [cookies.Authorization]);

    return (
        <div className="albumList grid grid-cols-3 gap-1">
            {allMeal.length === 0 ? (
                <div className="img"></div>
            ) : (
                allMeal.map((item, index) =>
                    item.FeedImages.map((images, index) => (
                        <div className="img" key={index}>
                            <img src={images.imagePath} alt="" className="rounded-lg object-cover w-full h-full" />
                        </div>
                    ))
                )
            )}
        </div>
    );
};

export default Allmeal;
