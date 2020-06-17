import React, {Component, createRef} from 'react';
import './ViewerTab.css'
import BlurBackground from "../BlurBackground";

interface Props {
    imgSrc: string;
    text: string;
    width: number;
    height: number;
    isPC: boolean;
}

interface State {

}

const DEFAULT_VALUE = {

}

const textPC = {
    marginTop: "7px",
    fontFamily: "SpoqaHanSans",
    fontSize: "15px",
    lineHeight: "22px",
}

const textMobile = {
    marginTop: "6px",
    fontFamily: "SpoqaHanSans",
    fontSize: "12px",
    lineHeight: "18px",
}

class ViewerTab extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            ...DEFAULT_VALUE
        }
    }

    componentDidMount() {

    }
    render() {
        return (
            <BlurBackground noShadow={false} width={this.props.width} height={this.props.height} content={
                <div style={{width: this.props.width, height: this.props.height, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                        <img src={this.props.imgSrc} width={this.props.width * 0.8} height={this.props.height * 0.8}/>
                        <div className="viewertab_text" style={this.props.isPC ? textPC : textMobile}>{this.props.text}</div>
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