import React from 'react';
import { useState } from 'react';
import { AuthApi } from '../../shared/api';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';

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
            setMessage(error.response.data.message);
            console.log(error);
        }
    };

    return (
        <div className="loginArea">
            <h2>로그인</h2>
            <form>
                <div className="Login">
                    <div className="row inputemail">
                        <label>이메일 주소</label>
                        <input
                            type="text"
                            onChange={e => {
                                setEmail(e.target.value);
                            }}
                            className={!message ? 'inputLogin' : 'err_password'}
                            placeholder="이메일 주소를 입력해주세요"
                        />
                    </div>
                    <div className="row inputpassword">
                        <label>비밀번호</label>
                        <input
                            type="password"
                            onChange={e => {
                                setPassword(e.target.value);
                            }}
                            className={!message ? 'inputLogin' : 'err_password'}
                            placeholder="비밀번호를 입력해주세요"
                        />
                        <p className="err">{message}</p>
                    </div>
                </div>
                <div className="loginUtil">
                    <div>
                        <button className="buttonlogin" onClick={loginaxios}>
                            시작해볼까요? 🥰
                        </button>
                    </div>
                    <div>
                        <p>계정이 없다면?</p>
                        <Link to="/signup" className="buttonlogin">
                            회원가입
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
