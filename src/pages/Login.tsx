//로그인 페이지
import React from 'react';
import LoginBox from "../components/LoginBox";
import Header from "../components/Header";
import './Main.css'
import circle from "../assets/images/img_circle.svg";

function Login() {
    return (
        <div className="main_container">
            <img className="header_mobile_effectCircleTop" src={circle}/>
            <img className="header_mobile_effectCircleCenter" src={circle}/>
            <img className="header_mobile_effectCircleBottom" src={circle}/>
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
