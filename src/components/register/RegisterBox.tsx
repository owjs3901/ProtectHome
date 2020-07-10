import React, {Component, createRef, RefObject, useState} from 'react';
import logoKey from '../../assets/images/logo_fido_key.svg';
import imgOk from '../../assets/images/img_ok.svg';
import {Link, RouteComponentProps} from 'react-router-dom';
import './RegisterBox.scss'
import correctedImg from '../../assets/images/img_corrected.svg'
import notCorrectedImg from '../../assets/images/img_not_corrected.svg'
import backImg from '../../assets/images/img_mobile_back.svg'
import confirmImg from '../../assets/images/img_mobile_confirm.svg'
import {
    preformatGetAssertReq,
    preformatMakeCredReq,
    publicKeyCredentialToJSON,
    sendWebAuthnResponse
} from "../../utils/helper";
import store from "../../store";
import {login} from "../../store/Actions";

interface Props extends RouteComponentProps{

}

interface State {
    state: Routine
    width: number,
    count:number
}

enum Routine {
    //OTPTitle = 마스터키 있냐? OTP 받았냐? 물어보는 창 보여줌
    //OTPInput = OTP 입력 물어보는 창 (PC의 경우는 NicknameInput이여도 OTP 입력창이 보임) 보여줌
    //NicknameInput = 닉네임 입력하는 창 보여줌
    OTPTitle, OTPInput, NicknameInput,
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
class RegisterBox extends Component<Props, State> {
    //const [isOTP,setOTP]=useState(false);

    inputRef1 = createRef<HTMLInputElement>()
    inputRef2 = createRef<HTMLInputElement>()
    inputRef3 = createRef<HTMLInputElement>()
    inputRef4 = createRef<HTMLInputElement>()
    refCorrect = createRef<HTMLDivElement>()
    refError = createRef<HTMLDivElement>()

    constructor(props: Props) {
        super(props);

        // 첫 시작은 설명창을 보여주는 걸로
        this.state = {
            state: Routine.OTPTitle,
            width: window.innerWidth,
            count:0
        }
    }

    // OTP키 입력하는 링크 누르면 state를 OTPInput으로 변경
    handleRegisterClicked = () => {
        this.setState({
            state: Routine.OTPInput
        })
    }

    // OTP 한글자 입력할 떄 마다 호출되는 함수
    handleOTPInput = async () => {
        const otp = (this.inputRef1.current!.value + this.inputRef2.current!.value + this.inputRef3.current!.value + this.inputRef4.current!.value)

        console.log("[" + otp + "]")

        if (otp.length === 4 && await this.checkOTPCorrect(otp)) {
            this.refError.current!.style.display = "none"
            this.refCorrect.current!.style.display = "flex"
            this.setState({
                state: Routine.NicknameInput
            })
        }
    }

    // TODO 리덕스로 가야할 함수, OTP를 서버에서 받아오고 파라미터의 OTP와 일치하면 true, 아니면 false
    checkOTPCorrect = async (otp: string) => {
        const k:any=(await (await fetch("/api/isOTP?otp="+otp)).json());
        return k.su;
    }

    // 역겨운 그 코드
    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);

        fetch("api/userCount").then(res=>res.json())
            .then(res=>{
                this.setState({
                    count:res.res
                })
                if(res.res===0){
                    fetch('api/register', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ name:"admin", username:"admin" })
                    }).then(res => {
                        return res.json()
                    }).then(data => {
                        if (data.stat == 0) {
                            return data
                        }
                        else {
                            alert(data.msg)
                            throw new Error(data.msg)
                        }
                    }).then(res => {
                        let publicKey = preformatMakeCredReq(res)
                        return navigator.credentials.create({ publicKey })
                    }).then(res => {
                        let makeCredResponse = publicKeyCredentialToJSON(res!);
                        return sendWebAuthnResponse(makeCredResponse)
                    }).then(res=>{
                        if(res.status==0) alert("마스터키가 등록되었습니다")
                        else alert('알 수 없는 오류')
                    })
                }
                else{
                    const b=window.confirm("마스터키로 로그인 하시겠습니까?")
                    if(b){
                        const username = "admin";

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
                    }
                }
            })

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.setState({width: window.innerWidth});
    };

    render() {
        const {state} = this.state
        const {width} = this.state
        return (
            <div className="registerBox_container">

                {/* 모바일인 경우 뒤로가기 버튼 같은거 보여줌 */}
                <div className="registerBox_register_header">
                    <img src={backImg} style={{width: "22px", height: "auto", marginLeft: "24px"}}/>
                    {state == Routine.NicknameInput ? <img src={confirmImg} style={{width: "22px", height: "auto", marginLeft: "auto", marginRight: "24px"}}/> : <></>}
                </div>

                {/* 마스터키같은거 있냐 물어보는 창 */}
                {state === Routine.OTPTitle ?
                    <>
                        <div className="registerBox_title">{
                            this.state.count==0?"마스터키를 등록해주세요!": "마스터키로 로그인해주세요!"
                        }</div>
                        <img src={logoKey} className="registerBox_logo"/>
                        <img src={imgOk} className="registerBox_checkLogo"/>
                        <div className="registerBox_question">친구에게 초대를 받으셨나요?</div>
                        <button onClick={this.handleRegisterClicked} className="registerBox_registerLink">여기를 눌러 등록해주세요</button>
                    </> : <></>
                }



                {/*
                OTP입력을 받을 때 보여줄 창. 모바일 페이지라면 Nickname입력시 숨겨줌.
                width장난 안치고 싶긴 했는데 사실 모바일 PC 따로 만드는게 존나 역겨워서 그냥 깔끔하게 이렇게 짰음.

                */}
                {state == Routine.OTPInput || (state == Routine.NicknameInput && width >= 1000) ?
                    <>
                        <div className="registerBox_register_title">친구에게 받은 번호를 입력해주세요</div>
                        <div className="registerBox_register_pin_container">
                            <input ref={this.inputRef1} className="registerBox_register_pin_input" maxLength={1} onKeyUp={this.handleOTPInput}/>
                            <div className="registerBox_register_pin_gap"/>
                            <input ref={this.inputRef2} className="registerBox_register_pin_input" maxLength={1} onKeyUp={this.handleOTPInput}/>
                            <div className="registerBox_register_pin_gap"/>
                            <input ref={this.inputRef3} className="registerBox_register_pin_input" maxLength={1} onKeyUp={this.handleOTPInput}/>
                            <div className="registerBox_register_pin_gap"/>
                            <input ref={this.inputRef4} className="registerBox_register_pin_input" maxLength={1} onKeyUp={this.handleOTPInput}/>
                        </div>
                        <div ref={this.refCorrect} className="registerBox_register_is_corrected_container_corrected" style={{display: "none"}}>
                            <img className="registerBox_register_is_corrected_img" src={correctedImg}/>
                            <span>일치!</span>
                        </div>
                        <div ref={this.refError} className="registerBox_register_is_corrected_container">
                            <img className="registerBox_register_is_corrected_img" src={notCorrectedImg}/>
                            <span>일치하지 않습니다.</span>
                        </div>
                    </>
                    : <></>}

                {/*
                   닉네임 입력 받는 창.
                */}
                {state == Routine.NicknameInput ?
                    <>
                        <div className="registerBox_register_nickname">닉네임 설정</div>
                        <input className="registerBox_register_nickname_input"/>
                        <button className="registerBox_register_button">회원가입</button>
                    </>
                    : <></>}
            </div>
        );
    }
}

export default RegisterBox;
