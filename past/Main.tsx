//메인
import React, {Component, createRef, Ref, useRef} from 'react';
import Header from '../src/components/Header';
import './Main.scss'
import circle from '../assets/images/img_circle.svg'
import Background from "../components/Background";
import MainTab from "../components/main/MainTab"
import Adapter from "../components/main/Adapter";
import BlurBackground from "../components/BlurBackground";
import CircleGraph from "../components/main/CircleGraph";
import ViewerTab from "../components/main/ViewerTab";
import FriendTab from "../components/main/FriendTab";
import imgCamera from '../assets/images/img_camera.svg'
import exampleImg from "../assets/images/img_exampleProfile.svg"
import friendPlusImg from "../assets/images/img_friendPlus.svg"
import friendDeleteImg from "../assets/images/img_friendDelete.svg"
import MainPC from "./MainPC";
import MainMobile from "./MainMobile";
import {RouteComponentProps} from "react-router-dom";

/*
1. 웹&모바일-방범용카메라 글자 살짝만 올려주세요
2. 웹&모바일방법용카메라 아이콘 0.9배 해주세요
— 그리고 온도표시 유니코드 실적용하는거 다시보니깐 너무 이상해서 그대로 가는게 맞을것같아요!


 */

interface Props extends RouteComponentProps{

}

interface State {
    type: string;
    temperature: number;
    humidity: number;
    width: number;
    selected: { [name: string]: boolean }
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

    // componentWillMount() {
    //     window.addEventListener('resize', this.handleWindowSizeChange);
    // }
    //
    // componentWillUnmount() {
    //     window.removeEventListener('resize', this.handleWindowSizeChange);
    // }

    // handleWindowSizeChange = () => {
    //     this.setState({width: window.innerWidth});
    // };

    handleAdapterChanged = (type: string, currentValue: number) => {
        console.log(type + ", " + currentValue)
    }

    handleFriendSelected = (id: number, checked: boolean) => {
        if(checked) {
            this.state.selected[id] = true
        } else {
            delete this.state.selected[id]
        }

        return Object.keys(this.state.selected).length
    }
    handleFriendDelete = () => {

    };

    componentDidMount() {
        document.body.style.backgroundColor = "#F7F9FF"
    }

    render() {
        return (
            <div className="main_x_background">
                <Background/>
                <div className="main_x_container">
                    <div className="main_x_header"><Header {...this.props} /></div>
                    <div className="main_x_pc"><MainPC temperature={this.state.temperature} humidity={this.state.humidity} handleAdapterChanged={this.handleAdapterChanged} handleFriendSelected={this.handleFriendSelected} handleFriendDelete={this.handleFriendDelete}/></div>
                    <div className="main_x_mobile"><MainMobile temperature={this.state.temperature} humidity={this.state.humidity} handleAdapterChanged={this.handleAdapterChanged}/></div>
                </div>
            </div>
        );
    }
}

export default Main;
