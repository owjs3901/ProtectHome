//로그인 페이지
import React from 'react';
import LoginBox from "../components/login/LoginBox";
import Header from "../components/Header";
import './Main.scss';
import Background from "../components/Background";
import {RouteComponentProps} from "react-router-dom";

function Login(props:RouteComponentProps) {
    return (
        <div className="main_container">
            <Background />
            <div className="main_header">
                <Header {...props} />
            </div>
            <LoginBox {...props} />
        </div>
    );
}

export default Login;
