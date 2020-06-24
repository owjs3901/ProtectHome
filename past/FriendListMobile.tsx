import React, {Component} from 'react'
import ImgBack from '../src/assets/images/img_mobile_back.svg'
import ImgDelete from '../src/assets/images/img_mobile_friendDelete.svg'
import ImgDeleteEnabled from '../src/assets/images/img_mobile_friendDelete_enabled.svg'
import ImgExample from '../src/assets/images/img_exampleProfile.svg'
import './FriendListMobile.scss'
import FriendMobile from "./FriendMobile";

interface Props {

}

interface State {
    deleteEnabled: boolean
}

class FriendListMobile extends Component<Props, State> {
    componentDidMount() {
        document.body.style.backgroundColor = "white"
    }

    imgButtonClicked() {
        this.setState( {
            deleteEnabled: !this.state.deleteEnabled
        })
    }

    render() {
        return (
            <div className="friendListMobile">
                <div className="friendListMobile_header" style={{borderBottom: "1px solid #E9E6E1"}}>
                    <img src={ImgBack} className="friendListMobile_header_back"/>
                    <span className="friendListMobile_header_title">친구 목록</span>
                    <img src={this.state.deleteEnabled ? ImgDeleteEnabled : ImgDelete} className="friendListMobile_header_delete"/>
                </div>
                <div className="friendListMobile_container" style={{flex: "1"}}>
                    <FriendMobile imgRoute={ImgExample} name={"이지금"} lastJoined="접속일시 : 1월 20일 9:40AM"/>
                    <div style={{height: "20px"}}/>
                    <FriendMobile imgRoute={ImgExample} name={"이지금"} lastJoined="접속일시 : 1월 20일 9:40AM"/>
                    <div style={{height: "20px"}}/>
                    <FriendMobile imgRoute={ImgExample} name={"이지금"} lastJoined="접속일시 : 1월 20일 9:40AM"/>
                </div>
                <div className="friendListMobile_footer">
                    <button className="friendListMobile_button" style={{textAlign: "center", verticalAlign: "center"}}>친구 초대하기</button>
                </div>
            </div>
        );
    }
}

export default FriendListMobile