import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthApi } from '../../shared/api';
import * as M from '../../styles/member';
import * as C from '../../styles/common';
import { TextField } from '@mui/material';
import TermsPop from '../../components/TermsPop';

// 닉네임 정규식
const nicknameRegex = /[^ㄱ-ㅎ가-힣a-zA-Z]/g;

// 이메일 정규식
const emailRegex = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

// 비밀번호 정규식
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

// 오류 메세지
const alertMessage = {
    emailErr: '이메일 형식이 올바르지 않습니다.',
    pwErr: '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!',
    pwMachErr: '패스워드가 불일치합니다.',
    signinUpComplete: '회원가입에 성공했습니다.',
    signinUpFail: '어라? 뭔가 문제가 생긴 것 같아요!',
};

function Signup() {
    const navigate = useNavigate();
    const [showTooltip, setShowTooltip] = useState(false);
    const [inputs, setInputs] = useState({
        payload: {
            nickname: '',
            email: '',
            password: '',
        },
    });
    const [pwConfirm, setPwConfirm] = useState('');

    const initErrorMsg = {
        nickErrorMsg: '',
        emailErrorMsg: '',
        pwErrorMsg: '',
        pwMatchErrorMsg: '',
        pwValid: '',
    };
    const [errMsg, setErrMsg] = useState(initErrorMsg);

    const { nickErrorMsg, emailErrorMsg, pwErrorMsg, pwMatchErrorMsg, pwValid } = errMsg;

    const onChangeHandler = e => {
        const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출

        if (name == 'nickname') {
            if (value.length < 1 || value.length > 8) {
                //console.log('닉네임은 4글자 이상 9글자 이하로 입력해주세요!');
                setErrMsg({
                    ...errMsg,
                    nickErrorMsg: '닉네임은 1글자 이상 8글자 이하로 입력해주세요!',
                });
            } else {
                setErrMsg(initErrorMsg);
            }
        } else if (name == 'email') {
            if (!emailRegex.test(value)) {
                setErrMsg({
                    ...errMsg,
                    emailErrorMsg: '이메일 형식이 올바르지 않습니다.',
                });
            } else {
                setErrMsg(initErrorMsg);
            }
        } else if (name == 'password') {
            if (!passwordRegex.test(value)) {
                setErrMsg({
                    ...errMsg,
                    pwErrorMsg: '숫자+영문자+특수문자(@$!%*?&) 조합으로 8자리 이상 입력해주세요!',
                });
            } else {
                setErrMsg(initErrorMsg);
            }
        }

        setInputs({
            ...inputs, // 기존의 input 객체를 복사한 뒤
            payload: {
                ...inputs.payload,
                [name]: value, // name 키를 가진 값을 value 로 설정
            },
        });

        console.log(inputs);
    };

    const onChangePwConfirmHandler = e => {
        const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setPwConfirm(value);

        if (inputs.payload.password !== value) {
            setErrMsg({
                ...errMsg,
                pwMatchErrorMsg: '비밀번호가 맞는지 다시 한번 확인해주세요.',
            });
        } else {
            setErrMsg({
                ...errMsg,
                pwMatchErrorMsg: '',
            });
        }
    };

    const onSubmitHandler = e => {
        if (inputs.payload.password == pwConfirm) {
            AuthApi.signup(inputs.payload, navigate);
        } else {
            setErrMsg({
                ...errMsg,
                pwMatchErrorMsg: '비밀번호가 맞는지 다시 한번 확인해주세요.',
            });
        }

        //navigate('/login');
    };

    return (
        <div className="section">
            <C.PageHeader>
                <button className="btnPrev" onClick={() => navigate(-1)}>
                    <span className="hidden">뒤로가기</span>
                </button>
                <h2>회원가입</h2>
            </C.PageHeader>
            <M.ProfileImg></M.ProfileImg>
            <M.Inputs>
                <div className="row">
                    <TextField
                        label="닉네임"
                        name="nickname"
                        variant="outlined"
                        fullWidth
                        onChange={onChangeHandler}
                        helperText={nickErrorMsg}
                        placeholder="닉네임 (2 - 9자 사이)"
                    />
                </div>
                <div className="row">
                    <TextField
                        label="이메일"
                        name="email"
                        variant="outlined"
                        fullWidth
                        onChange={onChangeHandler}
                        placeholder="네이버, 다음, 구글 이메일만 가능합니다."
                        helperText={emailErrorMsg}
                    />
                </div>
                <div className="row">
                    <TextField
                        type="password"
                        name="password"
                        label="비밀번호"
                        variant="outlined"
                        fullWidth
                        onChange={onChangeHandler}
                        placeholder="숫자+영문+특수문자(@$!%*?&) 8자리 이상"
                        helperText={pwErrorMsg}
                    />
                </div>
                <div className="row">
                    <TextField
                        type="password"
                        name="passwordConfim"
                        label="비밀번호 재입력"
                        variant="outlined"
                        fullWidth
                        onChange={onChangePwConfirmHandler}
                        helperText={pwMatchErrorMsg}
                    />
                </div>
                <div className="txtTerms">
                    아래 버튼을 선택함으로써 <br /> 개인정보 제공 및 이용 에 동의합니다.
                    <span onClick={() => setShowTooltip(true)}> 내용보기</span>
                </div>
                <M.BtnJoinArea>
                    <M.BtnJoin onClick={onSubmitHandler}>회원가입</M.BtnJoin>
                </M.BtnJoinArea>
            </M.Inputs>
            {showTooltip && <TermsPop setShowTooltip={setShowTooltip} />}
        </div>
    );
}
export default Signup;
const StSignupContainer = styled.div`
    max-width: 500px;
    margin: 15px auto;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    flex-direction: column;
`;
const StBtn = styled.button`
    margin: 10px;
    background-color: ${props => props.backgroundcolor};
    position: relative;
    border: 0;
    padding: 15px 25px;
    display: inline-block;
    text-align: center;
    color: white;
    border-radius: 10px;
    &:active {
        background-color: white;
        color: black;
    }
`;

const StAlertBox = styled.div`
    color: tomato;
    font-weight: bold;
`;
