import React, {Component} from 'react';
import logoHome from '../../assets/images/logo_home.svg';
import {Link, RouteComponentProps} from 'react-router-dom';
import './LoginBox.css'
import nicknameIcon from '../../assets/images/img_nickname_icon.svg'

import {connect} from "react-redux";
import store, {storeState} from "../../store";
import {preformatGetAssertReq, publicKeyCredentialToJSON, sendWebAuthnResponse} from "../../utils/helper";
import {login} from "../../store/Actions";

interface Props extends RouteComponentProps{
    login:boolean
}

let getGetAssertionChallenge = (formBody:any) => {
    return fetch('/api/dologin', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formBody)
    })
        .then((response) => response.json())
        .then((response) => {
            if (response.status !== 'ok')
                throw new Error(`Server responed with error. The message is: ${response.message}`);

            return response
        })
        .catch(e=>{
            console.error(e)
            alert(e)
        })
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
                    <img src={nicknameIcon} className="login_box_img" />
                    <input className="login_input_nickname" placeholder="닉네임" id={"userName"}/>
                </div>
                <div className="login_footer">
                    <button className="login_login_button" onClick={async event => {
                        event.preventDefault();

                        let username = (document.getElementById("userName")! as HTMLInputElement).value;

                        if (!username) {
                            alert('Username is missing!')
                            return
                        }
                        getGetAssertionChallenge({ username/*,name:username*/ })
                            .then((response) => {
                                if(response){
                                    let publicKey = preformatGetAssertReq(response);
                                    return navigator.credentials.get({ publicKey })
                                }
                                else throw new Error();
                            })
                            .then((response) => {
                                let getAssertionResponse = publicKeyCredentialToJSON(response!);
                                return sendWebAuthnResponse(getAssertionResponse)
                            })
                            .then((response) => {
                                if (response.status === 0) {
                                    store.dispatch(login({
                                        name:username
                                    }))
                                    this.props.history.push('/main')
                                    // document.location.reload()
                                } else {
                                    alert(`Server responed with error. The message is: ${response.message}`);
                                }
                            })
                            .catch((error) => {
                                console.error(error)
                            })

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
