import React from 'react';

function LvNumber({ totalPointScore, style }) {
    return (
        <div style={style}>
            {totalPointScore === undefined
                ? 'Lv.?'
                : totalPointScore <= 25
                ? 'Lv.1'
                : totalPointScore <= 75
                ? 'Lv.2'
                : totalPointScore <= 125
                ? 'Lv.3'
                : totalPointScore <= 175
                ? 'Lv.4'
                : totalPointScore <= 225
                ? 'Lv.5'
                : totalPointScore <= 275
                ? 'Lv.6'
                : totalPointScore <= 350
                ? 'Lv.7'
                : 'Lv.8'}
        </div>
    );
}

export default LvNumber;
