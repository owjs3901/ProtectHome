//로그인 페이지
import React, {Component, createRef} from 'react';
import './TestPage.scss'

interface Props {

}

interface State {

}

class TestPage extends Component<Props, State> {
    temperatureCanvasRef = createRef<HTMLCanvasElement>()

    componentDidMount() {
        // @ts-ignore
        const context = this.temperatureCanvasRef.current.getContext('2d')
        if(context) {
            const angle = 200

            context.beginPath()
            context.lineWidth = 20
            context.arc(100, 100, 50, 1.5 * Math.PI, 1.5 * Math.PI + 2 * angle / 360 * Math.PI)
            context.stroke()
        }
    }

    render() {
        return (
            <div>
                <canvas ref={this.temperatureCanvasRef} width={200} height={200}/>
            </div>
        );
    }
}

export default TestPage;