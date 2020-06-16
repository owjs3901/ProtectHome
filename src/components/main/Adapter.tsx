import React, {Component, createRef} from 'react';
import './Adapter.css'

interface Props {
    type: string;
    minValue: number;
    maxValue: number;
    firstValue: number;
    height: number;
    onChanged: (type:string, currentValue: number) => void;
}

interface State {
    dragging : boolean
    currentNumber: number
}

const DEFAULT_VALUE = {
    dragging: false,
    currentNumber: 0,
}

class Adapter extends Component<Props, State> {
    resultRef = createRef<HTMLDivElement>()
    barRef = createRef<HTMLDivElement>()
    endPointRef = createRef<HTMLDivElement>()
    containerRef = createRef<HTMLDivElement>()

    dragging: boolean = false

    constructor(props: Props) {
        super(props);

        this.state = {
            ...DEFAULT_VALUE
        }

        // this.setState( {
        //
        // })
    }

    componentDidMount() {
        // setInterval(() => {
        //     this.resultRef.current!.textContent = this.state.currentNumber + " " + this.containerRef.current!.getBoundingClientRect().y
        // }, 1000)
    }

    dragStart = (e :React.MouseEvent) => {
        this.dragging = true
        this.drag(e)
    }

    dragFinish = (e :React.MouseEvent) => {
        this.dragging = false
    }

    drag = (e: React.MouseEvent) => {
        if(this.dragging && e.pageY) {
            const pageY = e.pageY - getOffset(this.containerRef.current!).top
            const height = (this.props.height - pageY + 12)

            if(height >= 12 && height <= this.props.height) {
                this.setState({
                    currentNumber: pageY
                }, () => {
                    //console.log(this.state.currentNumber)
                    this.barRef.current!.style.height = height + "px"
                    this.endPointRef.current!.style.bottom = (height - 21) + "px"
                })
            }
        }
    }

    render() {
        return (
            <div className="adapter_container" ref={this.containerRef} >
                <div className="adapter_graph_container" style={{height: this.props.height}} onMouseDown={this.dragStart} onMouseMove={this.drag} onMouseUp={this.dragFinish}>
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