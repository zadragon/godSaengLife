import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { MainApi, PutApi, PostApi } from '../../shared/api';
import * as P from '../../styles/post';
import * as C from '../../styles/common';

function EditFeed({ onUpdate }) {
    const { feedId, imageId } = useParams();
    const [selectedImg, setSelectedImg] = useState([]);
    const [mainImg, setMainImg] = useState('');

    const [cookies] = useCookies();
    const { data, isLoading, error, refetch } = useQuery(['getMain'], () => MainApi.getMain(cookies.Authorization));
    const [value, setValue] = useState(new Date());
    const [showHomeButton, setShowHomeButton] = useState(false);

    const selectDate = data?.data.feeds.filter(
        item => moment(item.createdAt).format('DD-MM-YYYY') === moment(value).format('DD-MM-YYYY')
    );
    const [selectedButtons, setSelectedButtons] = useState({
        emotion: selectDate && selectDate.length > 0 ? selectDate[0].emotion : null,
        howEat: selectDate && selectDate.length > 0 ? selectDate[0].howEat : false,
        didGym: selectDate && selectDate.length > 0 ? selectDate[0].didGym : false,
        goodSleep: selectDate && selectDate.length > 0 ? selectDate[0].goodSleep : false,
    });
    console.log(selectDate);
    const feedImgs = selectDate?.map(item => item.FeedImages[0]?.imagePath);

    const navigate = useNavigate();

    useEffect(() => {
        refetch();
    }, [feedId]);

    const handleButtonClick = (buttonName, buttonValue) => {
        setSelectedButtons(prevState => ({
            ...prevState,
            [buttonName]: buttonValue,
        }));
        console.log(selectedButtons);
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

        await PutApi.editData(formData, feedId)
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.log('피드 수정 실패', error);
            });
    };

    const handleDelete = async () => {
        try {
            await PostApi.deleteFeed(feedId, cookies.Authorization);
            navigate('/');
        } catch (error) {
            console.log('피드 삭제 실패', error);
        }
    };

    const photoDelete = async () => {
        try {
            await PostApi.deleteOneImg(imageId, cookies.Authorization);
        } catch (error) {
            console.log('피드 삭제 실패', error);
        }
    };

    const handleHomeClick = () => {
        navigate('/');
    };

    return (
        <div>
            <div>
                <C.PageHeader>
                    <button className="btnPrev" onClick={() => navigate(-1)}>
                        <span className="hidden">뒤로가기</span>
                    </button>
                    <h2>
                        피드 수정
                        {showHomeButton && (
                            <button className="btnHome" onClick={handleHomeClick}>
                                <span className="hidden">홈으로 가기</span>X
                            </button>
                        )}
                    </h2>
                    <div>
                        <button onClick={handleEdit}>수정</button>
                    </div>
                </C.PageHeader>
                <P.SelectCondition>
                    <h3>오늘 하루 컨디션은?</h3>
                    <div className="selectArea">
                        <button
                            id="happy"
                            className={`${selectedButtons.emotion === 'happy' ? 'active' : ''}`}
                            onClick={() => handleButtonClick('emotion', 'happy')}
                        >
                            <img src="/images/emoji/happy.png" /> 아주 상쾌함
                        </button>

                        <button
                            id="soso"
                            className={`${selectedButtons.emotion === 'soso' ? 'active' : ''}`}
                            onClick={() => handleButtonClick('emotion', 'soso')}
                        >
                            <img src="/images/emoji/soso.png" /> 그냥 그럼
                        </button>
                        <button
                            id="tired"
                            className={`${selectedButtons.emotion === 'tired' ? 'active' : ''}`}
                            onClick={() => handleButtonClick('emotion', 'tired')}
                        >
                            <img src="/images/emoji/tired.png" /> 피곤함
                        </button>
                        <button
                            id="good"
                            className={`${selectedButtons.emotion === 'good' ? 'active' : ''}`}
                            onClick={() => handleButtonClick('emotion', 'good')}
                        >
                            <img src="/images/emoji/bad.png" /> 안좋음
                        </button>
                        <button
                            id="stress"
                            className={`${selectedButtons.emotion === 'stress' ? 'active' : ''}`}
                            onClick={() => handleButtonClick('emotion', 'stress')}
                        >
                            <img src="/images/emoji/stress.png" /> 나쁨
                        </button>
                    </div>
                </P.SelectCondition>
            </div>
            <P.SelectCondition>
                <h3>꽤 건강한 음식 위주로 먹었다.</h3>
                <div className="selectArea">
                    <button
                        id="howEatO"
                        className={`${selectedButtons.howEat ? 'active' : ''}`}
                        onClick={() => handleButtonClick('howEat', true)}
                    >
                        <img src="/images/icons/icon-howEat.png" /> 80% 이상 건강하게 먹음
                    </button>
                    <button
                        id="howEatX"
                        className={`${!selectedButtons.howEat ? 'active' : ''}`}
                        onClick={() => handleButtonClick('howEat', false)}
                    >
                        <img src="/images/icons/icon-x.png" /> 오늘은 갓생 보류...
                    </button>
                </div>
            </P.SelectCondition>
            <P.SelectCondition>
                <h3>오늘 운동 완료?</h3>
                <div className="selectArea">
                    <button
                        id="didGymO"
                        className={`${selectedButtons.didGym ? 'active' : ''}`}
                        onClick={() => handleButtonClick('didGym', true)}
                    >
                        <img src="/images/icons/icon-didGym.png" /> 오늘 운동 완료
                    </button>
                    <button
                        id="didGymX"
                        className={`${!selectedButtons.didGym ? 'active' : ''}`}
                        onClick={() => handleButtonClick('didGym', false)}
                    >
                        <img src="/images/icons/icon-x.png" /> 오늘 운동 실패... 내일은 꼭 해야지!
                    </button>
                </div>
            </P.SelectCondition>
            <P.SelectCondition>
                <h3>오늘 꿀잠자고 일어난 날?</h3>
                <div className="selectArea">
                    <button
                        id="goodSleepO"
                        className={`${selectedButtons.goodSleep ? 'active' : ''}`}
                        onClick={() => handleButtonClick('goodSleep', true)}
                    >
                        <img src="/images/icons/icon-goodSleep.png" /> 꿀잠자고 일어남
                    </button>
                    <button
                        id="goodSleepX"
                        className={`${!selectedButtons.goodSleep ? 'active' : ''}`}
                        onClick={() => handleButtonClick('goodSleep', false)}
                    >
                        <img src="/images/icons/icon-x.png" /> 꿀잠 못잠... 왜지?
                    </button>
                </div>
            </P.SelectCondition>
            <P.SelectCondition>
                <h3>오늘 먹은 음식 올리기</h3>

                <P.PhotoInput>
                    <P.FileIcon src="/images/icons/icon-camera.svg" alt="파일 선택" />
                    <P.FileInput type="file" name="images" multiple onChange={setImgFile} accept="image/*" />
                </P.PhotoInput>
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

                <div className="imgRail">
                    {feedImgs?.map((item, idx) => (
                        <div key={idx} className="img">
                            <img
                                src={item}
                                alt=""
                                style={{ maxWidth: '100px', marginRight: '10px', marginBottom: '10px' }}
                            />
                        </div>
                    ))}
                    <div className="delIcon">
                        <img onClick={photoDelete} src="/images/icons/icon-delete.svg" alt="삭제" />
                    </div>
                </div>
            </P.SelectCondition>
            <P.SelectCondition>
                <div className="FeedDelBtn">
                    <button onClick={handleDelete}>피드 삭제</button>
                </div>
            </P.SelectCondition>
        </div>
    );
}

export default EditFeed;
