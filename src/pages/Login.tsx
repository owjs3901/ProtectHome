//로그인 페이지
import React from 'react';
import LoginBox from "../components/login/LoginBox";
import Header from "../components/Header";
import './Main.scss';
import Background from "../components/Background";

function Login() {
    return (
        <div className="main_container">
            <Background />
            <div className="main_header">
                <Header />
            </div>
            <LoginBox/>
        </div>
    );
}

export default Login;
