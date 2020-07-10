import React, {Component} from 'react';
import logoHome from '../../assets/images/logo_home.svg';
import {Link, RouteComponentProps} from 'react-router-dom';
import './LoginBox.css'
import nicknameIcon from '../../assets/images/img_nickname_icon.svg'

import {connect} from "react-redux";
import {storeState} from "../../store";

interface Props extends RouteComponentProps{
    login:boolean
}


class LoginBox extends Component<Props,any> {


    constructor(props: Props) {
        super(props);
        if(props.login){
            props.history.push('/main')
        }
    }

    componentDidMount() {
        //document.body.style.backgroundColor = "#F7F9FF"
    }

    // 로그인하는 창
    // 님이 짰으니깐 잘 알겠네
    render() {
        return (
            <div className="login_container">
                <img src={logoHome} className="login_img"/>
                <div className="login_box">
                    <img src={nicknameIcon} className="login_box_img"/>
                    <input className="login_input_nickname" placeholder="닉네임" />
                </div>
                <div className="login_footer">
                    <button className="login_login_button" onClick={event => {

                    }}>
                        로그인
                    </button>
                    <div className="login_register_question">
                        처음이신가요?
                    </div>
                    <Link to={"/register"}>
                        <button className="login_register_button">회원가입</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default connect((stat:storeState)=>({login:stat.login}))(LoginBox)
