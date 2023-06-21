import React, { useState } from 'react';
import { PostApi } from '../shared/api';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';

function Writetoday() {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies();
    const [selectedImg, setSelectedImg] = useState([]);
    const [selectedButtons, setSelectedButtons] = useState({
        emotion: null,
        howEat: Boolean,
        didGym: Boolean,
        goodSleep: Boolean,
    });

    const handleButtonClick = (buttonName, buttonValue) => {
        setSelectedButtons(prevState => ({
            ...prevState,
            [buttonName]: buttonValue,
        }));

        if (buttonName === 'emotion') {
            handleTabClick('healthyFood');
        } else if (buttonName === 'howEat') {
            handleTabClick('exercise');
        } else if (buttonName === 'didGym') {
            handleTabClick('goodSleep');
        } else if (buttonName === 'goodSleep') {
            handleTabClick('photo');
        }
    };

    const handleSave = () => {
        const formData = new FormData();
        selectedImg.forEach((images, index) => {
            formData.append('images', images);
        });
        // console.log(formData.getAll('images')); // Prints an array of appended files
        // for (let entry of formData.entries()) {
        //     console.log(entry); // Prints each key-value pair in the FormData
        // }

        formData.append('emotion', selectedButtons.emotion);
        formData.append('howEat', selectedButtons.howEat);
        formData.append('didGym', selectedButtons.didGym);
        formData.append('goodSleep', selectedButtons.goodSleep);
        try {
            PostApi.saveData(cookies.Authorization, formData);
        } catch (error) {
            console.log('피드 작성 실패', error);
        }
    };

    const setImgFile = e => {
        let files = e.target.files;
        setSelectedImg([...files]);

        var reader = new FileReader();
        reader.onload = function (event) {
            setMainImg(event.target.result);
        };
        reader.readAsDataURL(files[0]);
    };

    //미리보기 이미지 상태
    const [mainImg, setMainImg] = useState('');

    // 탭
    const [activeTab, setActiveTab] = useState('condition');

    const handleTabClick = tabName => {
        setActiveTab(tabName);
    };

    return (
        <div>
            <div className="flex-start flex-row">
                <Link to="/">＜</Link>
                <div className="text-center text-2xl">하루 기록</div>
            </div>
            <div>
                <div className="flex justify-around">
                    <div
                        className={`menu-tab ${activeTab === 'condition' ? 'active bg-gray-800 w-300 h-70' : ''}`}
                        onClick={() => handleTabClick('condition')}
                    >
                        나의 컨디션
                    </div>
                    <div
                        className={`menu-tab ${activeTab === 'healthyFood' ? 'active bg-gray-800 w-300 h-70' : ''}`}
                        onClick={() => handleTabClick('healthyFood')}
                    >
                        건강한 음식
                    </div>
                    <div
                        className={`menu-tab ${activeTab === 'exercise' ? 'active bg-gray-800 w-300 h-70' : ''}`}
                        onClick={() => handleTabClick('exercise')}
                    >
                        운동
                    </div>
                    <div
                        className={`menu-tab ${activeTab === 'goodSleep' ? 'active bg-gray-800 w-300 h-70' : ''}`}
                        onClick={() => handleTabClick('goodSleep')}
                    >
                        꿀잠
                    </div>
                    <div
                        className={`menu-tab ${activeTab === 'photo' ? 'active bg-gray-800 w-300 h-70' : ''}`}
                        onClick={() => handleTabClick('photo')}
                    >
                        사진 선택
                    </div>
                </div>
            </div>
            {activeTab === 'condition' && (
                <div>
                    <h2 className="text-2xl">오늘 하루 컨디션은?</h2>
                    <div className="flex flex-col">
                        <button
                            id="happy"
                            className={`rounded-full ${selectedButtons['emotion'] === 'happy' ? 'bg-gray-300' : ''}`}
                            onClick={() => handleButtonClick('emotion', 'happy')}
                        >
                            😁 아주 상쾌함
                        </button>

                        <button
                            id="soso"
                            className={`rounded-full ${selectedButtons['emotion'] === 'soso' ? 'bg-gray-300' : ''}`}
                            onClick={() => handleButtonClick('emotion', 'soso')}
                        >
                            🙃 그냥 그럼
                        </button>
                        <button
                            id="tired"
                            className={`rounded-full ${selectedButtons['emotion'] === 'tired' ? 'bg-gray-300' : ''}`}
                            onClick={() => handleButtonClick('emotion', 'tired')}
                        >
                            🥱 피곤함
                        </button>
                        <button
                            id="good"
                            className={`rounded-full ${selectedButtons['emotion'] === 'good' ? 'bg-gray-300' : ''}`}
                            onClick={() => handleButtonClick('emotion', 'good')}
                        >
                            😊 편안한 날
                        </button>
                        <button
                            id="stress"
                            className={`rounded-full ${selectedButtons['emotion'] === 'stress' ? 'bg-gray-300' : ''}`}
                            onClick={() => handleButtonClick('emotion', 'stress')}
                        >
                            😡 나쁨
                        </button>
                    </div>
                </div>
            )}
            {activeTab === 'healthyFood' && (
                <div>
                    <h2 className="text-2xl">꽤 건강한 음식 위주로 먹었다.</h2>
                    <div className="flex flex-col">
                        <button
                            id="howEatO"
                            className={`rounded-full ${selectedButtons['howEat'] === true ? 'bg-gray-300' : ''}`}
                            onClick={() => handleButtonClick('howEat', true)}
                        >
                            O
                        </button>
                        <button
                            id="howEatX"
                            className={`rounded-full ${selectedButtons['howEat'] === false ? 'bg-gray-300' : ''}`}
                            onClick={() => handleButtonClick('howEat', false)}
                        >
                            X
                        </button>
                    </div>
                </div>
            )}
            {activeTab === 'exercise' && (
                <div>
                    <h2 className="text-2xl">오늘 운동 완료?</h2>
                    <div className="flex flex-col">
                        <button
                            id="didGymO"
                            className={`rounded-full ${selectedButtons['didGym'] === true ? 'bg-gray-300' : ''}`}
                            onClick={() => handleButtonClick('didGym', true)}
                        >
                            O
                        </button>
                        <button
                            id="didGymX"
                            className={`rounded-full ${selectedButtons['didGym'] === false ? 'bg-gray-300' : ''}`}
                            onClick={() => handleButtonClick('didGym', false)}
                        >
                            X
                        </button>
                    </div>
                </div>
            )}
            {activeTab === 'goodSleep' && (
                <div>
                    <h2 className="text-2xl">꿀잠 자고 개운한 날이다.</h2>
                    <div className="flex flex-col">
                        <button
                            id="goodSleepO"
                            className={`rounded-full ${selectedButtons['goodSleep'] === true ? 'bg-gray-300' : ''}`}
                            onClick={() => handleButtonClick('goodSleep', true)}
                        >
                            O
                        </button>
                        <button
                            id="goodSleepX"
                            className={`rounded-full ${selectedButtons['goodSleep'] === false ? 'bg-gray-300' : ''}`}
                            onClick={() => handleButtonClick('goodSleep', false)}
                        >
                            X
                        </button>
                    </div>
                </div>
            )}
            {activeTab === 'photo' && (
                <div>
                    <h2 className="text-2xl">오늘 먹은 음식 올리기</h2>
                    <div>사진등록 (최대 5장)</div>
                    <input type="file" name="images" multiple onChange={setImgFile} accept="image/*" />
                    <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                        {selectedImg.map((image, index) => (
                            <img
                                key={index}
                                alt={`미리보기 ${index}`}
                                src={URL.createObjectURL(image)}
                                style={{ maxWidth: '100px', marginRight: '10px', marginBottom: '10px' }}
                            />
                        ))}
                    </div>
                    {/* <img alt="메인사진" src={mainImg} style={{ maxWidth: '100px' }}></img> */}
                    <div>
                        <button onClick={handleSave}>저장</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Writetoday;
