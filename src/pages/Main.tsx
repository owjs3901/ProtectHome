//메인
import React, {Component, createRef, Ref, useRef} from 'react';
import Header from '../components/Header';
import './Main.scss'
import circle from '../assets/images/img_circle.svg'
import Background from "../components/Background";
import MainTab from "../components/main/MainTab";
import Adapter from "../components/main/Adapter";
import BlurBackground from "../components/BlurBackground";
import CircleGraph from "../components/main/CircleGraph";
import ViewerTab from "../components/main/ViewerTab";
import Friend from "../components/main/Friend";
import imgCamera from '../assets/images/img_camera.svg'
import exampleImg from "../assets/images/img_exampleProfile.svg"
import friendPlusImg from "../assets/images/img_friendPlus.svg"
import friendDeleteImg from "../assets/images/img_friendDelete.svg"

/*
1. 웹&모바일-방범용카메라 글자 살짝만 올려주세요
2. 웹&모바일방법용카메라 아이콘 0.9배 해주세요
— 그리고 온도표시 유니코드 실적용하는거 다시보니깐 너무 이상해서 그대로 가는게 맞을것같아요!


 */

interface Props {

}

interface State {
    type: string;
    temperature: number;
    humidity: number;
    width: number;
    selected: {[name: string]: boolean}
}

const DEFAULT_STATE = {
    type: "Home",
    temperature: 21,
    humidity: 35,
    selected: {}
}

class Main extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            ...DEFAULT_STATE,
            width: window.innerWidth,
        }
    }

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.setState({width: window.innerWidth});
    };

    handleMainTabClicked = (type: string, clicked: Boolean) => {
        console.log(type)
        this.setState({
            type: type
        })
    }

    handleAdapterChanged = (type: string, currentValue: number) => {
        console.log(type + ", " + currentValue)
    }

    onFriendSelect = (name: string, checked: boolean) => {
        if(checked) {
            this.state.selected[name] = true
        } else {
            delete this.state.selected[name]
        }
        console.log(this.state.selected)
        this.setState({

        })
    }

    onFriendAddOrDelete = () => {
        if(Object.keys(this.state.selected).length > 0) {
            // TODO delete friends

        } else {
            // TODO add a friend

        }
    }

    componentDidMount() {

    }

    render() {
        const isPC = this.state.width >= 1000
        const {type} = this.state
        return (
            <div className="main_background">
                <Background/>
                <div className="main_container">
                    <div className="main_header"><Header/></div>
                    {isPC ?
                        <span className="main_pc_container">
                        <div className="main_pc_tab">
                            <MainTab type={"Home"} selected={type == "Home"} onChanged={this.handleMainTabClicked}
                                     content={<>Home</>}/>
                            <MainTab type={"Friends"} selected={type == "Friends"} onChanged={this.handleMainTabClicked}
                                     content={<>Friends</>}/>
                        </div>

                            {type == "Home" ?
                                <div className="main_pc_content">
                                    <table>
                                        <tr>
                                            <td> {/* 온도 */}
                                                <div className="main_pc_circleGraph">
                                                    <BlurBackground noShadow={false} width={256} height={256}
                                                                    content={<CircleGraph width={256} height={256}
                                                                                          title={"온도"} unit={"℃"}
                                                                                          value={this.state.temperature}
                                                                                          maxValue={40}
                                                                                          radiusCenter={75}
                                                                                          radiusOuter={22}
                                                                                          fontTitle={"Bold 15px/22px SpoqaHanSans"}
                                                                                          fontValue={"Bold 30px/45px SpoqaHanSans"}/>}/>
                                                </div>
                                            </td>

                                            <td> {/* 습도 */}
                                                <div className="main_pc_circleGraph" style={{marginLeft: "40px"}}>
                                                    <BlurBackground noShadow={false} width={256} height={256}
                                                                    content={<CircleGraph width={256} height={256}
                                                                                          title={"습도"} unit={"%"}
                                                                                          value={this.state.humidity}
                                                                                          maxValue={100}
                                                                                          radiusCenter={75}
                                                                                          radiusOuter={22}
                                                                                          fontTitle={"Bold 15px/22px SpoqaHanSans"}
                                                                                          fontValue={"Bold 30px/45px SpoqaHanSans"}/>}/>
                                                </div>
                                            </td>

                                            <td rowSpan={2}> {/* 정보 */}
                                                <div className="main_pc_viewer" style={{marginLeft: "40px"}}>
                                                    <BlurBackground noShadow={false} width={737} height={646} content={
                                                        <div style={{margin: "45px 45px 39px"}}>
                                                            <div className="main_pc_viewer_animation"/>
                                                            <div className="main_pc_viewer_animation_sub"/>
                                                            <div className="main_pc_viewer_tab">
                                                                <ViewerTab noShadow={true} isPC={true} imgSrc={imgCamera} text={"방범용 카메라"}
                                                                           width={115} height={115}/>
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
                                                                <button className="main_pc_adapter_header_editButton">
                                                                    <span
                                                                        className="main_pc_adapter_header_editButton_text">편집</span>
                                                                </button>
                                                            </div>
                                                            <div className="main_pc_adapter_content">
                                                                <Adapter isPC={true} type={"a"} width={24} height={200}
                                                                         minValue={0} maxValue={100} firstValue={20}
                                                                         onChanged={this.handleAdapterChanged}/>
                                                                <Adapter isPC={true} type={"b"} width={24} height={200}
                                                                         minValue={0} maxValue={100} firstValue={50}
                                                                         onChanged={this.handleAdapterChanged}/>
                                                                <Adapter isPC={true} type={"c"} width={24} height={200}
                                                                         minValue={0} maxValue={100} firstValue={60}
                                                                         onChanged={this.handleAdapterChanged}/>
                                                                <Adapter isPC={true} type={"d"} width={24} height={200}
                                                                         minValue={0} maxValue={100} firstValue={50}
                                                                         onChanged={this.handleAdapterChanged}/>
                                                                <Adapter isPC={true} type={"f"} width={24} height={200}
                                                                         minValue={0} maxValue={100} firstValue={80}
                                                                         onChanged={this.handleAdapterChanged}/>
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
                                    <Friend img={exampleImg} name={"a"} lastJoined={"접속일시 : 1월 20일 9:40AM"}
                                            onDeleteButtonClicked={this.onFriendSelect}/>
                                    <div className="main_pc_friends_separator"/>
                                    <Friend img={exampleImg} name={"b"} lastJoined={"접속일시 : 1월 20일 9:40AM"}
                                            onDeleteButtonClicked={this.onFriendSelect}/>
                                    <div className="main_pc_friends_separator"/>
                                    <Friend img={exampleImg} name={"c"} lastJoined={"접속일시 : 1월 20일 9:40AM"}
                                            onDeleteButtonClicked={this.onFriendSelect}/>

                                    <img src={Object.keys(this.state.selected).length > 0 ? friendDeleteImg : friendPlusImg} style={{
                                        textAlign: "right",
                                        position: "absolute",
                                        bottom: "50px",
                                        right: "60px"
                                    }}/>

                                </div>}
                        </span>
                        : <div style={{
                            width: "100%",
                            marginTop: "17px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center"
                        }}> {/* mobile */}
                            <table>
                                <tr>
                                    <td>
                                        <BlurBackground noShadow={false} width={140} height={140} content={<>
                                            <CircleGraph width={140} height={140} title={"온도"} unit={"℃"}
                                                         value={this.state.temperature} maxValue={40} radiusCenter={39}
                                                         radiusOuter={11} fontTitle={"Bold 9px/10px NanumSquareOTF_ac"}
                                                         fontValue={"Bold 18px/27px SpoqaHanSans"}/>
                                        </>}/>
                                    </td>
                                    <td>
                                        <div style={{marginLeft: "12px"}}>
                                            <BlurBackground noShadow={false} width={140} height={140} content={<>
                                                <CircleGraph width={140} height={140} title={"습도"} unit={"%"}
                                                             value={this.state.humidity} maxValue={100}
                                                             radiusCenter={39} radiusOuter={11}
                                                             fontTitle={"Bold 9px/10px NanumSquareOTF_ac"}
                                                             fontValue={"Bold 18px/27px SpoqaHanSans"}/>
                                            </>}/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <div style={{
                                            marginTop: "24px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}>
                                            <BlurBackground noShadow={true} width={292} height={166} content={<>
                                                <div className="main_mobile_adapter_header">
                                                    <span
                                                        className="main_mobile_adapter_header_title">집 안의 전등을 조절해봐요</span>
                                                    <button className="main_mobile_adapter_header_editButton">
                                                        <span
                                                            className="main_mobile_adapter_header_editButton_text">편집</span>
                                                    </button>
                                                </div>
                                                <div className="main_mobile_adapter_content">
                                                    <Adapter isPC={false} type={"a"} width={12} height={100}
                                                             minValue={0} maxValue={100} firstValue={20}
                                                             onChanged={this.handleAdapterChanged}/>
                                                    <Adapter isPC={false} type={"b"} width={12} height={100}
                                                             minValue={0} maxValue={100} firstValue={50}
                                                             onChanged={this.handleAdapterChanged}/>
                                                    <Adapter isPC={false} type={"c"} width={12} height={100}
                                                             minValue={0} maxValue={100} firstValue={60}
                                                             onChanged={this.handleAdapterChanged}/>
                                                    <Adapter isPC={false} type={"d"} width={12} height={100}
                                                             minValue={0} maxValue={100} firstValue={50}
                                                             onChanged={this.handleAdapterChanged}/>
                                                    <Adapter isPC={false} type={"f"} width={12} height={100}
                                                             minValue={0} maxValue={100} firstValue={80}
                                                             onChanged={this.handleAdapterChanged}/>
                                                </div>
                                            </>}/>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <div style={{width: "292px"}}>
                                <div className="main_mobile_other_text">그 외 관리</div>
                                <div className="main_mobile_other_components">
                                    <ViewerTab noShadow={true} isPC={false} imgSrc={imgCamera} text={"방범용 카메라"} width={84} height={84} />
                                </div>
                            </div>

                        </div>}
                </div>
            </div>
        );
    }

}

export default Main;