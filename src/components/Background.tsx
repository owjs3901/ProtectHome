//메인
import React from 'react';
import Header from './Header';
import './Background.css'
import circle from '../assets/images/img_circle.svg'

function Background() {
    return (
        <>
            <img className="header_mobile_effectCircleTop" src={circle}/>
            <img className="header_mobile_effectCircleCenter" src={circle}/>
            <img className="header_mobile_effectCircleBottom" src={circle}/>
            {/*<span className="header_mobile_effectCircleCenter">asdfasdfadfasdfasdfasdfasdf</span>*/}
        </>
    );
}

export default Background;