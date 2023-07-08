import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { MainApi, PutApi, PostApi } from '../../shared/api';
import * as P from '../../styles/post';
import * as C from '../../styles/common';
import styled from 'styled-components';

function EditFeed({ onUpdate }) {
    const { feedId, imageId } = useParams();
    const [selectedImg, setSelectedImg] = useState([]);
    const [mainImg, setMainImg] = useState('');
    const location = useLocation();

    console.log('장소:', location);

    const [cookies] = useCookies();
    const {
        data: dataFeed,
        isLoading: isLoadingFeed,
        error: errorFeed,
        refetch: refetchFeed,
    } = useQuery(['getFeed'], () => PostApi.getFeed(location.state.feedId));

    console.log('dataFeed', dataFeed?.data.feed);
    const [showHomeButton, setShowHomeButton] = useState(false);

    //const selectDate = data?.data.feeds.filter(item => location.state.feedId === item.feedId);

    const [selectedButtons, setSelectedButtons] = useState({
        emotion: dataFeed?.data.feed.emotion,
        howEat: dataFeed?.data.feed.howEat,
        didGym: dataFeed?.data.feed.didGym,
        goodSleep: dataFeed?.data.feed.goodSleep,
    });
    // console.log('선택날짜:', selectDate);
    console.log(dataFeed?.data.feed.FeedImages);
    const feedImgs = dataFeed && dataFeed?.data.feed.FeedImages;

    const navigate = useNavigate();

    // useEffect(() => {
    //     refetch();
    // }, [feedId]);

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

    const deleteAllImg = async () => {
        try {
            await PostApi.deleteAllImg(feedId, cookies.Authorization);
        } catch (error) {
            console.log('전체 이미지 삭제 실패', error);
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
                <div className="delIcon">
                    <img onClick={deleteAllImg} src="/images/icons/icon-delete.svg" alt="전체 이미지 삭제" />
                    전체 사진 삭제
                </div>
                <P.PhotoInput>
                    <P.FileIcon src="/images/icons/icon-camera.svg" alt="파일 선택" />
                    <P.FileInput type="file" name="images" multiple onChange={setImgFile} accept="image/*" />
                </P.PhotoInput>
                <ImageContainer>
                    <div className="imgRail" style={{ display: 'flex' }}>
                        {feedImgs?.map((item, idx) => (
                            <ImageWrapper key={idx} className="img">
                                <Image src={item.imagePath} alt="" />
                            </ImageWrapper>
                        ))}
                        {selectedImg.map((image, index) => (
                            <ImageWrapper key={index}>
                                <Image alt={`미리보기 ${index}`} src={URL.createObjectURL(image)} />
                            </ImageWrapper>
                        ))}
                    </div>
                </ImageContainer>
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

const ImageContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
`;

// 스타일드 컴포넌트를 사용하여 이미지를 감싸는 div를 생성합니다.
const ImageWrapper = styled.div`
    display: flex;
    max-width: 100px;
    margin-right: 10px;
    margin-bottom: 10px;
`;

// 이미지 컴포넌트에 스타일을 적용합니다.
const Image = styled.img`
    max-width: 100%;
`;
