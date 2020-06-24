import React, {Component, createRef} from 'react';
import './MainPC.scss'
import MainTab from "./MainTab";
import BlurBackground from "../BlurBackground";
import CircleGraph from "./CircleGraph";
import ViewerTab from "./ViewerTab";
import imgCamera from "../../assets/images/img_camera.svg";
import Adapter from "./Adapter";
import FriendTab from "./FriendTab";
import exampleImg from "../../assets/images/img_exampleProfile.svg";
import friendDeleteImg from "../../assets/images/img_friendDelete.svg";
import friendPlusImg from "../../assets/images/img_friendPlus.svg";

interface Props {
    temperature: number;
    humidity: number;
    handleAdapterChanged: (type:string, currentValue: number) => void;
    handleFriendSelected: (id: number, checked: boolean) => number;
    handleFriendDelete: () => void;
}

interface State {
    type: string;
}

const DEFAULT_STATE = {
    type: "Home"
}


class MainPC extends Component<Props, State> {
    imgRef = createRef<HTMLImageElement>()
    constructor(props: Props) {
        super(props);

        this.state = {
            ...DEFAULT_STATE,
        }
    }

    handleMainTabClicked = (type: string, clicked: Boolean) => {
        console.log(type)
        this.setState({
            type: type
        })
    }

    handleFriendSelected = (id: number, checked: boolean)  => {
        let count = this.props.handleFriendSelected(id, checked)

        this.imgRef.current!.src = count > 0 ? friendDeleteImg : friendPlusImg
    }

    render() {
        const {type} = this.state
        return (
            <span className="main_pc_container">
                <div className="main_pc_tab">
                    <MainTab type={"Home"} selected={type == "Home"} onChanged={this.handleMainTabClicked} content={<>Home</>}/>
                    <MainTab type={"Friends"} selected={type == "Friends"} onChanged={this.handleMainTabClicked} content={<>Friends</>}/>
                </div>
                {type == "Home" ?
                    <div className="main_pc_content">
                        <table>
                            <tr>
                                <td> {/* 온도 */}
                                    <div className="main_pc_circleGraph">
                                        <BlurBackground noShadow={false} width={256} height={256} content={
                                            <CircleGraph width={256} height={256} title={"온도"} unit={"℃"} value={this.props.temperature} maxValue={40} radiusCenter={75} radiusOuter={22}
                                                         fontTitle={"Bold 15px/22px SpoqaHanSans"} fontValue={"Bold 30px/45px SpoqaHanSans"}/>}/>
                                    </div>
                                </td>

                                <td> {/* 습도 */}
                                    <div className="main_pc_circleGraph" style={{marginLeft: "40px"}}>
                                        <BlurBackground noShadow={false} width={256} height={256} content={
                                            <CircleGraph width={256} height={256} title={"습도"} unit={"%"} value={this.props.humidity} maxValue={100} radiusCenter={75} radiusOuter={22}
                                                         fontTitle={"Bold 15px/22px SpoqaHanSans"} fontValue={"Bold 30px/45px SpoqaHanSans"}/>}/>
                                    </div>
                                </td>

                                <td rowSpan={2}> {/* 정보 */}
                                    <div className="main_pc_viewer" style={{marginLeft: "40px"}}>
                                        <BlurBackground noShadow={false} width={737} height={646} content={
                                            <div style={{margin: "45px 45px 39px"}}>
                                                <div className="main_pc_viewer_animation"/>
                                                <div className="main_pc_viewer_animation_sub"/>
                                                <div className="main_pc_viewer_tab">
                                                    <ViewerTab noShadow={true} isPC={true} imgSrc={imgCamera} text={"방범용 카메라"} width={115} height={115}/>
                                                </div>
                                            </div>
                                        }/>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td colSpan={2}>{/* 조절     width: 556px; height: 360px;*/}
                                    <div className="main_pc_adapter" style={{marginTop: "30px"}}>
                                        <BlurBackground noShadow={false} width={556} height={360} content={
                                            <div>
                                                <div className="main_pc_adapter_header">
                                                    <span className="main_pc_adapter_header_title">집 안의 전등을 조절해봐요</span>
                                                    <button className="main_pc_adapter_header_editButton"><span className="main_pc_adapter_header_editButton_text">편집</span></button>
                                                </div>
                                                <div className="main_pc_adapter_content">
                                                    <Adapter isPC={true} type={"a"} minValue={0} maxValue={100} firstValue={20} onChanged={this.props.handleAdapterChanged}/>
                                                    <Adapter isPC={true} type={"b"} minValue={0} maxValue={100} firstValue={50} onChanged={this.props.handleAdapterChanged}/>
                                                    <Adapter isPC={true} type={"c"} minValue={0} maxValue={100} firstValue={60} onChanged={this.props.handleAdapterChanged}/>
                                                    <Adapter isPC={true} type={"d"} minValue={0} maxValue={100} firstValue={50} onChanged={this.props.handleAdapterChanged}/>
                                                    <Adapter isPC={true} type={"f"} minValue={0} maxValue={100} firstValue={80} onChanged={this.props.handleAdapterChanged}/>
                                                </div>
                                            </div>
                                        }/>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    : <div className="main_pc_friends_content" style={{position: "relative"}}>
                        <div className="main_pc_friends_title" style={{textAlign: "left"}}>친구 목록</div>

                        <div style={{marginTop: "50px"}}/>

                        {/* friends */}
                        <FriendTab img={exampleImg} id={1} name={"a"} lastJoined={"접속일시 : 1월 20일 9:40AM"} onDeleteButtonClicked={this.handleFriendSelected}/>
                        <div className="main_pc_friends_separator"/>
                        <FriendTab img={exampleImg} id={2} name={"b"} lastJoined={"접속일시 : 1월 20일 9:40AM"} onDeleteButtonClicked={this.handleFriendSelected}/>
                        <div className="main_pc_friends_separator"/>
                        <FriendTab img={exampleImg} id={3} name={"c"} lastJoined={"접속일시 : 1월 20일 9:40AM"} onDeleteButtonClicked={this.handleFriendSelected}/>
                        <img ref={this.imgRef} src={friendPlusImg} style={{textAlign: "right", position: "absolute", bottom: "50px", right: "60px"}}/>
                    </div>}
            </span>
        )
    }
}

export default MainPC;