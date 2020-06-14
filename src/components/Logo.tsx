import React, {CSSProperties} from 'react';
import logoKey from '../assets/images/img_logo_key.svg';
import txtHomeAt from '../assets/images/txt_homeat.svg';
import './Logo.css'

const styles:{[key:string]:CSSProperties}={
    keyImage: {
        marginLeft: "3px",
        marginRight: "21.1px",
    },
    homeAtImage: {
        marginRight: "34.7px"
    }
}

function Logo() {
    return (
        <>
            <img className="logo_imagekey" src={logoKey} />
            <img className="logo_imageHomeAt" src={txtHomeAt} />
        </>
    );
}

export default Logo;