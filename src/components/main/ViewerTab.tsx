import React, {Component, createRef} from 'react';
import './ViewerTab.css'
import BlurBackground from "../BlurBackground";

interface Props {
    imgSrc: string;
    text: string;
    noShadow: boolean;
    isPC: boolean;
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
                <div className="viewerTab_content">
                        <img className="viewerTab_image" src={this.props.imgSrc}/>
                        <div className="viewerTab_text">{this.props.text}</div>
                </div>
            }/>
        );
    }
}

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