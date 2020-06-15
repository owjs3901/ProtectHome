//메인
import React from 'react';
import Header from '../components/Header';
import './Main.css'
import circle from '../assets/images/img_circle.svg'
import Background from "../components/Background";

function Main() {
    return (
        <div className="main_container">
            <Background />
            <div className="main_header">
                <Header />
            </div>
            {/*<span className="header_mobile_effectCircleCenter">asdfasdfadfasdfasdfasdfasdf</span>*/}
        </div>
    );
}

export default Main;