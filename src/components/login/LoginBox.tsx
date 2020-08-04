import React, {Component} from 'react';
import logoHome from '../../assets/images/logo_home.svg';
import {Link, RouteComponentProps} from 'react-router-dom';
import './LoginBox.css'
import nicknameIcon from '../../assets/images/img_nickname_icon.svg'

import {connect} from "react-redux";
import store, {storeState} from "../../store";
import {
    preformatGetAssertReq,
    preformatMakeCredReq,
    publicKeyCredentialToJSON,
    sendWebAuthnResponse
} from "../../utils/helper";
import {login} from "../../store/Actions";

interface Props extends RouteComponentProps{
    login:boolean;
}

interface State {
    count: number;
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

class LoginBox extends Component<Props,State> {

    constructor(props: Props) {
        super(props);
        if(props.login){
            props.history.push('/main')
        }
        this.state = {
            count: 0
        }
    }

    componentWillMount() {
        fetch("api/count").then(res=>res.json())
            .then(res=>{
                let count = res.res;

                this.setState({
                    count:count
                })

                if(count === 0){
                    let k: HTMLDivElement;
                    k = document.getElementsByClassName('login_container')[0] as unknown as HTMLDivElement;                    console.log(k.style)
                    k.style.height='600px';
                    // fetch('api/register', {
                    //     method: 'POST',
                    //     headers: {
                    //         'Accept': 'application/json',
                    //         'Content-Type': 'application/json'
                    //     },
                    //     body: JSON.stringify({ name:"admin", username:"admin" })
                    // }).then(res => {
                    //     return res.json()
                    // }).then(data => {
                    //     if (data.stat == 0) {
                    //         return data
                    //     }
                    //     else {
                    //         alert(data.msg)
                    //         throw new Error(data.msg)
                    //     }
                    // }).then(res => {
                    //     let publicKey = preformatMakeCredReq(res)
                    //     return navigator.credentials.create({ publicKey })
                    // }).then(res => {
                    //     let makeCredResponse = publicKeyCredentialToJSON(res!);
                    //     return sendWebAuthnResponse(makeCredResponse)
                    // }).then(res=>{
                    //     if(res.status==0){
                    //         alert("마스터키가 등록되었습니다")
                    //         //등록과 동시에 로그인
                    //         store.dispatch(login({
                    //             name:"admin"
                    //         }))
                    //         this.props.history.push('/main')
                    //     }
                    //     else alert('알 수 없는 오류')
                    // })
                }
                else{
                    // const b=window.confirm("마스터키로 로그인 하시겠습니까?")
                    // if(b){
                    //     const username = "admin";
                    //
                    //     getGetAssertionChallenge({ username/*,name:username*/ })
                    //         .then((response) => {
                    //             if(response){
                    //                 let publicKey = preformatGetAssertReq(response);
                    //                 return navigator.credentials.get({ publicKey })
                    //             }
                    //             else throw new Error();
                    //         })
                    //         .then((response) => {
                    //             let getAssertionResponse = publicKeyCredentialToJSON(response!);
                    //             return sendWebAuthnResponse(getAssertionResponse)
                    //         })
                    //         .then((response) => {
                    //             if (response.status === 0) {
                    //                 store.dispatch(login({
                    //                     name:username
                    //                 }))
                    //                 this.props.history.push('/main')
                    //                 // document.location.reload()
                    //             } else {
                    //                 alert(`Server responed with error. The message is: ${response.message}`);
                    //             }
                    //         })
                    //         .catch((error) => {
                    //             console.error(error)
                    //         })
                    // }
                }
            })
    }

    componentDidMount() {
        //document.body.style.backgroundColor = "#F7F9FF"
    }

    // 로그인하는 창
    // 님이 짰으니깐 잘 알겠네
    render() {
        const {count} = this.state;

        return (
            <div className="login_container" style={count > 0 ? {height: "864px"} : {height: "760px"}}>
                <img src={logoHome} className="login_img"/>

                {/*유저 카운트가 0이면 로그인창을 보여주지 않음*/}
                {count > 0 ?
                    <>
                        <div className="login_box">
                            <img src={nicknameIcon} className="login_box_img" />
                            <input className="login_input_nickname" placeholder="닉네임" id={"userName"}/>
                        </div>

                    </>
                    : <></>}

                <div className="login_footer">
                    {count > 0 ?
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
                    : <></>}
                    <div className="login_register_question">
                        처음이신가요? 회원가입을 진행해주세요.
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
