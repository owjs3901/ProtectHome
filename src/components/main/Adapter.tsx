import React, {Component, createRef, CSSProperties} from 'react';
import './Adapter.css'

interface Props {
    type: string;
    minValue: number;
    maxValue: number;
    firstValue: number;
    onChanged: (type:string, currentValue: number) => void;
}

interface State {
    height: number;
}

class Adapter extends Component<Props, State> {
    resultRef = createRef<HTMLDivElement>()
    barRef = createRef<HTMLDivElement>()
    endPointRef = createRef<HTMLDivElement>()
    containerRef = createRef<HTMLDivElement>()

    dragging: boolean = false
    currentNumber: number = 0
    circleSize: number = 0
    lastPercent: number = 0

    constructor(props: Props) {
        super(props);

    }

    updateData(mode: number, pageY: number) {
        const isPC = window.innerWidth >= 1000
        const defaultHeight = isPC ? 200 : 95
        this.currentNumber = 0
        this.circleSize = isPC ? 12 : 6

        let height: number
        let percent: number
        if(mode == 0) {
            percent = ((this.props.firstValue - this.props.minValue) / (this.props.maxValue - this.props.minValue))
            height = defaultHeight * percent
        } else if(mode == 1) {
            const rawHeight = pageY - getOffset(this.containerRef.current!).top
            height = (defaultHeight - rawHeight + (isPC ? this.circleSize : -6))
            percent = (height - this.circleSize) / (defaultHeight - this.circleSize)
        } else {
            height = defaultHeight * this.lastPercent
            percent = this.lastPercent
        }

        if(mode == 3) {
            //console.log(defaultHeight + ", " + height + ", " + percent)
            this.props.onChanged(this.props.type, percent * 100)
        }

        if (height >= this.circleSize && height <= defaultHeight) {
            if(mode != 3) {
                this.setState({
                    height: height
                }, () => {
                    this.barRef.current!.style.height = (this.state.height) + "px"
                    this.endPointRef.current!.style.bottom = ((this.state.height) - (isPC ? 21 : 12)) + "px"
                })
            }
            this.lastPercent = percent
        }

    }

    componentDidMount() {
        window.addEventListener('mouseup',  this.dragFinish)
        window.addEventListener('resize', e=>{this.updateData(2, 0)})
        this.updateData(0, 0)
    }

    dragStart = (e :React.MouseEvent) => {
        this.dragging = true
        this.drag(e)
    }

    drag = (e: React.MouseEvent) => {
        if(this.dragging && e.pageY) {
            this.updateData(1, e.pageY)
        }
    }

    dragFinish = () => {
        if(this.dragging) {
            this.dragging = false
            this.updateData(3, 0)
        }
    }

    render() {
        return (
            <div className="adapter_container" ref={this.containerRef}>
                <div className="adapter_graph_container" onMouseDown={this.dragStart} onMouseMove={this.drag}>
                    <div className="adapter_graph_bar" ref={this.barRef}/>
                    <div className="adapter_graph_endPoint" ref={this.endPointRef}/>
                </div>
                <div className="adapter_graph_text" ref={this.resultRef}>{this.props.type}</div>
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