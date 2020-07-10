import React from 'react';
import circle from "../assets/images/img_circle.svg";
import Header from "../components/Header";
import LoginBox from "../components/login/LoginBox";
import RegisterBox from '../components/register/RegisterBox';
import Background from "../components/Background";
import './Main.scss'
import {RouteComponentProps} from "react-router-dom";

// ㅎㅇ
function Register(props:RouteComponentProps) {
    return (
        <div className="main_container">
            <div className="main_header"><Background /></div>
            <div className="main_header">
                <Header {...props} />
            </div>
            <RegisterBox/>
        </div>
    );
}

export default Register;
