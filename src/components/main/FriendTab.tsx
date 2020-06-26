import React, {Component, createRef} from 'react';
import './FriendTab.scss'
import notSelected from '../../assets/images/img_notselected.svg'
import selected from '../../assets/images/img_selected.svg'
import selectedMobile from '../../assets/images/img_mobile_selected.svg'

interface Props {
    img: string;
    id: number;
    name: string;
    lastJoined: string;
    mobileVisibleDeleteButton: boolean;
    onDeleteButtonClicked: (id: number, checked: boolean) => void;
}

interface State {
    clicked: boolean
}

const DEFAULT_VALUES = {
    clicked: false
}

// Friends 탭에서 친구 한 명을 보여줄 때 쓰는 컴포넌트.
// mobileVisibleDeleteButton의 경우 모바일 전용으로 삭제 버튼 클릭시 나타난다.
class FriendTab extends Component<Props, State> {
    imgRef = createRef<HTMLImageElement>()
    imgRefMobile = createRef<HTMLImageElement>()

    constructor(props: Props) {
        super(props);

        this.state = {
            ...DEFAULT_VALUES,
        }
    }

    handleToggleClick = () => {
        this.setState({
            clicked: !this.state.clicked
        }, () => {
            this.imgRef.current!.src = this.state.clicked ? selected : notSelected
            this.imgRefMobile.current!.src = this.state.clicked ? selectedMobile : notSelected
            this.props.onDeleteButtonClicked(this.props.id, this.state.clicked)
        })
    }


    render() {
        return (<div className="friend_container">
            <img className="friend_profileImg" src={this.props.img} width={"64px"} height={"64px"}/>
            <div className="friend_info">
                <span className="friend_name">{this.props.name}</span>
                <span className="friend_lastJoined">{this.props.lastJoined}</span>
            </div>
            <button className="friend_deleteButton" onClick={this.handleToggleClick}><img ref={this.imgRef} src={notSelected} className="friend_deleteImg"/></button>
            <button className="friend_deleteButton_mobile" onClick={this.handleToggleClick} style={this.props.mobileVisibleDeleteButton ? {display: "inline"} : {display: "none"}}>
                <img ref={this.imgRefMobile} src={notSelected} className="friend_deleteImg"/>
            </button>
        </div>);
    }
}

export default FriendTab;