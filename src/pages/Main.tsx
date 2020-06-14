//메인
import React from 'react';
import Header from '../components/Header';
import './Main.css'
import circle from '../assets/images/img_circle.svg'

function Main() {
    return (
        <div className="main_container">
            <img className="header_mobile_effectCircleTop" src={circle}/>
            <img className="header_mobile_effectCircleCenter" src={circle}/>
            <img className="header_mobile_effectCircleBottom" src={circle}/>
            <div className="main_header">
                <Header />
            </div>
            {/*<span className="header_mobile_effectCircleCenter">asdfasdfadfasdfasdfasdfasdf</span>*/}
        </div>
    );
}

export default Main;