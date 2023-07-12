import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useQuery } from '@tanstack/react-query';
import { PutApi, PostApi } from '../../shared/api';
import * as P from '../../styles/post';
import * as C from '../../styles/common';
import styled from 'styled-components';
import Loading from '../../components/common/Loading';

function EditFeed({ onUpdate }) {
    const { feedId, imageId } = useParams();
    const [selectedImg, setSelectedImg] = useState([]);
    const [mainImg, setMainImg] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const [cookies] = useCookies();
    const [popActive, setPopActive] = useState(false); // 삭제 묻는 툴팁 팝업

    const {
        data: dataFeed,
        isLoading,
        error,
        refetch,
    } = useQuery(['getFeed'], () => PostApi.getFeed(location.state.feedId));

    const [showHomeButton, setShowHomeButton] = useState(false);
    const [selectedButtons, setSelectedButtons] = useState({
        emotion: '',
        howEat: '',
        didGym: '',
        goodSleep: '',
    });
    const [postCreateAt, setPostCreateAt] = useState('');

    useEffect(() => {
        dataFeed &&
            setSelectedButtons({
                emotion: dataFeed?.data.feed.emotion,
                howEat: dataFeed?.data.feed.howEat,
                didGym: dataFeed?.data.feed.didGym,
                goodSleep: dataFeed?.data.feed.goodSleep,
            });

        // 월 (0부터 시작하기 때문에 1을 더해줌)
        const date = new Date(dataFeed?.data.feed.createdAt);

        const month = date.getMonth() + 1;
        // // 일
        const day = date.getDate();

        // // 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)
        const dayOfWeek = date.getDay();

        // // 요일을 텍스트로 변환하는 함수
        const getDayOfWeekText = dayOfWeek => {
            const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
            return daysOfWeek[dayOfWeek];
        };

        setPostCreateAt(`${month}월${day}일 (${getDayOfWeekText(dayOfWeek)})`);
    }, [dataFeed]);
    const feedImgs = dataFeed && dataFeed?.data.feed.FeedImages;

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

        await PutApi.editData(formData, feedId)
            .then(() => {
                alert('수정 되었습니다.');
                navigate('/');
            })
            .catch(error => {
                console.log('피드 수정 실패', error);
            });
    };

    const handleDelete = async () => {
        if (!confirm('정말 피드를 삭제하시겠습니까?')) {
            return false;
        } else {
            try {
                await PostApi.deleteFeed(feedId, cookies.Authorization);
                navigate('/');
            } catch (error) {
                console.log('피드 삭제 실패', error);
            }
        }
    };

    const handleHomeClick = () => {
        navigate('/');
    };

    const deleteImg = async () => {
        try {
            await PostApi.deleteAllImg(feedId, cookies.Authorization);
        } catch (error) {
            console.log('전체 이미지 삭제 실패', error);
        }
        setPopActive(false);
    };

    useEffect(() => {
        const h3 = document.querySelectorAll('.modifyPage h3');
        h3.forEach(item => {
            item.addEventListener('click', e => {
                e.target.closest('h3').classList.toggle('active');
            });
        });
    }, []);

    const buttonState = {
        emotion: [
            {
                state: 'happy',
                stateKor: '아주 상쾌함',
                imgSrc: '/images/emoji/happy.png',
            },
            {
                state: 'soso',
                stateKor: '그냥 그럼',
                imgSrc: '/images/emoji/soso.png',
            },
            {
                state: 'tired',
                stateKor: '피곤함',
                imgSrc: '/images/emoji/tired.png',
            },
            {
                state: 'good',
                stateKor: '안좋음',
                imgSrc: '/images/emoji/bad.png',
            },
            {
                state: 'stress',
                stateKor: '나쁨',
                imgSrc: '/images/emoji/stress.png',
            },
        ],
        howEat: [
            {
                state: true,
                stateKor: '80% 이상 건강하게 먹음',
                imgSrc: '/images/icons/icon-howEat.png',
            },
            {
                state: false,
                stateKor: '오늘은 갓생 보류...',
                imgSrc: '/images/icons/icon-x.png',
            },
        ],
        didGym: [
            {
                state: true,
                stateKor: '오늘 운동 완료',
                imgSrc: '/images/icons/icon-didGym.png',
            },
            {
                state: false,
                stateKor: '오늘 운동 실패... 내일은 꼭 해야지!',
                imgSrc: '/images/icons/icon-x.png',
            },
        ],
        goodSleep: [
            {
                state: true,
                stateKor: '꿀잠자고 일어남',
                imgSrc: '/images/icons/icon-goodSleep.png',
            },
            {
                state: false,
                stateKor: '꿀잠 못잠... 왜지?',
                imgSrc: '/images/icons/icon-x.png',
            },
        ],
    };

    //if (isLoading) return <Loading />;
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
                            <button className="btnCommon btnHome" onClick={handleHomeClick}>
                                <span className="hidden">홈으로 가기</span>X
                            </button>
                        )}
                    </h2>
                    <div className="btnCommon">
                        <button onClick={handleEdit}>수정</button>
                    </div>
                </C.PageHeader>
            </div>
            <P.CreateAt>{postCreateAt}</P.CreateAt>
            <P.SelectCondition className="modifyPage">
                <h3>오늘 하루 컨디션은?</h3>
                <div className="selectArea">
                    {buttonState.emotion.map(item => {
                        return (
                            <button
                                key={item.imgSrc}
                                id={item.state}
                                className={`${selectedButtons.emotion === item.state ? 'active' : ''}`}
                                onClick={() => handleButtonClick('emotion', item.state)}
                            >
                                <img src={item.imgSrc} /> {item.stateKor}
                            </button>
                        );
                    })}
                </div>

                {selectedButtons &&
                    buttonState?.emotion.map(
                        item =>
                            item.state == selectedButtons?.emotion && (
                                <button key={item.imgSrc} className="selectedState">
                                    <img src={item.imgSrc} />
                                    {item.stateKor}
                                </button>
                            )
                    )}
            </P.SelectCondition>
            <P.SelectCondition className="modifyPage">
                <h3>꽤 건강한 음식 위주로 먹었다.</h3>
                <div className="selectArea">
                    {buttonState.howEat.map(item => {
                        return (
                            <button
                                key={item.imgSrc}
                                id={item.state ? 'howEatO' : 'howEatX'}
                                className={`${selectedButtons.howEat === item.state ? 'active' : ''}`}
                                onClick={() => handleButtonClick('howEat', item.state)}
                            >
                                <img src={item.imgSrc} /> {item.stateKor}
                            </button>
                        );
                    })}
                </div>
                {selectedButtons &&
                    buttonState?.howEat.map(
                        item =>
                            item.state == selectedButtons?.howEat && (
                                <button key={item.imgSrc} className="selectedState">
                                    <img src={item.imgSrc} />
                                    {item.stateKor}
                                </button>
                            )
                    )}
            </P.SelectCondition>
            <P.SelectCondition className="modifyPage">
                <h3>오늘 운동 완료?</h3>
                <div className="selectArea">
                    {buttonState.didGym.map(item => {
                        return (
                            <button
                                key={item.imgSrc}
                                id={item.state ? 'didGymO' : 'didGymX'}
                                className={`${selectedButtons.didGym === item.state ? 'active' : ''}`}
                                onClick={() => handleButtonClick('didGym', item.state)}
                            >
                                <img src={item.imgSrc} /> {item.stateKor}
                            </button>
                        );
                    })}
                </div>
                {selectedButtons &&
                    buttonState?.didGym.map(
                        item =>
                            item.state == selectedButtons?.didGym && (
                                <button key={item.imgSrc} className="selectedState">
                                    <img src={item.imgSrc} />
                                    {item.stateKor}
                                </button>
                            )
                    )}
            </P.SelectCondition>
            <P.SelectCondition className="modifyPage">
                <h3>오늘 꿀잠자고 일어난 날?</h3>
                <div className="selectArea">
                    {buttonState.goodSleep.map(item => {
                        return (
                            <button
                                key={item.imgSrc}
                                id={item.state ? 'goodSleepO' : 'goodSleepX'}
                                className={`${selectedButtons.goodSleep === item.state ? 'active' : ''}`}
                                onClick={() => handleButtonClick('goodSleep', item.state)}
                            >
                                <img src={item.imgSrc} /> {item.stateKor}
                            </button>
                        );
                    })}
                </div>
                {selectedButtons &&
                    buttonState?.goodSleep.map(
                        item =>
                            item.state == selectedButtons?.goodSleep && (
                                <button key={item.imgSrc} className="selectedState">
                                    <img src={item.imgSrc} />
                                    {item.stateKor}
                                </button>
                            )
                    )}
            </P.SelectCondition>
            <P.SelectCondition className="modifyPage">
                <h3>오늘 먹은 음식 올리기</h3>
                <div className="delIcon" onClick={() => setPopActive(true)}>
                    <img src="/images/icons/icon-delete.svg" alt="전체 이미지 삭제" />
                    전체 사진 삭제
                </div>
                <P.PictureTool className="pictureArea">
                    <P.PhotoInput>
                        <P.FileIcon src="/images/icons/icon-camera.svg" alt="파일 선택" />
                        <P.FileInput type="file" name="images" multiple onChange={setImgFile} accept="image/*" />
                    </P.PhotoInput>
                    {feedImgs?.map(item => (
                        <P.ImgTool key={item.imagePath} className="img">
                            <Image src={item.imagePath} alt="" />
                        </P.ImgTool>
                    ))}
                    {selectedImg.map((image, index) => (
                        <P.ImgTool key={image}>
                            <Image alt={`미리보기 ${index}`} src={URL.createObjectURL(image)} />
                        </P.ImgTool>
                    ))}
                </P.PictureTool>
            </P.SelectCondition>
            <P.SelectCondition>
                <div className="FeedDelBtn">
                    <button onClick={handleDelete}>피드 삭제</button>
                </div>
            </P.SelectCondition>
            <C.ConfirmLayer className={`tool ${popActive ? 'active' : ''}`}>
                <p>사진을 정말로 삭제하시겠어요?</p>
                <button onClick={() => setPopActive(false)} className="black">
                    취소
                </button>
                <button onClick={() => deleteImg()}>삭제하기</button>
            </C.ConfirmLayer>
        </div>
    );
}

export default EditFeed;

// 이미지 컴포넌트에 스타일을 적용합니다.
const Image = styled.img`
    max-width: 100%;
`;
