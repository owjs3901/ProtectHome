import React from 'react';
import logoHome from '../assets/images/logo_home.svg';

function LoginBox() {
    return (
        <>
            <div style={{maxWidth:"560px"}}>
                <img src={logoHome} style={{width:"100%",maxWidth:"420px",padding:"70px 60px"}}/>
            </div>
        </>
    );
}

export default LoginBox;
