import React, {CSSProperties, Component} from 'react';
import CSS from 'csstype';
import Logo from "./Logo";
import './Header.scss'
import exampleImg from "../assets/images/img_exampleProfile.svg"
import plusImg from "../assets/images/img_mobile_friendPlus.svg"
import {maxHeaderSize} from "http";
import {connect} from "react-redux";
import store, {storeState} from "../store";
import {login, logout} from "../store/Actions";
import {Link, RouteComponentProps} from "react-router-dom";

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

}

interface Props extends RouteComponentProps{
    name:string|undefined,
    login:boolean
}


// 헤더임
// TODO 리덕스에서 현재 온도 값을 받아서 갱신해야함
class Header extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    gotoFriend() {

    }

    render() {
        return (
            <>
                <div className="header_pc_container">
                    <Logo/>
                    {this.isLogged() ? <>
                        <img className="header_pc_profileImg" src={exampleImg}/>
                        <div className="header_pc_profileIntroduce" style={{marginLeft: "20px"}}>
                            <span>안녕하세요</span>
                            <span>{this.props.name}님</span>
                        </div>
                        <span className="fullPC header_pc_dateText">{
                            function(){
                                const date=new Date();
                                var mm = date.getMonth() + 1; // getMonth() is zero-based
                                var dd = date.getDate();

                                return [date.getFullYear(),
                                (mm>9 ? '' : '0') + mm,
                                (dd>9 ? '' : '0') + dd
                                ].join('-');
                            }()
                        }</span>
                        <div className="header_pc_separator"/>
                        <div className="header_pc_profileIntroduce">
                            <span>오늘의 날씨는</span>
                            <span>{"맑고 화창하지만 늦은 밤엔 비가 올 예정이에요"}</span>
                        </div>
                        <span className="fullPC header_pc_temperature">{20}℃</span> {/* REDUX */}
                    </> : <></>}
                    <Link className="header_pc_logoLogin" to={this.isLogged()?"#":"/login"}>
                        <button className="header_pc_logoLogin" onClick={event => {
                            if(this.isLogged()){
                                store.dispatch(logout())
                                this.props.history.push('/login')
                            }
                            // else
                        }}><span
                            className="header_pc_logoLoginText">{this.isLogged() ? "LOGOUT" : "LOGIN"}</span></button>
                    </Link>
                </div>
            </>
        );
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
        return this.props.login
    }
}

export default connect((state:storeState)=>({login:state.login,name:state.auth?.name}))(Header);

