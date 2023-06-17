import React, { useState } from 'react';
import { MainApi, PostApi } from '../shared/api';
import { useCookies } from 'react-cookie';

function Writetoday() {
    const [cookies, setCookie, removeCookie] = useCookies();
    const [selectedImg, setSelectedImg] = useState([]);
    const [selectedButtons, setSelectedButtons] = useState({
        emotion: null,
        howEat: Boolean,
        gymDay: Boolean,
        goodSleep: Boolean,
    });

    const handleButtonClick = buttonValue => {
        setSelectedButtons(prevState => ({
            ...Object.keys(prevState).reduce((acc, key) => {
                acc[key] = key === buttonValue; // 선택된 버튼은 true, 나머지는 false
                return acc;
            }, {}),
        }));
    };

    const handleSave = () => {
        const formData = new FormData();
        selectedImg.forEach(image => {
            formData.append('images', image);
        });

        try {
            const data = {
                // emotion: selectedButtons.emotion,
                // howEat: selectedButtons.howEat,
                // gymDay: selectedButtons.gymDay,
                // goodSleep: selectedButtons.goodSleep,
                feed: {
                    emotion: 'happy',
                    howEat: true,
                    didGym: true,
                    goodSleep: true,
                },
                imagePaths: formData,
            };

            PostApi.saveData(cookies.Authorization, data);
            //const response = MainApi.saveData(cookies.Authorization, data);

            // Handle the response as needed
            //console.log('피드 작성이 완료되었습니다', response);
        } catch (error) {
            // Handle errors
            console.log('피드 작성 실패', error);
        }
    };

    const setImgFile = e => {
        let files = e.target.files;
        setSelectedImg([...selectedImg, ...files]);
    };
    console.log(selectedImg);

    return (
        <div>
            <div>
                <button onClick={handleSave}>저장</button>
            </div>
            <div>
                <div>나의 컨디션</div>
                <div className="flex justify-around">
                    <button
                        id="happy"
                        className={`rounded-full ${selectedButtons['happy'] ? 'bg-gray-300' : ''}`}
                        onClick={() => handleButtonClick('happy')}
                    >
                        🤩
                    </button>
                    <button
                        id="good"
                        className={`rounded-full ${selectedButtons['good'] ? 'bg-gray-300' : ''}`}
                        onClick={() => handleButtonClick('good')}
                    >
                        😊
                    </button>
                    <button
                        id="soso"
                        className={`rounded-full ${selectedButtons['soso'] ? 'bg-gray-300' : ''}`}
                        onClick={() => handleButtonClick('soso')}
                    >
                        😐
                    </button>
                    <button
                        id="tired"
                        className={`rounded-full ${selectedButtons['tired'] ? 'bg-gray-300' : ''}`}
                        onClick={() => handleButtonClick('tired')}
                    >
                        🥱
                    </button>
                    <button
                        id="stress"
                        className={`rounded-full ${selectedButtons['stress'] ? 'bg-gray-300' : ''}`}
                        onClick={() => handleButtonClick('stress')}
                    >
                        😡
                    </button>
                </div>
            </div>
            <div>
                <div>꽤 건강한 음식 위주로 먹었다.</div>
                <div className="flex justify-around">
                    <button
                        id="howEat"
                        className={`rounded-full ${selectedButtons['button1'] ? 'bg-gray-300' : ''}`}
                        onClick={() => handleButtonClick('true')}
                    >
                        O
                    </button>
                    <button
                        id="howEat"
                        className={`rounded-full ${selectedButtons['button2'] ? 'bg-gray-300' : ''}`}
                        onClick={() => handleButtonClick('false')}
                    >
                        X
                    </button>
                </div>
            </div>
            <div>
                <div>운동했다.</div>
                <div className="flex justify-around">
                    <button
                        id="gymDay"
                        className={`rounded-full ${selectedButtons['button3'] ? 'bg-gray-300' : ''}`}
                        onClick={() => handleButtonClick('true')}
                    >
                        O
                    </button>
                    <button
                        id="gymDay"
                        className={`rounded-full ${selectedButtons['button4'] ? 'bg-gray-300' : ''}`}
                        onClick={() => handleButtonClick('false')}
                    >
                        X
                    </button>
                </div>
            </div>
            <div>
                <div>꿀잠 자고 개운한 날이다.</div>
                <div className="flex justify-around">
                    <button
                        id="goodSleep"
                        className={`rounded-full ${selectedButtons['button5'] ? 'bg-gray-300' : ''}`}
                        onClick={() => handleButtonClick('true')}
                    >
                        O
                    </button>
                    <button
                        id="goodSleep"
                        className={`rounded-full ${selectedButtons['button6'] ? 'bg-gray-300' : ''}`}
                        onClick={() => handleButtonClick('false')}
                    >
                        X
                    </button>
                </div>
            </div>
            <div>
                <div>식단 사진 업로드</div>
                <div>사진등록 (최대 5장)</div>

                <input type="file" multiple onChange={setImgFile} />
            </div>
        </div>
    );
}

export default Writetoday;
