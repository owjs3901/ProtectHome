import React from 'react';
import './FriendMobile.css'

interface Props {
    imgRoute: string;
    name: string;
    lastJoined: string;
}

interface State {

}

function FriendMobile(props: Props, state: State) {
    return (
        <div className="friendMobile_container">
            <img src={props.imgRoute} width="46px" height="46px"/>
            <div style={{marginLeft: "17px"}}>
                <div className="friendMobile_name">{props.name}</div>
                <div className="friendMobile_lastJoined">{props.lastJoined}</div>
            </div>
        </div>
    )
}

export default FriendMobile