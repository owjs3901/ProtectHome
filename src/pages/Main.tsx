//메인
import React, {Component, createRef, Ref, useRef} from 'react';
import Header from '../components/Header';
import './Main.scss'
import circle from '../assets/images/img_circle.svg'
import Background from "../components/Background";
import MainTap from "../components/main/MainTap";
import Adapter from "../components/main/Adapter";
import BlurBackground from "../components/BlurBackground";
import CircleGraph from "../components/main/CircleGraph";
import ViewerTab from "../components/main/ViewerTab";
import imgCamera from '../assets/images/img_camera.svg'

interface Props {

}

interface State {
    type: string;
    temperature: number;
    humidity: number;
    width: number;
}

const DEFAULT_STATE = {
    type: "Home",
    temperature: 15,
    humidity: 95,
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

    onMainTabChanged = (type: string, clicked: Boolean) => {
        console.log(type)
        this.setState({
            type: type
        })
    }

    onAdapterChanged = (type: string, currentValue: number) => {

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
                        <div className="main_pc_tap">
                            <MainTap type={"Home"} selected={type == "Home"} onChanged={this.onMainTabChanged}
                                     content={<>Home</>}/>
                            <MainTap type={"Friends"} selected={type == "Friends"} onChanged={this.onMainTabChanged}
                                     content={<>Friends</>}/>
                        </div>
                        <div className="main_pc_content">
                            <table>
                                <tr>
                                    <td> {/* 온도 */}
                                        <div className="main_pc_circleGraph">
                                            <BlurBackground width={256} height={256} content={<CircleGraph width={256} height={256} title={"온도"} unit={"℃"} value={20} maxValue={40} radiusCenter={75} radiusOuter={22} />}/>
                                        </div>
                                    </td>

                                    <td > {/* 습도 */}
                                        <div className="main_pc_circleGraph" style={{marginLeft: "40px"}}>
                                            <BlurBackground width={256} height={256} content={<CircleGraph width={256} height={256} title={"습도"} unit={"%"} value={95} maxValue={100} radiusCenter={75} radiusOuter={22} />}/>
                                        </div>
                                    </td>

                                    <td rowSpan={2}> {/* 정보 */}
                                        <div className="main_pc_viewer" style={{marginLeft: "40px"}}>
                                             <BlurBackground width={737} height={646} content={
                                                 <div style={{margin: "45px 45px 39px"}}>
                                                     <div className="main_pc_viewer_animation"/>
                                                     <div className="main_pc_viewer_animation_sub"/>
                                                     <div className="main_pc_viewer_tab">
                                                           <ViewerTab imgSrc={imgCamera} text={"방범용 카메라"} width={115} height={115}/>
                                                      </div>
                                                  </div>
                                             }/>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={2}>{/* 조절     width: 556px; height: 360px;*/}
                                        <div className="main_pc_adapter" style={{marginTop: "30px"}}>
                                            <BlurBackground width={556} height={360} content={
                                                <div>
                                                    <div className="main_pc_adapter_header">
                                                        <span className="main_pc_adapter_header_title">집 안의 전등을 조절해봐요</span>
                                                        <button className="main_pc_adapter_header_editButton">
                                                            <span className="main_pc_adapter_header_editButton_text">편집</span>
                                                        </button>
                                                    </div>
                                                    <div className="main_pc_adapter_content">
                                                        <Adapter type={"a"} height={200} minValue={0} maxValue={100} firstValue={50} onChanged={this.onAdapterChanged} />
                                                        <Adapter type={"b"} height={200} minValue={0} maxValue={100} firstValue={50} onChanged={this.onAdapterChanged} />
                                                        <Adapter type={"c"} height={200} minValue={0} maxValue={100} firstValue={50} onChanged={this.onAdapterChanged} />
                                                        <Adapter type={"d"} height={200} minValue={0} maxValue={100} firstValue={50} onChanged={this.onAdapterChanged} />
                                                        <Adapter type={"d"} height={200} minValue={0} maxValue={100} firstValue={50} onChanged={this.onAdapterChanged} />
                                                    </div>
                                                </div>
                                            }/>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </span>
                        : <div>
                            asdfasdf
                        </div>}
                </div>
            </div>
        );
    }

}

export default Main;