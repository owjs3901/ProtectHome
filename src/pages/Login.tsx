//로그인 페이지
import React from 'react';
import LoginBox from "../components/LoginBox";
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
            <div style={{margin:"160px auto",position:"absolute",width:"100%"}}>
                <LoginBox/>
            </div>
        </div>
    );
}

export default Login;
