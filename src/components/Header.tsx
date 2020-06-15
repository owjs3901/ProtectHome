import React, {CSSProperties, Component} from 'react';
import CSS from 'csstype';
import Logo from "./Logo";
import './Header.scss'
import exampleImg from "../assets/images/img_exampleProfile.svg"
import plusImg from "../assets/images/img_plus.svg"
import {maxHeaderSize} from "http";
import {connect} from "react-redux";
import {storeState} from "../store";

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

interface State {
    width: number;
}

interface Props {
    isLogin:boolean
}

class Header extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            width: window.innerWidth,
        };
    }

    render() {
        const isPC = window.innerWidth >= 1000;
        if (isPC) {
            return (
                <>
                    <div className="header_pc_container">
                        <Logo/>
                        {this.isLogged() ? <>
                            <img src="asd"/>
                            <div className="header_pc_profileIntroduce" style={{marginLeft: "20px"}}>
                                <span>안녕하세요</span>
                                <span>{"xxx"}님</span>
                            </div>
                            <span className="fullPC header_pc_dateText" >1970년 1월 1일 0:00AM</span>
                            <div className="header_pc_separator"/>
                            <div className="header_pc_profileIntroduce">
                                <span>오늘의 날씨는</span>
                                <span>{"맑고 화창하지만 늦은 밤엔 비가 올 예정이에요"}</span>
                            </div>
                            <span className="fullPC header_pc_temperature">{20}℃</span>
                        </> : <></>}
                        <button className="header_pc_logoLogin"><span
                            className="header_pc_logoLoginText">{this.isLogged() ? "LOGOUT" : "LOGIN"}</span></button>
                    </div>
                </>
            );
        } else {
            return (
                <div className="header_mobile_container">
                    <div className="header_mobile_containerFriends">
                        <img className="header_mobile_profileImg" src={exampleImg}/>
                        <img className="header_mobile_profileImg" src={plusImg} width="36px" height="36px"/>
                    </div>

                    <div className="header_mobile_containerWeather">
                        <div className="header_mobile_containerTitle">
                            <span className="header_mobile_weatherTitle">오늘의 날씨는</span>
                            <span className="header_mobile_weatherSubTitle">{"맑고 화창하지만 늦은 밤엔 비가 올 예정이에요"}</span>
                        </div>
                        <span className="header_mobile_temperature">{20}℃</span>
                    </div>
                </div>
            );
        }
    }

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

// make sure to remove the listener
// when the component is not mounted anymore
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.setState({width: window.innerWidth});
    };

    isLogged() {
        return this.props.isLogin;
    }
}

//
// function Header() {
//     const isPC = window.innerWidth >= 1000;
//     if(isPC) {
//         return (
//             <>
//                 <div className="header_pc_container">
//                     <Logo/>
//                     {isLogged() ? <Profile/> : <></>}
//                     <button className="header_pc_logoLogin"><span className="header_pc_logoLoginText">{isLogged() ? "LOGOUT" : "LOGIN"}</span></button>
//                 </div>
//             </>
//         );
//     } else {
//         return (
//             <>
//
//             </>
//         )
//     }
// }
//
// function Profile() {
//     return (
//         <>
//             <img src={""} />
//             <div className="header_pc_profileIntroduce">
//                 <span>안녕하세요</span>
//                 <span>{"xxx"}님</span>
//             </div>
//             <span className="header_pc_dateText">1970년 1월 1일 0:00AM</span>
//             <div className="header_pc_separator"/>
//             <div className="header_pc_profileIntroduce">
//                 <span>오늘의 날씨는</span>
//                 <span>{"맑고 화창하지만 늦은 밤엔 비가 올 예정이에요"}</span>
//             </div>
//             <span className="header_pc_temperature">{20}℃</span>
//         </>
//     )
// }

export default connect((state:storeState)=>({isLogin:state.login}))(Header);

