import React, {Component} from 'react';
import BlurBackground from "../src/components/BlurBackground";
import CircleGraph from "../src/components/main/CircleGraph";
import Adapter from "../src/components/main/Adapter";
import ViewerTab from "../src/components/main/ViewerTab";
import imgCamera from "../src/assets/images/img_camera.svg";
import './MainMobile.scss'

interface Props {
    temperature: number;
    humidity: number;
    handleAdapterChanged: (type:string, currentValue: number) => void;
}

interface State {

}

class MainMobile extends Component<Props, State> {
    render() {
        return (
            <div style={{width: "100%", marginTop: "17px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}> {/* mobile */}
                <table>
                    <tr>
                        <td>
                            <BlurBackground noShadow={false} width={140} height={140} content={
                                <CircleGraph width={140} height={140} title={"온도"} unit={"℃"} value={this.props.temperature} maxValue={40} radiusCenter={39} radiusOuter={11}
                                             fontTitle={"Bold 9px/10px NanumSquareOTF_ac"} fontValue={"Bold 18px/27px SpoqaHanSans"}/>}/>
                        </td>
                        <td>
                            <div style={{marginLeft: "12px"}}>
                                <BlurBackground noShadow={false} width={140} height={140} content={
                                    <CircleGraph width={140} height={140} title={"습도"} unit={"%"} value={this.props.humidity} maxValue={100} radiusCenter={39} radiusOuter={11}
                                                 fontTitle={"Bold 9px/10px NanumSquareOTF_ac"} fontValue={"Bold 18px/27px SpoqaHanSans"}/>}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <div style={{marginTop: "24px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <BlurBackground noShadow={true} width={292} height={166} content={<>
                                    <div className="main_mobile_adapter_header">
                                        <span className="main_mobile_adapter_header_title">집 안의 전등을 조절해봐요</span>
                                        <button className="main_mobile_adapter_header_editButton"><span className="main_mobile_adapter_header_editButton_text">편집</span></button>
                                    </div>
                                    <div className="main_mobile_adapter_content">
                                        <Adapter isPC={false} type={"a"} minValue={0} maxValue={100} firstValue={20} onChanged={this.props.handleAdapterChanged}/>
                                        <Adapter isPC={false} type={"b"} minValue={0} maxValue={100} firstValue={50} onChanged={this.props.handleAdapterChanged}/>
                                        <Adapter isPC={false} type={"c"} minValue={0} maxValue={100} firstValue={60} onChanged={this.props.handleAdapterChanged}/>
                                        <Adapter isPC={false} type={"d"} minValue={0} maxValue={100} firstValue={50} onChanged={this.props.handleAdapterChanged}/>
                                        <Adapter isPC={false} type={"f"} minValue={0} maxValue={100} firstValue={80} onChanged={this.props.handleAdapterChanged}/>
                                    </div>
                                </>}/>
                            </div>
                        </td>
                    </tr>
                </table>
                <div style={{width: "292px"}}>
                    <div className="main_mobile_other_text">그 외 관리</div>
                    <div className="main_mobile_other_components"><ViewerTab noShadow={true} isPC={false} imgSrc={imgCamera} text={"방범용 카메라"} width={84} height={84}/></div>
                </div>
            </div>
        )
    }
}

export default MainMobile;