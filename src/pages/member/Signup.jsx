import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthApi } from '../../shared/api';
import * as M from '../../styles/member';
import { TextField } from '@mui/material';

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
    const [inputs, setInputs] = useState({
        payload: {
            nickname: '',
            email: '',
            password: '',
        },
    });

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
                    pwErrorMsg: '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!',
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

    const onSubmitHandler = e => {
        AuthApi.signup(inputs.payload);

        //navigate('/login');
    };

    return (
        <div>
            <M.MemHeader>
                <h2>회원가입</h2>
            </M.MemHeader>
            <M.Inputs>
                <div className="row">
                    <label>닉네임</label>
                    <input type="text" name="nickname" onChange={onChangeHandler} />
                    <StAlertBox>{nickErrorMsg}</StAlertBox>

                    <TextField label="닉네임" variant="outlined" fullWidth />
                </div>
                <div className="row">
                    <label>이메일</label>
                    <input type="text" name="email" onChange={onChangeHandler} />

                    <TextField label="이메일" variant="outlined" fullWidth />
                    <StAlertBox>{emailErrorMsg}</StAlertBox>
                </div>
                <div className="row">
                    <label>비밀번호</label>
                    <input type="password" name="password" placeholder="Password" onChange={onChangeHandler} />

                    <TextField type="password" label="비밀번호" variant="outlined" fullWidth />
                    <StAlertBox>{pwErrorMsg}</StAlertBox>
                </div>
                <div className="row">
                    <label>
                        비밀번호 재입력
                        <StAlertBox>{pwMatchErrorMsg}</StAlertBox>
                    </label>
                    <input type="password" placeholder="Confirm Password" />

                    <TextField type="password" label="비밀번호 재입력" variant="outlined" fullWidth />
                </div>
                <div>
                    <StBtn backgroundcolor="#7fccde" onClick={onSubmitHandler}>
                        회원가입
                    </StBtn>
                    <Link to={'/'}>
                        <StBtn backgroundcolor="#fa5a5a">취소</StBtn>
                    </Link>
                </div>
            </M.Inputs>
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
