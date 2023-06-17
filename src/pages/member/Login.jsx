import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AuthApi } from '../../shared/api';
import { useCookies } from 'react-cookie';
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
            setCookies('token', response.data.Authorization);
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
        <div>
            <form>
                <div className="Login">
                    <div className="inputemail">
                        <br />
                        <input
                            type="text"
                            onChange={e => {
                                setEmail(e.target.value);
                            }}
                            className={!message ? 'inputLogin' : 'err_password'}
                            placeholder="이메일 주소를 입력해주세요"
                        />
                    </div>
                    <div className="inputpassword">
                        <br />
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
                    <button className="buttonlogin" onClick={loginaxios}>
                        시작해볼까요?
                    </button>
                </div>
                <div>
                    <p>계정이 없다면?</p>
                    <div
                        onClick={() => {
                            navigate('/signup');
                        }}
                    >
                        회원가입
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
