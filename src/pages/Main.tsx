import React, {Component, createRef} from 'react'
import Background from "../components/Background";
import MainTab from "../components/main/MainTab";
import BlurBackground from "../components/BlurBackground";
import CircleGraph from "../components/main/CircleGraph";
import ViewerTab from "../components/main/ViewerTab";
import imgCamera from "../assets/images/img_camera.svg";
import imgDoor from "../assets/images/img_door.png";
import imgWindow from "../assets/images/img_window.svg";
import Adapter from "../components/main/Adapter";
import FriendTab from "../components/main/FriendTab";
import exampleImg from "../assets/images/img_exampleProfile.svg";
import friendPlusImg from "../assets/images/img_friendPlus.svg";
import friendDeleteImg from "../assets/images/img_friendDelete.svg";
import Header from "../components/Header";
import './Main.scss'
import backImg from "../assets/images/img_mobile_back.svg"
import deleteImg from "../assets/images/img_mobile_friendDelete.svg"
import deleteEnabledImg from "../assets/images/img_mobile_friendDelete_enabled.svg"
import plusImg from "../assets/images/img_mobile_friendPlus.svg";
import Invite from "../components/invite/Invite";
import Dialog from "../components/Dialog";
import RoomSwitch from "../components/main/RoomSwitch";
import RoomSwitchAdd from "../components/main/RoomSwichAdd";
import {connect} from "react-redux";
import {storeState} from "../store";
import { RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps{
    login:boolean
}

interface State {
    temperature: number; // TODO REDUX
    humidity: number; // TODO REDUX
    type: string;
    selected: { [id: number]: boolean }
    mobileDeleteButtonClicked: boolean
    receivedOTPNum: string; //TODO REDUX
    receivedName: string; // TODO REDUX
    inviteButtonClicked: boolean;
    width: number;
    isOn:boolean[];//LED
    isOpen:boolean[];//모터
    deleteButtonClicked: boolean;
    users:{name:string,date:number}[];//유저
}

const DEFAULT_STATE = {
    type: "Home",
    selected: {},
    temperature: 21,
    humidity: 83,
    mobileDeleteButtonClicked: false,
    receivedOTPNum: "1234",
    receivedName: "테스트",
    isOn:[false,false,false],
    isOpen:[false,false],
    inviteButtonClicked: false,
    deleteButtonClicked: false,
    users: []
}

class Main extends Component<Props, State> {
    friendDeletePCRef = createRef<HTMLImageElement>()
    friendDeleteMobileRef = createRef<HTMLImageElement>()
    headerRef = createRef<HTMLDivElement>()

    readUser(){
        fetch('/api/user')
            .then(s=>s.json())
            .then(s=>{
                this.setState({
                    users:s.res
                })
            })
    }

    readData(){
        fetch('/api/getData')
            .then(s=>s.json())
            .then(s=>{
                this.setState({
                    isOn:[Boolean(s.data[2]), Boolean(s.data[3]), Boolean(s.data[4])],
                    isOpen:[Boolean(s.data[0]), Boolean(s.data[1])],
                    temperature:s.data[5],
                    humidity:s.data[6],
                })
            })
    }

    constructor(props: Props) {
        super(props);

        if(!props.login){
            //로그인 안하면 로그인 페이지로 이동
            this.props.history.push("/login")
        }
        this.readUser()
        this.readData()

        setInterval(this.readData.bind(this),1000*60);

        this.state = {
            ...DEFAULT_STATE,
            width: window.innerWidth
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
    }

    handleMainTabClicked = (type: string, clicked: Boolean) => {
        console.log(type)
        this.setState({
            type: type
        })
    }

    // TODO REDUX
    // 전등 밝기 조절 바를 옮겼을 때 해당하는 바의 이름과 퍼센트(0~100 사이)를 반환함.
    handleAdapterChanged = (type: string, currentValue: number) => {
        console.log("type: " + type + ", percent: " + currentValue)
    }


    handleFriendSelected = (id: number, checked: boolean) => {
        if (checked) {
            this.state.selected[id] = true
        } else {
            delete this.state.selected[id]
        }

        this.friendDeletePCRef.current!.src = Object.keys(this.state.selected).length > 0 ? friendDeleteImg : friendPlusImg
        this.setState({})
    }

    handleMobileFriendClicked = () => {
        this.handleMainTabClicked("Friends", true)
    }

    handleMobileBackButtonClicked = () => {
        this.handleMainTabClicked("Home", true)
    }

    handleMobileFriendDeleteButtonClicked = () => {
        // TODO REDUX
        // selected에 있는 값에 따라 receivedName을 초기화 후 setState
        // +로 REDUX엔 현재 친구 목록 DB도 있어야 함.
        this.setState({
            mobileDeleteButtonClicked: !this.state.mobileDeleteButtonClicked
        }, () => {
            this.friendDeleteMobileRef.current!.src = this.state.mobileDeleteButtonClicked ? deleteEnabledImg : deleteImg
        })
    }

    handleAddFriendButtonClicked = () => {
        if(Object.keys(this.state.selected).length === 0) {
            //TODO REDUX
            // OTP 받아서 setState에 추가로 receivedOTPNum을 초기화해줄것
            this.setState({
                inviteButtonClicked: true
            }, () => {
                let k:string=String(Math.floor(Math.random() * 10));
                k+=String(Math.floor(Math.random() * 10));
                k+=String(Math.floor(Math.random() * 10));
                k+=String(Math.floor(Math.random() * 10));

                //OTP 서버에 추가
                fetch('/api/addOTP?data='+k)

                this.setState({
                    receivedOTPNum:k
                })
            })
        } else {
            // TODO REDUX
            // 아래 Dialog에서 id에 따른 name 값을 불러와 삭제할 친구 목록을 얻어야 함.

            this.setState({
                deleteButtonClicked: true
            }, () => {

            })
        }
    }

    handleInviteCancelButtonClicked = () => {
        this.setState({
            inviteButtonClicked: false
        }, () => {

        })
    };

    handleAnswerSelected = (accepted: boolean) => {
        // TODO REDUX
        // this.state.selected에 있는 id의 값을 친구 목록에서 삭제하여야 함.
        this.setState({
            deleteButtonClicked: false
        }, () => {
            console.log(accepted)
        })
    }


    handleRoomSwitchChanged = (title: string, isOn: boolean) => {
        console.log(title + ", " + isOn)
        let idx=0;
        switch (title) {
            case "DOOR":
                idx=0
                break;
            case "WINDOW":
                idx=1
                break;
            case "ROOM":
                idx=2
                break;
        }
        const lis=this.state.isOn;
        const k=lis[idx];
        lis[idx]=!k

        this.setState({isOn:lis})

        fetch(`/api/setData2?data=[${Number(lis[0])},${Number(lis[1])},${Number(lis[2])}]`)
            .then(s=>s.json())
    }

    handleButtonSwitchChanged = (title: string, isOn: boolean) => {
        console.log(title + ", " + isOn)
        let idx=0;
        switch (title) {
            case "방범용 카메라":
                idx=0
                return;
            case "창문":
                idx=0
                break;
            case "문":
                idx=1
                break;
        }
        const lis=this.state.isOpen;
        const k=lis[idx];
        lis[idx]=!k

        this.setState({isOpen:lis})

        fetch(`/api/setData1?data=[${Number(lis[0])},${Number(lis[1])}]`)
            .then(s=>s.json())
    }
    ViewerTabs() {
        return (
            <>
                <div className="main_viewer_tab">
                    <ViewerTab handle={this.handleButtonSwitchChanged} isOn={true} noShadow={true} isPC={true} imgSrc={imgCamera} text={"방범용 카메라"}/>
                    <ViewerTab handle={this.handleButtonSwitchChanged} isOn={this.state.isOpen[0]} noShadow={true} isPC={true} imgSrc={imgWindow} text={"창문"}/>
                    <ViewerTab handle={this.handleButtonSwitchChanged} isOn={this.state.isOpen[1]} noShadow={true} isPC={true} imgSrc={imgDoor} text={"문"}/>
                </div>
            </>
        );
    }

    render() {
        const {type, width, mobileDeleteButtonClicked, receivedOTPNum, receivedName, inviteButtonClicked, deleteButtonClicked} = this.state

        return (
            <div className="main_background">
                {/* Header */}
                <div className="main_header" ref={this.headerRef}><Header {...this.props}/></div>

                {/*Container*/}
                <span className="main_container">
                    {deleteButtonClicked ? <Dialog question={/*receivedName + "님을 */"삭제하시겠습니까?"} onAnswerSelected={this.handleAnswerSelected} /> : <></>}

                    {/* Main, Friends 탭 보여주는 창 */}
                    {!inviteButtonClicked ?
                        <div className="main_tab">
                            <MainTab type={"Home"} selected={type === "Home"} onChanged={this.handleMainTabClicked} content={<>Home</>}/>
                            <MainTab type={"Friends"} selected={type === "Friends"} onChanged={this.handleMainTabClicked} content={<>Friends</>}/>
                        </div>
                    : <></>}

                    {/*홈 화면 보여주는 창 (온도같은)*/}
                    {!inviteButtonClicked && type === "Home" ? <div>
                        <Background/>
                        <div className="main_header_mobile_container">
                            <button className="main_header_mobile_button" onClick={this.handleMobileFriendClicked}>
                                <div className="main_header_mobile_containerFriends">
                                    <img className="main_header_mobile_profileImg" src={exampleImg}/>
                                    <img className="main_header_mobile_profileImg" src={plusImg} width="18px" height="18px" style={{marginLeft: "9px"}}/>
                                </div>
                            </button>

                            <div className="main_header_mobile_containerWeather">
                                <div className="main_header_mobile_containerTitle">
                                    <span className="main_header_mobile_weatherTitle">오늘의 날씨는</span>
                                    <span className="main_header_mobile_weatherSubTitle">{"맑고 화창하지만 늦은 밤엔 비가 올 예정이에요"}</span>
                                </div>
                                <div className="main_header_mobile_temperature">{20}℃</div>
                            </div>
                        </div>
                        <span className="main_content">
                            <table>
                                <tr>
                                    {/* 온도 */}
                                    <td><div className="main_circleGraph_temperature"><BlurBackground noShadow={false} content={
                                        <CircleGraph title={"온도"} unit={"℃"} value={this.state.temperature} maxValue={40}/>}/></div></td>
                                    {/* 습도 */}
                                    <td><div className="main_circleGraph_humidity"><BlurBackground noShadow={false} content={
                                        <CircleGraph title={"습도"} unit={"%"} value={this.state.humidity} maxValue={100}/>}/></div></td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>{/* 조절     width: 556px; height: 360px;*/}
                                        <div className="main_adapter">
                                            {/*<BlurBackground noShadow={false} content={*/}
                                                    <div className="main_adapter_header">
                                                        <span className="main_adapter_header_title">집 안의 전등을 조절해봐요</span>
                                                        {/*<button className="main_adapter_header_editButton">*/}
                                                        {/*    <span className="main_adapter_header_editButton_text">편집</span>*/}
                                                        {/*</button>*/}
                                                    </div>
                                                    <table className="main_adapter_table" style={{border: "none", padding: "0px"}}>
                                                        <tr>
                                                            <td className="main_adapter_td"><RoomSwitch isOn={this.state.isOn[0]} handleOnStateChanged={this.handleRoomSwitchChanged} title={"DOOR"} /></td>
                                                            <td className="main_adapter_td"><RoomSwitch isOn={this.state.isOn[1]} handleOnStateChanged={this.handleRoomSwitchChanged} title={"WINDOW"} /></td>
                                                        </tr>
                                                        <tr>
                                                            <td className="main_adapter_td"><RoomSwitch isOn={this.state.isOn[2]} handleOnStateChanged={this.handleRoomSwitchChanged} title={"ROOM"} /></td>
                                                            <td className="main_adapter_td"><RoomSwitchAdd /></td>
                                                        </tr>
                                                    </table>
                                                    {/*<div className="main_adapter_content"> /!*TODO REDUX 전등 값 받아와서 firstValue에 넣어야 됨. *!/*/}
                                                        {/*<Adapter type={"a"} minValue={0} maxValue={100} firstValue={20} onChanged={this.handleAdapterChanged}/>*/}
                                                        {/*<Adapter type={"b"} minValue={0} maxValue={100} firstValue={50} onChanged={this.handleAdapterChanged}/>*/}
                                                        {/*<Adapter type={"c"} minValue={0} maxValue={100} firstValue={60} onChanged={this.handleAdapterChanged}/>*/}
                                                        {/*<Adapter type={"d"} minValue={0} maxValue={100} firstValue={50} onChanged={this.handleAdapterChanged}/>*/}
                                                        {/*<Adapter type={"f"} minValue={0} maxValue={100} firstValue={80} onChanged={this.handleAdapterChanged}/>*/}
                                                    {/*</div>*/}
                                            {/*}/>*/}
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            {/*PC전용 뷰어탭*/}
                            <div className="main_viewer" style={{marginLeft: "40px"}}>
                                <BlurBackground noShadow={false} content={
                                    <div style={{margin: "45px 45px 39px"}}>
                                        <div className="main_viewer_animation"/>
                                        <div className="main_viewer_animation_sub"/>
                                        {
                                            (()=>{
                                                return this.ViewerTabs();
                                            })()
                                        }
                                        {/*<this.ViewerTabs state={this.state}/>*/}
                                    </div>}/>
                            </div>
                            {/*모바일전용 뷰어탭*/}
                            <div className="main_viewer_mobile">
                                <div className="main_viewer_mobile_text">그 외 관리</div>
                                {
                                    (()=>{
                                        return this.ViewerTabs();
                                    })()
                                }
                                {/*<this.ViewerTabs/>*/}
                            </div>
                        </span>
                    </div> : <></>}

                    {/*친구창 보여주는 창*/}
                    {(!inviteButtonClicked || width < 1000) && type === "Friends" ? <div className="main_friends_content" style={{position: "relative"}}>
                        <div className="main_friends_header">
                            <img src={backImg} className="main_friends_mobile_back" onClick={this.handleMobileBackButtonClicked}/>
                            <div className="main_friends_title" style={{textAlign: "left"}}>친구 목록</div>
                            <img ref={this.friendDeleteMobileRef} src={deleteImg} onClick={this.handleMobileFriendDeleteButtonClicked} className="main_friends_deleteImage_mobile"/>
                            <button className="main_friends_mobile_addOrDeleteButton" onClick={this.handleAddFriendButtonClicked}>친구 {Object.keys(this.state.selected).length > 0 ? "삭제" : "초대"}하기</button>
                        </div>
                        <div className="main_friends_header_separator"/>

                        {/* friends TODO 친구목록 갖고와야 함. */}
                        {
                            this.state.users.map((s,index)=>{
                                return <>
                                    <FriendTab img={exampleImg} id={index} name={s.name} lastJoined={"접속일시 : "+new Date(s.date)} mobileVisibleDeleteButton={mobileDeleteButtonClicked} onDeleteButtonClicked={this.handleFriendSelected}/>
                                    <div className="main_friends_separator"/>
                                    </>
                            })

                        }
                        <img ref={this.friendDeletePCRef} src={friendPlusImg} className="main_friends_deleteImage" onClick={this.handleAddFriendButtonClicked}/>
                    </div> : <></>}
                    {/*초대시 OTP 보여주는 창*/}
                    {inviteButtonClicked ? <Invite number={this.state.receivedOTPNum} cancelButtonClicked={this.handleInviteCancelButtonClicked}/> : <></>}
            </span>
            </div>
        );
    }


}

export default connect((stat:storeState)=>({login:stat.login}))(Main)
