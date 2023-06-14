import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthApi } from '../../shared/api';

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
    const [nickName, setNickName] = useState({
        value: '',
        err: null,
    });
    const [email, setEmail] = useState({
        value: '',
        err: false,
        isDuplicate: false,
    });
    const [password, setPassword] = useState({
        value: '',
        err: null,
    });
    const [confirmPassword, setConfirmPassword] = useState({
        value: '',
        err: null,
    });

    const [nicknameMessage, setNicknameMessage] = useState('');

    //이메일 중복확인용 상태
    // const [emailDuplication, setEmailDuplication] = useState(false);

    // 중복확인 버튼 눌렀을때 메세지 상태
    const [emailDuplicationMessage, setEmailDuplicationMessage] = useState('');

    const onNickNameChangeHandler = event => {
        const inputNickName = event.target.value;
        setNickName(inputNickName);

        if (inputNickName.length < 4 || inputNickName.length > 9) {
            setNicknameMessage('닉네임은 4글자 이상 9글자 이하로 입력해주세요!');
        } else {
            setNicknameMessage('');
        }
    };

    const onEmailChangeHandler = event => {
        const inputEmail = event.target.value;
        const isValidEmail = emailRegex.test(inputEmail);
        setEmail({ value: inputEmail, err: !isValidEmail, isDuplicate: false });
        setEmailDuplicationMessage('');
    };

    const checkEmailDuplication = async () => {
        try {
            // Perform email duplication check request asynchronously
            const res = await AuthApi.checkEmailDuplication(email.value);
            setEmail({ ...email, isDuplicate: res.duplicated });
            if (res.duplicated) {
                setEmailDuplicationMessage('이미 등록된 이메일입니다.');
            } else {
                setEmailDuplicationMessage('등록 가능한 이메일입니다.');
            }
        } catch (err) {
            console.error('Error checking email duplication:', err);
            // Handle the error as desired
        }
    };

    const onPasswordChangeHandler = event => {
        const inputPassword = event.target.value;
        setPassword(prevPassword => ({
            ...prevPassword,
            value: inputPassword,
        }));
    };

    const onConfirmPasswordChangeHandler = event => {
        const inputConfirmPassword = event.target.value;
        setConfirmPassword(prevConfimPw => ({
            ...prevConfimPw,
            value: inputConfirmPassword,
        }));
    };

    const verifySiginUpData = () => {
        // 유효성 검사 결과 저장
        const verifiedNickname = nicknameRegex.test(nickName.value);
        const verifiedPassword = passwordRegex.test(password.value);
        const verifiedEmail = emailRegex.test(email.value);
        const verifiedConfirmPassword = password.value === confirmPassword.value;

        setNickName(prevNickName => ({
            ...prevNickName,
            err: !verifiedNickname,
        }));
        setEmail(prevEmail => ({
            ...prevEmail,
            err: !verifiedEmail,
        }));
        // 비밀번호 유효성 검사
        setPassword(prevPassword => ({
            ...prevPassword,
            err: !verifiedPassword,
        }));
        // 비밀번호 재입력 일치 여부 검사
        setConfirmPassword(prevConfimPw => ({
            ...prevConfimPw,
            err: !verifiedConfirmPassword,
        }));
        return !verifiedNickname || !verifiedPassword || !verifiedConfirmPassword ? false : true;
    };
    const onSubmitHandler = async () => {
        const signUpVerfy = verifySiginUpData();
        if (signUpVerfy) {
            // 회원 가입 요청 가능

            try {
                const res = await AuthApi.signup({
                    nickname: nickName.value,
                    password: password.value,
                });
                alert(res.data.message);
                navigate('/login');
            } catch (err) {
                alert(err.response.data.errorMessage);
            }
            return;
        } else {
            // 회원가입 부적합으로 함수 종료
            return;
        }
    };
    return (
        <StSignupContainer>
            <h1>회원가입</h1>
            <label>닉네임</label>
            <input type="text" onChange={onNickNameChangeHandler} />
            <StAlertBox>{nicknameMessage}</StAlertBox>
            <label>이메일</label>
            <input type="text" onChange={onEmailChangeHandler} />
            {email.err && <StAlertBox>이메일 형식이 올바르지 않습니다.</StAlertBox>}
            {!email.err && !email.isDuplicate && email.value.length > 0 && (
                <StAlertBox>중복확인 버튼을 눌러주세요.</StAlertBox>
            )}
            {email.isDuplicate && <StAlertBox>이미 등록된 이메일입니다.</StAlertBox>}
            <button onClick={checkEmailDuplication}>중복확인</button>
            <StAlertBox>{emailDuplicationMessage}</StAlertBox>

            <label>비밀번호</label>
            <input type="password" placeholder="Password" onChange={onPasswordChangeHandler} />
            <StAlertBox>{password.err ? alertMessage.pwErr : null}</StAlertBox>
            <label>
                비밀번호 재입력
                <StAlertBox>{confirmPassword.err ? alertMessage.pwMachErr : null}</StAlertBox>
            </label>
            <input type="password" placeholder="Confirm Password" onChange={onConfirmPasswordChangeHandler} />
            <div>
                <StBtn backgroundcolor="#7fccde" onClick={onSubmitHandler}>
                    회원가입
                </StBtn>
                <Link to={'/'}>
                    <StBtn backgroundcolor="#fa5a5a">취소</StBtn>
                </Link>
            </div>
        </StSignupContainer>
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
