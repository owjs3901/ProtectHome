import React, {Component, createRef} from 'react';
import './CircleGraph.css'

interface Props {
    title: string;
    unit: string;
    value: number;
    maxValue: number;
}

interface State {

}

class CircleGraph extends Component<Props, State> {
    canvasRef = createRef<HTMLCanvasElement>()
    canvasRefMobile = createRef<HTMLCanvasElement>()

    // '그' 호 그려주는 코드.
    drawArc(element: HTMLCanvasElement, x: number, y: number, radiusCenter: number, radiusOuter: number, percent: number) {
        if(element) {
            const context = element.getContext('2d')
            //box-shadow: 0px 3px 6px #496EA04D;
            if (context) {
                const angle = percent / 100 * 360
                const angleRadian = (angle - 90) / 180 * Math.PI

                context.beginPath()
                context.save()
                context.strokeStyle = "#F0F0F0"
                // context.shadowOffsetX = 0
                // context.shadowOffsetY = 3
                // context.shadowBlur = 6
                // context.shadowColor = "#496EA04D"
                context.arc(x, y, radiusCenter - radiusOuter, 0, 2 * Math.PI)
                context.stroke()
                context.closePath()

                context.beginPath()
                context.arc(x, y, radiusCenter + radiusOuter, 0, 2 * Math.PI)
                context.stroke()
                context.restore()
                context.closePath()

                context.beginPath()
                context.save()
                context.shadowOffsetX = 0
                context.shadowOffsetY = 3
                context.shadowBlur = 6
                context.shadowColor = "#496EA04D"
                context.fillStyle = "#73A2FC"
                context.arc(x, y - radiusCenter, radiusOuter, 0.5 * Math.PI, 1.5 * Math.PI)
                context.arc(x, y, radiusCenter + radiusOuter, 1.5 * Math.PI, 1.5 * Math.PI + angle / 180 * Math.PI)
                context.arc(x + radiusCenter * Math.cos(angleRadian), y + radiusCenter * Math.sin(angleRadian), radiusOuter, angleRadian, angleRadian + Math.PI)
                context.arc(x, y, radiusCenter - radiusOuter, 1.5 * Math.PI + angle / 180 * Math.PI, 1.5 * Math.PI, true)
                context.fill()
                context.restore()
                context.closePath()
            } else {
                console.log("context is null")
            }
        }
    }

    // 컴포넌트 마운트가 끝나면 캔버스에 '그' 호를 모바일,PC 둘 다 그려준다.
    componentDidMount() {
        this.drawArc(this.canvasRef.current!, 128, 128, 75, 22, this.props.value / this.props.maxValue * 100)
        this.drawArc(this.canvasRefMobile.current!, 70, 70, 39, 11, this.props.value / this.props.maxValue * 100)
    }

    // 온도, 습도같은 원 그래프를 보여주는 컴포넌트.
    render() {
        return (
          <>
              <div className="circleGraph_canvasBase">
                  <div className="circleGraph_textContainer">
                      <div className="circleGraph_textContainer_title">{this.props.title}</div>
                      <div className="circleGraph_textContainer_value">{this.props.value}{this.props.unit}</div>
                  </div>
                  <canvas ref={this.canvasRef} className="circleGraph_canvas_pc" width={256} height={256}/>
                  <canvas ref={this.canvasRefMobile} className="circleGraph_canvas_mobile" width={140} height={140}/>
              </div>
          </>
        );
    }
}

export default CircleGraph;