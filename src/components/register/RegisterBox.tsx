import React, {Component, createRef, RefObject, useState} from 'react';
import logoKey from '../../assets/images/logo_fido_key.svg';
import imgOk from '../../assets/images/img_ok.svg';
import {Link} from 'react-router-dom';
import './RegisterBox.scss'
import correctedImg from '../../assets/images/img_corrected.svg'
import notCorrectedImg from '../../assets/images/img_not_corrected.svg'
import backImg from '../../assets/images/img_mobile_back.svg'
import confirmImg from '../../assets/images/img_mobile_confirm.svg'

interface Props {

}

interface State {
    state: Routine
    width: number
}

enum Routine {
    OTPTitle, OTPInput, NicknameInput,
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

        this.state = {
            state: Routine.OTPTitle,
            width: window.innerWidth
        }
    }

    handleRegisterClicked = () => {
        this.setState({
            state: Routine.OTPInput
        })
    }

    handleOTPInput = () => {
        const otp = (this.inputRef1.current!.value + this.inputRef2.current!.value + this.inputRef3.current!.value + this.inputRef4.current!.value)

        console.log("[" + otp)

        if (otp.length == 4 && this.checkOTPCorrect(otp)) {
            this.refError.current!.style.display = "none"
            this.refCorrect.current!.style.display = "flex"
            this.setState({
                state: Routine.NicknameInput
            })
        }
    }

    checkOTPCorrect = (otp: string) => {
        return true
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

    render() {
        const {state} = this.state
        const {width} = this.state
        return (
            <div className="registerBox_container">
                <div className="registerBox_register_header">
                    <img src={backImg} style={{width: "22px", height: "auto", marginLeft: "24px"}}/>
                    {state == Routine.NicknameInput ? <img src={confirmImg} style={{width: "22px", height: "auto", marginLeft: "auto", marginRight: "24px"}}/> : <></>}
                </div>

                {state == Routine.OTPTitle ?
                    <>
                        <div className="registerBox_title">마스터키가 있으신가요?</div>
                        <img src={logoKey} className="registerBox_logo"/>
                        <img src={imgOk} className="registerBox_checkLogo"/>
                        <div className="registerBox_question">친구에게 초대를 받으셨나요?</div>
                        <button onClick={this.handleRegisterClicked} className="registerBox_registerLink">여기를 눌러 등록해주세요</button>
                    </> : <></>
                }


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
