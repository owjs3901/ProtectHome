import React from 'react';
import circle from "../assets/images/img_circle.svg";
import Header from "../components/Header";
import LoginBox from "../components/login/LoginBox";
import RegisterBox from '../components/register/RegisterBox';
import Background from "../components/Background";
import './Main.scss'

// ㅎㅇ
function Register() {
    return (
        <div className="main_container">
            <div className="main_header"><Background /></div>
            <div className="main_header">
                <Header />
            </div>
            <RegisterBox/>
        </div>
    );
}

export default Register;
