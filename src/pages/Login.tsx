//로그인 페이지
import React from 'react';
import LoginBox from "../components/LoginBox";
import Header from "../components/Header";

function Login() {
    return (
        <>
            <Header/>
            <div style={{margin:"60px auto"}}>
                <LoginBox/>
            </div>
        </>
    );
}

export default Login;
