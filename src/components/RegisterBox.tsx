import React, {useState} from 'react';
import logoKey from '../assets/images/logo_fido_key.svg';
import imgOk from '../assets/images/img_ok.svg';
import { Link } from 'react-router-dom';
import OTPForm from "./OTPForm";
import OTPNum from "./OTPNum";




function RegisterBox() {
    const [isOTP,setOTP]=useState(false);
    function masterKeyPage() {
        return (
            <>
                <OTPNum/>
                <OTPForm/>
            </>
        )
    }
    function OTPPage() {
        return (
            <>
                <div style={{font:"Regular 29px/35px NanumSquare_ac"}}>
                    마스터키가 있으신가요?
                </div>

                <img src={logoKey} style={{width:"100%",maxWidth:"390px",marginTop:"40px"}}/>
                <img src={imgOk} style={{width:"100%",maxWidth:"76px",marginTop:"40px"}}/>
                <div style={{width:"100%",textAlign:"center",font:"Regular 21px/25px NanumSquare_ac",color:"#676767",marginTop:"37px"}}>
                    친구에게 초대를 받으셨나요?
                </div>
                <div onClick={e=>{
                    setOTP(!isOTP);
                }}
                     style={{width:"100%",textAlign:"center",font:"Regular 16px/19px NanumSquare_ac",color:"#73A2FC",marginTop:"20px"}}>
                    여기를 눌러 등록해주세요
                </div>
            </>
        )
    }
    return (
        <div style={{maxWidth:"560px",maxHeight:"864px",backgroundColor:"white",borderRadius:"30px",
        margin:"0px auto",display:"flex",flexDirection:"column",alignItems:"center",padding:"60px 46px"}}>
            {
                isOTP?masterKeyPage():OTPPage()
            }
        </div>
    );
}

export default RegisterBox;
