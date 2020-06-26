import React, {Component} from 'react';
import logoHome from '../../assets/images/logo_home.svg';
import { Link } from 'react-router-dom';
import './LoginBox.css'
import nicknameIcon from '../../assets/images/img_nickname_icon.svg'

class LoginBox extends Component {
    componentDidMount() {
        document.body.style.backgroundColor = "#F7F9FF"
    }

    render() {
        return (
            <div className="login_container">
                <img src={logoHome} className="login_img"/>
                <div className="login_box">
                    <img src={nicknameIcon} className="login_box_img"/>
                    <input className="login_input_nickname" placeholder="닉네임" />
                </div>
                <div className="login_footer">
                    <button className="login_login_button">
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

export default LoginBox;
