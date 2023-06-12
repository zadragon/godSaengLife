import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          navigate("/login");
        }}
      >
        로그인
      </button>
      <div className="bg-blue-500"> Tailwind Css 적용 테스트 </div>
    </div>
  );
}

export default Home;
