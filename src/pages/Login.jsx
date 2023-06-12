import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import React from "react";

const Login = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginaxios = (e) => {
    e.preventDefault();
    // 창이 새로고침되는 것을 막는다.

    axios
      .post("/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("Token", response.headers.authorization);
        console.log(response);
        if ((response.status = 200)) {
          return navigate("/posts");
        }
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        console.log(err);
      });
  };

  return (
    <div>
      <form>
        <div className="Login">
          <div className="inputemail">
            <br />
            <input
              type="text"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className={!message ? "inputLogin" : "err_password"}
              placeholder="이메일 주소를 입력해주세요"
            />
          </div>
          <div className="inputpassword">
            <br />
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className={!message ? "inputLogin" : "err_password"}
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
              navigate("/signup");
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
