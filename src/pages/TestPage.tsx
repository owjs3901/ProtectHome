//로그인 페이지
import React, {Component, createRef} from 'react';
import './TestPage.scss'

interface Props {

}

interface State {
    dragging : boolean
    currentNumber: number
}

const DEFAULT_VALUE = {
    dragging: false,
    currentNumber: 0,
}

class TestPage extends Component<Props, State> {
    resultRef = createRef<HTMLDivElement>()
    barRef = createRef<HTMLDivElement>()
    endPointRef = createRef<HTMLDivElement>()

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
        // @ts-ignore
        setInterval(() => {
            this.resultRef.current!.textContent = this.state.currentNumber + ""
        }, 1000)


    }

    dragStart = (e :React.MouseEvent) => {
        console.log("start")
        this.dragging = true
        this.drag(e)
    }

    dragFinish = (e :React.MouseEvent) => {
        console.log("finish")
        this.dragging = false
    }

    drag = (e: React.MouseEvent) => {
        //e.preventDefault()
        //console.log("x")
        if(this.dragging && e.pageY) {
            const pageY = e.pageY
            //console.log(pageY)
            //console.log(clientY)
            if(pageY >= 0 && pageY <= 200) {
                this.setState({
                    currentNumber: pageY
                }, () => {
                    //console.log(this.state.currentNumber)
                    this.barRef.current!.style.height = (200 - this.state.currentNumber) + "px"
                    this.endPointRef.current!.style.bottom = (200 - this.state.currentNumber - 21) + "px"
                })
            }
        }
    }

    render() {
        return (
            <div className="test" onMouseUp={this.dragFinish} onMouseLeave={this.dragFinish}>
                <div className="test_graph" draggable={false} onMouseDown={this.dragStart} onMouseMove={this.drag} >
                    <div className="test_graph_bar" draggable={false} ref={this.barRef}/>
                    <div className="test_graph_endPoint" draggable={false} ref={this.endPointRef}/>
                </div>
                <div className="test_graph_text" ref={this.resultRef}>asdf</div>
            </div>
        );
    }
}

export default TestPage;