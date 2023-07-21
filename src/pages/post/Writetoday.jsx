import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PostApi } from '../../shared/api';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import * as P from '../../styles/post';
import * as C from '../../styles/common';
import ReactCanvasConfetti from 'react-canvas-confetti';

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
    const [selectedResults, setSelectedResults] = useState({});
    const [showHomeButton, setShowHomeButton] = useState(false);

    const handleButtonClick = (buttonName, buttonValue) => {
        setSelectedButtons(prevState => ({
            ...prevState,
            [buttonName]: buttonValue,
        }));
        setSelectedResults(prevState => ({
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
        if (activeTab === 'result') {
            console.log(selectedResults);
            // Render the selected results in the desired format
        }
        formData.append('emotion', selectedButtons.emotion);
        formData.append('howEat', selectedButtons.howEat);
        formData.append('didGym', selectedButtons.didGym);
        formData.append('goodSleep', selectedButtons.goodSleep);

        try {
            PostApi.saveData(formData);
            fire();
            setTimeout(() => {
                alert('등록되었습니다.');
                navigate('/');
            }, 1000);
        } catch (error) {
            console.log('피드 작성 실패', error);
        }
    };

    const setImgFile = e => {
        let files = e.target.files;
        setSelectedImg([...selectedImg, ...files]);
        console.log(selectedImg);
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

    const handleNextClick = () => {
        handleTabClick('result');
    };

    const handleHomeClick = () => {
        navigate('/');
    };

    //아래부터 폭죽 터뜨리기
    const refAnimationInstance = useRef(null);

    const getInstance = useCallback(instance => {
        refAnimationInstance.current = instance;
    }, []);

    const makeShot = useCallback((particleRatio, opts) => {
        refAnimationInstance.current &&
            refAnimationInstance.current({
                ...opts,
                origin: { y: 0.7 },
                particleCount: Math.floor(200 * particleRatio),
            });
    }, []);

    const canvasStyles = {
        position: 'fixed',
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
    };

    const fire = useCallback(() => {
        makeShot(0.25, {
            spread: 26,
            startVelocity: 55,
        });

        makeShot(0.2, {
            spread: 60,
        });

        makeShot(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8,
        });

        makeShot(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2,
        });

        makeShot(0.1, {
            spread: 120,
            startVelocity: 45,
        });
    }, [makeShot]);

    const [tabStae, setTabState] = useState([
        { tabName: '나의 컨디션', tabNameEng: 'condition', active: true },
        { tabName: '건강한 음식', tabNameEng: 'healthyFood', active: false },
        { tabName: '운동', tabNameEng: 'exercise', active: false },
        { tabName: '꿀잠', tabNameEng: 'goodSleep', active: false },
        { tabName: '사진 선택', tabNameEng: 'photo', active: false },
    ]);

    const handleTabClick = tab => {
        setActiveTab(tab);
        setShowHomeButton(tab === 'condition');
        setTabState(
            tabStae.map(item => {
                return {
                    ...item,
                    active: item.tabNameEng == tab && true,
                };
            })
        );
    };

    const imgDel = idx => {
        setSelectedImg(selectedImg.filter((item, i) => i !== idx));
    };

    return (
        <div>
            <C.PageHeader>
                <button className="btnPrev" onClick={() => navigate(-1)}>
                    <span className="hidden">뒤로가기</span>
                </button>
                <h2>하루 기록</h2>
                {activeTab === 'photo' && (
                    <>
                        {selectedImg.length > 0 ? (
                            <button className="btnCommon" onClick={handleNextClick}>
                                다음으로
                            </button>
                        ) : (
                            <button className="btnCommon" onClick={handleNextClick}>
                                건너뛰기
                            </button>
                        )}
                    </>
                )}
                {showHomeButton && (
                    <button className="btnHome" onClick={handleHomeClick}>
                        <span className="hidden">홈으로 가기</span>X
                    </button>
                )}
                {activeTab === 'result' && (
                    <>
                        <button className="btnCommon save-button" onClick={handleSave}>
                            저장
                        </button>
                    </>
                )}
            </C.PageHeader>
            {activeTab !== 'result' && (
                <P.PostTab>
                    <ul className={`${tabStae.find(item => item.active).tabNameEng}`}>
                        {tabStae.map(item => {
                            return (
                                <li
                                    className={`menu-tab ${item.active ? 'active' : ''}`}
                                    onClick={() => handleTabClick(item.tabNameEng)}
                                    key={item.tabName}
                                >
                                    <span className="hidden">{item.tabName}</span>
                                </li>
                            );
                        })}
                    </ul>
                </P.PostTab>
            )}

            {activeTab === 'condition' && (
                <P.SelectCondition>
                    <h3>오늘 하루 컨디션은?</h3>
                    <p> </p>
                    <div className="selectArea">
                        <button
                            id="happy"
                            className={`${selectedButtons['emotion'] === 'happy' ? 'bg-gray-300' : ''}`}
                            onClick={() => handleButtonClick('emotion', 'happy')}
                        >
                            <img src="images/emoji/happy.png" /> 아주 상쾌함
                        </button>

                        <button
                            id="soso"
                            className={`${selectedButtons['emotion'] === 'soso' ? 'bg-gray-300' : ''}`}
                            onClick={() => handleButtonClick('emotion', 'soso')}
                        >
                            <img src="images/emoji/soso.png" /> 그냥 그럼
                        </button>
                        <button
                            id="tired"
                            className={`${selectedButtons['emotion'] === 'tired' ? 'bg-gray-300' : ''}`}
                            onClick={() => handleButtonClick('emotion', 'tired')}
                        >
                            <img src="images/emoji/tired.png" /> 피곤함
                        </button>
                        <button
                            id="good"
                            className={`${selectedButtons['emotion'] === 'good' ? 'bg-gray-300' : ''}`}
                            onClick={() => handleButtonClick('emotion', 'good')}
                        >
                            <img src="images/emoji/bad.png" /> 안좋음
                        </button>
                        <button
                            id="stress"
                            className={`${selectedButtons['emotion'] === 'stress' ? 'bg-gray-300' : ''}`}
                            onClick={() => handleButtonClick('emotion', 'stress')}
                        >
                            <img src="images/emoji/stress.png" /> 나쁨
                        </button>
                    </div>
                </P.SelectCondition>
            )}
            {activeTab === 'healthyFood' && (
                <P.SelectCondition>
                    <h3>오늘 먹은 음식은?</h3>
                    <p>건강한 음식 위주로 섭취했을까요?</p>
                    <div className="selectArea">
                        <button
                            id="howEatO"
                            className={`${selectedButtons['howEat'] === true ? 'bg-gray-300' : ''}`}
                            onClick={() => handleButtonClick('howEat', true)}
                        >
                            <img src="images/icons/icon-howEat.png" /> 80% 이상 건강하게 먹음
                        </button>
                        <button
                            id="howEatX"
                            className={`${selectedButtons['howEat'] === false ? 'bg-gray-300' : ''}`}
                            onClick={() => handleButtonClick('howEat', false)}
                        >
                            <img src="images/icons/icon-x.png" /> 오늘은 갓생 보류...
                        </button>
                    </div>
                </P.SelectCondition>
            )}
            {activeTab === 'exercise' && (
                <P.SelectCondition>
                    <h3>오늘 운동 완료?</h3>
                    <p>체력관리를 위한 꾸준한 운동은 필수!</p>
                    <div className="selectArea">
                        <button
                            id="didGymO"
                            className={`${selectedButtons['didGym'] === true ? 'bg-gray-300' : ''}`}
                            onClick={() => handleButtonClick('didGym', true)}
                        >
                            <img src="images/icons/icon-didGym.png" /> 오늘 운동 완료
                        </button>
                        <button
                            id="didGymX"
                            className={`${selectedButtons['didGym'] === false ? 'bg-gray-300' : ''}`}
                            onClick={() => handleButtonClick('didGym', false)}
                        >
                            <img src="images/icons/icon-x.png" /> 오늘 운동 실패... 내일은 꼭 해야지!
                        </button>
                    </div>
                </P.SelectCondition>
            )}
            {activeTab === 'goodSleep' && (
                <P.SelectCondition>
                    <h3>오늘 꿀잠자고 일어난 날?</h3>
                    <p>수면의 질이 하루 컨디션을 좌우하기도 해요!</p>
                    <div className="selectArea">
                        <button
                            id="goodSleepO"
                            className={`${selectedButtons['goodSleep'] === true ? 'bg-gray-300' : ''}`}
                            onClick={() => handleButtonClick('goodSleep', true)}
                        >
                            <img src="images/icons/icon-goodSleep.png" /> 꿀잠자고 일어남
                        </button>
                        <button
                            id="goodSleepX"
                            className={`${selectedButtons['goodSleep'] === false ? 'bg-gray-300' : ''}`}
                            onClick={() => handleButtonClick('goodSleep', false)}
                        >
                            <img src="images/icons/icon-x.png" /> 꿀잠 못잠... 왜지?
                        </button>
                    </div>
                </P.SelectCondition>
            )}
            {activeTab === 'photo' && (
                <P.SelectCondition>
                    <h3>오늘 먹은 음식 올리기</h3>
                    <p>나의 갓생 식단을 기록해봅시다!(다섯 장까지 가능)</p>
                    <P.PictureTool>
                        <P.PhotoInput>
                            <P.FileIcon src="images/icons/icon-camera.svg" alt="파일 선택" />
                            <P.FileInput type="file" name="images" multiple onChange={setImgFile} accept="image/*" />
                        </P.PhotoInput>

                        {selectedImg.map((image, index) => (
                            <P.ImgTool key={index}>
                                <img alt={`미리보기 ${index}`} src={URL.createObjectURL(image)} />
                                <button onClick={() => imgDel(index)}>
                                    <span className="hidden">삭제</span>
                                </button>
                            </P.ImgTool>
                        ))}
                    </P.PictureTool>
                    {selectedImg.length > 5 && <p>사진은 다섯 장까지만 선택해야 피드가 등록됩니다!</p>}
                </P.SelectCondition>
            )}
            {activeTab === 'result' && (
                <P.SelectCondition>
                    <div className="lastpage">
                        <h3>오늘 하루 컨디션은?</h3>
                        {selectedButtons.emotion === 'happy' && (
                            <p>
                                <img src="images/emoji/happy.png" />
                                아주 상쾌함
                            </p>
                        )}
                        {selectedButtons.emotion === 'soso' && (
                            <p>
                                <img src="images/emoji/soso.png" />
                                그냥 그럼
                            </p>
                        )}
                        {selectedButtons.emotion === 'tired' && (
                            <p>
                                <img src="images/emoji/tired.png" />
                                피곤함
                            </p>
                        )}
                        {selectedButtons.emotion === 'bad' && (
                            <p>
                                <img src="images/emoji/bad.png" />
                                안좋음
                            </p>
                        )}
                        {selectedButtons.emotion === 'stress' && (
                            <p>
                                <img src="images/emoji/stress.png" />
                                나쁨
                            </p>
                        )}
                        <h3>오늘 먹은 음식은?</h3>
                        {selectedButtons.howEat && (
                            <p>
                                <img src="images/icons/icon-howEat.png" /> 80% 이상 건강하게 먹음
                            </p>
                        )}
                        {!selectedButtons.howEat && (
                            <p>
                                <img src="images/icons/icon-x.png" /> 갓생 보류...
                            </p>
                        )}
                        <h3>오늘 운동 완료?</h3>
                        {selectedButtons.didGym && (
                            <p>
                                <img src="images/icons/icon-didGym.png" />
                                완료
                            </p>
                        )}
                        {!selectedButtons.didGym && (
                            <p>
                                <img src="images/icons/icon-x.png" /> 실패... 내일은 꼭 해야지!
                            </p>
                        )}
                        <h3>오늘 꿀잠자고 일어난 날?</h3>
                        {selectedButtons.goodSleep && (
                            <p>
                                <img src="images/icons/icon-goodSleep.png" />
                                꿀잠자고 일어남
                            </p>
                        )}
                        {!selectedButtons.goodSleep && (
                            <p>
                                <img src="images/icons/icon-x.png" />
                                꿀잠 못잠... 왜지?
                            </p>
                        )}
                        <h3>오늘 먹은 음식 올리기</h3>
                        <div className="image-container">
                            {selectedImg.map((image, index) => (
                                <div className="imgTool" key={image}>
                                    <img
                                        alt={`미리보기 ${index}`}
                                        src={URL.createObjectURL(image)}
                                        className="preview-image"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </P.SelectCondition>
            )}
            <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
        </div>
    );
}

export default Writetoday;
