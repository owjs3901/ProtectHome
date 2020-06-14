import React, {CSSProperties, Component} from 'react';
import CSS from 'csstype';
import Logo from "./Logo";
import './Header.scss'

// const styles:{[key:string]:CSSProperties}={
//     base: {
//         backgroundColor: "#73A2FC",
//         height: "104px",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "left",
//     },
//     profileIntroduce: {
//         lineHeight: "150%",
//         display: "flex",
//         flexDirection: "column",
//         color: "white",
//         fontSize: "22px",
//         fontWeight: "bold",
//         letterSpacing: "5px",
//     },
//     logoLogin: {
//         borderRadius: "40px",
//         marginLeft: "auto",
//         marginRight: "40px",
//         border: "2px solid white",
//         width: "120px",
//         height: "40px",
//         lineHeight: "40px",
//         textAlign: "center"
//     },
//     centerText: {
//         fontFamily: "Regular 22px/30px Noto Sans",
//         color: "white",
//         letterSpacing: "0px",
//         verticalAlign: "middle"
//     }
// }

function Header() {
    return (
        <>
            <div className="header_container">
                <Logo/>
                {isLogged() ? <Profile/> : <></>}
                <button className="header_logoLogin"><span className="header_logoLoginText">{isLogged() ? "LOGOUT" : "LOGIN"}</span></button>
            </div>
        </>
    );
}

function Profile() {
    return (
        <>
            <img src={""} />
            <div className="header_profileIntroduce">
                <span>안녕하세요</span>
                <span>{"xxx"}님</span>
            </div>
            <span className="header_dateText">1970년 1월 1일 0:00AM</span>
            <div className="header_separator"/>
            <div className="header_profileIntroduce">
                <span>오늘의 날씨는</span>
                <span>{"맑고 화창하지만 늦은 밤엔 비가 올 예정이에요"}</span>
            </div>
            <span className="header_temperature">{20}℃</span>
        </>
    )
}

function isLogged() {
    return true
}

export default Header;

