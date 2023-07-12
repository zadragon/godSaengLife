import React from 'react';

function LvImg({ totalPointScore, style }) {
    console.log(style);
    return (
        <div>
            <img
                src={
                    totalPointScore === undefined
                        ? '/images/profile/lv1gray.png'
                        : totalPointScore <= 25
                        ? '/images/profile/lv1.png'
                        : totalPointScore <= 75
                        ? '/images/profile/lv2.png'
                        : totalPointScore <= 125
                        ? '/images/profile/lv3.png'
                        : totalPointScore <= 175
                        ? '/images/profile/lv4.png'
                        : totalPointScore <= 225
                        ? '/images/profile/lv5.png'
                        : totalPointScore <= 275
                        ? '/images/profile/lv6.png'
                        : totalPointScore <= 350
                        ? '/images/profile/lv7.png'
                        : '/images/profile/lv8.png'
                }
                className="profileImg"
                style={style}
            />
        </div>
    );
}

export default LvImg;
