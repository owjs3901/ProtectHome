//앱 회원가입 - 2 참고
//닉네임 설정 등 OPT가 맞았을 때 뜸
import React from 'react';
import {Link} from "react-router-dom";

function OTPForm() {
    return (
        <>
            <div style={{font:"Regular 29px/35px NanumSquare_ac"}}>
                닉네임 설정
            </div>
            <input/>
            <button style={{height:"79px", width:"100%", backgroundColor:"white",
                borderRadius:"10px",color:"#73A2FC",fontSize:"23px",borderColor:"#73A2FC",
                borderStyle:"solid",borderWidth:"2px"}}>
                회원가입
            </button>
        </>
    );
}

export default OTPForm;
