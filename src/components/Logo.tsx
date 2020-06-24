import React, {CSSProperties} from 'react';
import logoKey from '../assets/images/img_logo_key.svg';
import txtHomeAt from '../assets/images/txt_homeat.svg';
import './Logo.css'

function Logo() {
    return (
        <>
            <img className="logo_imagekey" src={logoKey} />
            <img className="logo_imageHomeAt" src={txtHomeAt} />
        </>
    );
}

export default Logo;