import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { MainApi, PutApi } from '../shared/api';

function EditFeed({ onUpdate }) {
    const { feedId } = useParams();
    const [selectedImg, setSelectedImg] = useState([]);
    const [mainImg, setMainImg] = useState('');
    const [selectedButtons, setSelectedButtons] = useState({
        emotion: null,
        howEat: false,
        didGym: false,
        goodSleep: false,
    });
    const [cookies] = useCookies();
    const { data, isLoading, error, refetch } = useQuery(['getMain'], () => MainApi.getMain(cookies.Authorization));
    const [value, setValue] = useState(new Date());

    const selectDate = data?.data.feeds.filter(
        item => moment(item.createdAt).format('DD-MM-YYYY') === moment(value).format('DD-MM-YYYY')
    );

    const feedImgs = selectDate?.map(item => item.FeedImages[0]?.imagePath);

    useEffect(() => {
        refetch();
    }, [feedId]);

    const handleButtonClick = (buttonName, buttonValue) => {
        setSelectedButtons(prevState => ({
            ...prevState,
            [buttonName]: buttonValue,
        }));
    };

    const setImgFile = e => {
        const files = e.target.files;
        setSelectedImg([...files]);

        const reader = new FileReader();
        reader.onload = event => {
            setMainImg(event.target.result);
        };
        reader.readAsDataURL(files[0]);
    };

    const handleEdit = async () => {
        const formData = new FormData();
        selectedImg.forEach((images, index) => {
            formData.append('images', images);
        });

        formData.append('emotion', selectedButtons.emotion);
        formData.append('howEat', selectedButtons.howEat);
        formData.append('didGym', selectedButtons.didGym);
        formData.append('goodSleep', selectedButtons.goodSleep);

        try {
            await PutApi.editData(cookies.Authorization, formData, feedId);
            onUpdate(); // Call the callback function to update the data in the parent component
        } catch (error) {
            console.log('피드 수정 실패', error);
        }
    };

    return (
        <div>
            <div className="flex-row">
                <div>
                    <Link to="/">＜</Link>
                </div>
                <div className="text-center text-2xl">피드 수정</div>
            </div>
            <div>
                <div className="conditionList">
                    {selectDate?.map((item, idx) => (
                        <div key={idx}>
                            <ul>
                                <li>😁 {item.emotion}</li>
                                <li>{item.didGym ? '✅ 오늘 진짜 운동 잘됨' : '✅ 운동못함ㅜㅜ'}</li>
                                <li>{item.goodSleep ? '🙌🏻 꿀잠 자고 개운한 날' : '🙌🏻 잠못자서 두드려맞은듯 ㅜㅜ'}</li>
                                <li>{item.howEat ? '😁 건강하게 먹음!!' : '😁 주워먹음'}</li>
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="imgRail">
                    {feedImgs?.map((item, idx) => (
                        <div key={idx} className="img">
                            <img src={item} alt="" />
                        </div>
                    ))}
                </div>
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
                <div>
                    <button onClick={handleEdit}>수정</button>
                </div>
            </div>
        </div>
    );
}

export default EditFeed;
