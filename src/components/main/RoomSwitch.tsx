import React, {Component, createRef} from 'react';
import './RoomSwitch.css'
import imgBulb from '../../assets/images/img_bulb.svg'

interface Props {
    handleOnStateChanged: (title: string, isOn: boolean) => void;
    title: string;
    isOn: boolean
}

interface State {
}


class RoomSwitch extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

    }

    handleOnStateChanged = () => {
            this.setState({
                isOn: !this.props.isOn
            }, () => {
                this.props.handleOnStateChanged(this.props.title, this.props.isOn)
            })
    }

    render() {
        const {isOn} = this.props

        let switchPointStyle = isOn ? {marginLeft: "0px"} : {marginLeft: "auto"}
        let displayStyle = isOn ? {display: "block"} : {display: "none"}
        let containerStyle = isOn ? {background: "transparent linear-gradient(180deg, #9FBFFD 0%, #4D89FC 100%) 0% 0% no-repeat padding-box"} : {background: "#FFFFFF 0% 0% no-repeat padding-box"}
        let textStyle = isOn ? {color: "#FFFFFF"} : {color: "#767676"}
        let switchBackgroundStyle = isOn ? {background: "#5C93FC 0% 0% no-repeat padding-box"} : {background: "#B5B5B5 0% 0% no-repeat padding-box"}

        let msg = isOn ? "ON" : "OFF"

        return (
            <div className="roomSwitch_container" onClick={this.handleOnStateChanged} style={containerStyle}>
                <div className="roomSwitch_container_blur" style={displayStyle}/>
                <div className="roomSwitch_switch_container" style={switchBackgroundStyle}>
                    <div className="roomSwitch_switch_point" style={switchPointStyle}/>
                </div>

                <div className="roomSwitch_content">
                    <div className="roomSwitch_title" style={textStyle}>{this.props.title}</div>
                    <div className="roomSwitch_state" style={textStyle}>{msg}</div>
                </div>
                <img src={imgBulb} className="roomSwitch_img" style={displayStyle}/>
            </div>
        )
    }
}

export default RoomSwitch
