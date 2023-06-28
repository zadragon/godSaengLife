import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AuthApi } from '../../shared/api';
import { useCookies } from 'react-cookie';
import TextField from '@mui/material/TextField';
import * as M from '../../styles/member';
import * as C from '../../styles/common';

const Login = () => {
    const navigate = useNavigate();

    const [message, setMessage] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookies] = useCookies();

    const loginaxios = async e => {
        e.preventDefault();

        try {
            const payload = {
                email: email,
                password: password,
            };

            const response = await AuthApi.signin(payload);
            console.log(response);
            setCookies('Authorization', response.data.Authorization);
            //localStorage.setItem('Token', response.headers.authorization);

            if (response.code === 200) {
                navigate('/');
            }
        } catch (error) {
            console.log(error);
            setMessage(error.response.data.message);
        }
    };

    return (
        <div className="loginArea">
            <C.PageHeader>
                <h2>로그인</h2>
                <button className="btnClose" onClick={() => navigate('/')}>
                    <span className="hidden">닫기</span>
                </button>
            </C.PageHeader>

            <form>
                <M.Inputs>
                    <div className="row inputemail">
                        {/* <label>이메일 주소</label>
                        <input
                            type="text"
                            className={!message ? 'inputLogin' : 'err_password'}
                            placeholder="이메일 주소를 입력해주세요"
                        /> */}

                        <TextField
                            onChange={e => {
                                setEmail(e.target.value);
                            }}
                            id="standard-error-helper-text"
                            label="이메일 주소"
                            variant="outlined"
                            fullWidth
                        />
                    </div>
                    <div className="row inputpassword">
                        {/* <label>비밀번호</label>
                        <input
                            type="password"
                            className={!message ? 'inputLogin' : 'err_password'}
                            placeholder="비밀번호를 입력해주세요"
                        /> */}
                        <TextField
                            onChange={e => {
                                setPassword(e.target.value);
                            }}
                            type="password"
                            id="standard-error-helper-text"
                            label="비밀번호"
                            variant="outlined"
                            fullWidth
                        />
                        <p className="err">{message}</p>
                    </div>
                </M.Inputs>
                <M.loginFunc>
                    <button className="btnLogin" onClick={loginaxios}>
                        로그인
                    </button>
                    <div className="loginUtil">
                        {/* <span>이메일 찾기</span>
                        <span>비밀번호찾기 찾기</span> */}
                        <Link to="/signup" className="btnJoin">
                            회원가입
                        </Link>
                    </div>
                </M.loginFunc>
            </form>
        </div>
    );
};

export default Login;
