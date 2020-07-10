import React, {CSSProperties} from 'react';
import logoKey from '../assets/images/img_logo_key.svg';
import txtHomeAt from '../assets/images/txt_homeat.svg';
import './Logo.css'
import {Link} from "react-router-dom";

// 로고임
function Logo() {
    return (
        <>
            <Link to={'/main'} style={{display:"flex"}}>
                <img className="logo_imagekey" src={logoKey} />
                <img className="logo_imageHomeAt" src={txtHomeAt} />
            </Link>
        </>
    );
}

export default Logo;
