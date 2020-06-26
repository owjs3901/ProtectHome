//로그인 페이지
import React, {Component, createRef} from 'react';
import './TestPage.scss'

interface Props {

}

interface State {

}

const DEFAULT_VALUE = {

}

// 존나 의미없는 본인의 테스트 화면. ^^;;
class TestPage extends Component<Props, State> {
    resultRef = createRef<HTMLDivElement>()
    barRef = createRef<HTMLDivElement>()
    endPointRef = createRef<HTMLDivElement>()
    containerRef = createRef<HTMLDivElement>()

    constructor(props: Props) {
        super(props);

    }

    componentDidMount() {

    }

    drag = (e: React.MouseEvent) => {
        if(e.pageY) {
            const relativeHeight = e.pageY - getOffset(this.containerRef.current!).top

            console.log(e.pageY)
            console.log(relativeHeight)
        }
    }

    render() {
        return (
            <div className="a">
                <div style={{height: "100px"}}/>
                <div className="container" ref={this.containerRef} onMouseDown={this.drag}>
                    <div className="graph_container">
                        <div className="graph_bar" ref={this.barRef}/>
                        <div className="graph_endPoint" ref={this.endPointRef} />
                    </div>
                    <div className="graph_text" ref={this.resultRef}>{"ㅁㄴㅇㄹ"}</div>
                </div>
            </div>
        );
    }
}

export default TestPage;

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