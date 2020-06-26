import React, {Component} from 'react'
import './Invite.scss'
import backImg from '../../assets/images/img_mobile_back.svg'

interface Props {
    number: string
    cancelButtonClicked: () => void;
}

interface State {

}

class Invite extends Component<Props, State> {
    render() {
        return (
            <>
                <div className="invite_container">
                    <div className="invite_header">
                        <button onClick={this.props.cancelButtonClicked} className="invite_back"><img src={backImg} className="invite_back_img"/></button>
                        <div className="invite_title">친구 추가</div>
                    </div>
                    <div className="invite_invite_title">초대번호</div>
                    <div className="invite_invite_number">{this.props.number}</div>
                    <button className="invite_invite_copy" onClick={e=>{
                        copyIOS(this.props.number)
                        alert("클립보드에 복사되었습니다.")
                    }}>복사하기</button>
                    <button className="invite_share_to_sns">카카오톡으로 공유하기</button>
                </div>
            </>
        );
    }
}

function copyIOS(str: string){
    let textarea = document.createElement('textarea');
    textarea.value = str;

    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, 9999);  // 추가

    document.execCommand('copy');
    document.body.removeChild(textarea);
}

export default Invite;