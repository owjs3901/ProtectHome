import React from 'react';
import logoHome from '../assets/images/logo_home.svg';
import { Link } from 'react-router-dom';

function LoginBox() {
    return (
        <div style={{maxWidth:"560px",maxHeight:"864px",backgroundColor:"white",borderRadius:"30px",
        margin:"0px auto",display:"flex",flexDirection:"column",alignItems:"center",padding:"60px 46px"}}>
            <img src={logoHome} style={{width:"100%",maxWidth:"420px",padding:"70px 60px"}}/>
            <input style={{width:"100%"}}/>
            <button style={{marginTop:"27px",height:"79px", width:"100%", backgroundColor:"#73A2FC",
            border:"none",borderRadius:"10px",color:"white",fontSize:"23px"}}>
                로그인
            </button>
            <div style={{width:"100%",textAlign:"left",margin:"60px 46px 15px 60px",fontSize:"18px"}}>
                처음이신가요?
            </div>
            <Link to={"/register"}>
                <button style={{height:"79px", width:"100%", backgroundColor:"white",
                    borderRadius:"10px",color:"#73A2FC",fontSize:"23px",borderColor:"#73A2FC",
                borderStyle:"solid",borderWidth:"2px"}}>
                    회원가입
                </button>
            </Link>
        </div>
    );
}

export default LoginBox;
