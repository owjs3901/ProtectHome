//메인
import React, {Component, createRef, Ref, useRef} from 'react';
import Header from '../components/Header';
import './Main.css'
import circle from '../assets/images/img_circle.svg'
import Background from "../components/Background";
import MainTap from "../components/MainTap";

interface Props {

}

interface State {
    type: String
}

const DEFAULT_STATE = {
    type: "Home"
}


class Main extends Component<Props, State> {
    temperatureCanvasRef = createRef<HTMLCanvasElement>()
    // temperatureCanvasRef = useRef<HTMLCanvasElement>(null);
    // humidityCanvasRef = useRef<HTMLCanvasElement>(null);

     constructor(props: Props) {
        super(props);

        this.state = {
            ...DEFAULT_STATE
        }
    }

    onChanged = (type: String, clicked: Boolean) => {
        console.log(type)
        this.setState({
            type: type
        })

    }

    drawArc(element: CanvasRenderingContext2D) {
        if(element) {

        }
    }

    componentDidMount() {

    }

    getArc(width: number, height: number, percent: number) {

    }

    render() {
        const isPC = window.innerWidth >= 1000;
        const {type} = this.state
        return (
            <div className="main_background">
                <Background/>
                <div className="main_container">
                    <div className="main_header"><Header/></div>
                    {isPC ?
                        <span className="main_pc_container">
                        <div className="main_pc_tap">
                            <MainTap type={"Home"} selected={type == "Home"} onChanged={this.onChanged}
                                     content={<>Home</>}/>
                            <MainTap type={"Friends"} selected={type == "Friends"} onChanged={this.onChanged}
                                     content={<>Friends</>}/>
                        </div>
                        <div className="main_pc_content">
                            <table>
                                <tr>
                                    <td> {/* 온도 */}
                                        <div className="main_pc_circleGraph">
                                            <div className="main_pc_circleGraph_background">
                                                <div className="main_pc_circleGraph_textContainer">
                                                    <div className="main_pc_circleGraph_textContainer_title">온도</div>
                                                    <div className="main_pc_circleGraph_textContainer_value">{20}℃</div>
                                                </div>
                                                <div className="main_pc_circleGraph_canvas">
                                                    <div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td > {/* 습도 */}
                                        <div className="main_pc_circleGraph " style={{marginLeft: "40px"}}>
                                            습도
                                        </div>
                                    </td>


                                    <td rowSpan={2}> {/* 정보 */}
                                        <div className="main_pc_viewer" style={{marginLeft: "40px"}}>
                                            정보
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>{/* 조절 */}
                                        <div className="main_pc_adapter" style={{marginTop: "30px"}}>
                                            조절
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </span>
                        : <div>
                            asdfasdf
                        </div>}

                    {/*<span className="header_mobile_effectCircleCenter">asdfasdfadfasdfasdfasdfasdf</span>*/}
                </div>
            </div>
        );
    }

}

export default Main;