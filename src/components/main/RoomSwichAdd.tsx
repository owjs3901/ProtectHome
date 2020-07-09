import React, {Component, createRef} from 'react';
import './RoomSwitch.css'
import './RoomSwitchAdd.css'
import imgPlus from '../../assets/images/img_roomswitch_add.svg'

interface Props {

}

interface State {

}


class RoomSwitchAdd extends Component<Props, State> {

    render() {
        return (
            <div className="roomSwitch_container">
                <div className="roomSwitch_add_content">
                    <div className="roomSwitch_title_add">추가</div>
                    <div className="roomSwitch_add_img"><img src={imgPlus}  className="roomSwitch_add_img_src"/></div>
                </div>
            </div>
        )
    }
}

export default RoomSwitchAdd