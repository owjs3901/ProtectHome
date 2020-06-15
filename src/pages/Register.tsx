import React from 'react';
import circle from "../assets/images/img_circle.svg";
import Header from "../components/Header";
import LoginBox from "../components/LoginBox";
import RegisterBox from '../components/RegisterBox';

function Register() {
    return (
        <div className="main_container">
            <img className="header_mobile_effectCircleTop" src={circle}/>
            <img className="header_mobile_effectCircleCenter" src={circle}/>
            <img className="header_mobile_effectCircleBottom" src={circle}/>
            <div className="main_header">
                <Header />
            </div>
            <div style={{margin:"160px auto",position:"absolute",width:"100%"}}>
                <RegisterBox/>
            </div>
        </div>
    );
}

export default Register;
