import React, {Component, createRef, CSSProperties} from 'react';
import './Adapter.css'

interface Props {
    type: string;
    minValue: number;
    maxValue: number;
    firstValue: number;
    isPC: boolean;
    width: number;
    height: number;
    onChanged: (type:string, currentValue: number) => void;
}

interface State {
    dragging : boolean
    currentNumber: number
}

const barSizePC: CSSProperties = {
    width: "24px",
    height: "50px",
}

const barSizeMobile: CSSProperties = {
    width: "12px",
    height: "50px",
}

const endPointSizePC: CSSProperties = {
    width: "24px",
    height: "24px",
    bottom: "59px",
}

const endPointSizeMobile: CSSProperties = {
    width: "12px",
    height: "12px",
    bottom: "35px",
}

const textPC: CSSProperties = {
    font: "Regular 22px/25px NanumSquareOTF_ac",
    marginTop: "18px"
}

const textMobile: CSSProperties = {
    font: "Regular 12px/18px SpoqaHanSans",
    marginTop: "5px"
}

const containerPC: CSSProperties = {
    width: "100px"
}
const containerMobile: CSSProperties = {
    width: "50px"
}


class Adapter extends Component<Props, State> {
    resultRef = createRef<HTMLDivElement>()
    barRef = createRef<HTMLDivElement>()
    endPointRef = createRef<HTMLDivElement>()
    containerRef = createRef<HTMLDivElement>()

    dragging: boolean = false

    circleSize: number

    constructor(props: Props) {
        super(props);

        this.circleSize = this.props.isPC ? 12 : 6
    }

    componentDidMount() {
        // setInterval(() => {
        //     this.resultRef.current!.textContent = this.state.currentNumber + " " + this.containerRef.current!.getBoundingClientRect().y
        // }, 1000)
        window.addEventListener('mouseup',  this.dragFinish)
        this.barRef.current!.style.width = this.props.width + "px"
        this.setHeight(this.props.height * ((this.props.firstValue - this.props.minValue) / (this.props.maxValue - this.props.minValue)))
    }

    dragStart = (e :React.MouseEvent) => {
        this.dragging = true
        this.drag(e)
    }

    drag = (e: React.MouseEvent) => {
        if(this.dragging && e.pageY) {
            const rawHeight = e.pageY - getOffset(this.containerRef.current!).top
            const height = (this.props.height - rawHeight + (this.props.isPC ? this.circleSize : -3))
            console.log(e.pageY + ", " + rawHeight + ", " + height + ", " + getOffset(this.containerRef.current!).top)

            this.setHeight(height)
        }
    }

    dragFinish = () => {
        if(this.dragging) {
            this.dragging = false
            this.props.onChanged(this.props.type, (this.state.currentNumber - this.circleSize) / (this.props.height - this.circleSize) * 100)
        }
    }


    setHeight(height: number) {

        if(height >= this.circleSize && height <= this.props.height) {
            this.setState({
                currentNumber: height
            }, () => {
                this.barRef.current!.style.height = height + "px"
                this.endPointRef.current!.style.bottom = (height - (this.props.isPC ? 21 : 12)) + "px"
            })
        }
    }

    render() {
        return (
            <div className="adapter_container" ref={this.containerRef} style={this.props.isPC ? containerPC : containerMobile}>
                <div className="adapter_graph_container" style={{width: this.props.width, height: this.props.height}} onMouseDown={this.dragStart} onMouseMove={this.drag}>
                    <div className="adapter_graph_bar" ref={this.barRef} style={this.props.isPC ? barSizePC : barSizeMobile}/>
                    <div className="adapter_graph_endPoint" ref={this.endPointRef} style={this.props.isPC ? endPointSizePC : endPointSizeMobile}/>
                </div>
                <div className="adapter_graph_text" ref={this.resultRef} style={this.props.isPC ? textPC : textMobile}>{this.props.type}</div>
            </div>
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

export default Adapter;