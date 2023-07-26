import React from 'react';

function LvImg({ totalPointScore, style }) {
    // console.log(style);
    return (
        <div>
            <img
                src={
                    totalPointScore === undefined
                        ? '/images/profile/lv1gray.svg'
                        : totalPointScore <= 25
                        ? '/images/profile/lv1.svg'
                        : totalPointScore <= 75
                        ? '/images/profile/lv2.svg'
                        : totalPointScore <= 125
                        ? '/images/profile/lv3.svg'
                        : totalPointScore <= 175
                        ? '/images/profile/lv4.svg'
                        : totalPointScore <= 225
                        ? '/images/profile/lv5.svg'
                        : totalPointScore <= 275
                        ? '/images/profile/lv6.svg'
                        : totalPointScore <= 350
                        ? '/images/profile/lv7.svg'
                        : '/images/profile/lv8.svg'
                }
                className="profileImg"
                style={style}
            />
        </div>
    );
}

export default LvImg;
