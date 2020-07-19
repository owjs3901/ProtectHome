import React, {Component, createRef} from 'react';
import './ViewerTab.css'
import BlurBackground from "../BlurBackground";

interface Props {
    imgSrc: string;
    text: string;
    noShadow: boolean;
    isPC: boolean;
    isOn:boolean;
    handle:(title:string ,isOn:boolean)=>void
}

interface State {

}

const DEFAULT_VALUE = {

}

class ViewerTab extends Component<Props, State> {



    constructor(props: Props) {
        super(props);

        this.state = {
            ...DEFAULT_VALUE
        }
    }

    // 방범용 카메라같은 작은 버튼을 만들 때 쓰는 컴포넌트
    render() {
        return (
            <BlurBackground noShadow={this.props.noShadow} content={
                <div className="viewerTab_content" onClick={event => {
                    this.props.handle(this.props.text,this.props.isOn)
                }}>
                        <img className="viewerTab_image" style={{height:"50px",width:"auto",marginBottom:"12px"}} src={this.props.imgSrc}/>
                        <div className="viewerTab_text" style={{color:this.props.isOn?"#73A2FC":"black"}}>{this.props.text}</div>
                </div>
            }/>
        );
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getOffset(child: HTMLElement) {
    let el: HTMLElement | null = child
    let _x = 0;
    let _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;

        if(el.offsetParent instanceof HTMLElement)
            el = el.offsetParent as HTMLElement;
        else
            el = null
    }
    return { top: _y, left: _x };
}

export default ViewerTab;
