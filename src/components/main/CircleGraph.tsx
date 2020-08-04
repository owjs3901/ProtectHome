import React, {Component, createRef} from 'react';
import './CircleGraph.css'

interface Props {
    title: string;
    unit: string;
    value: number;
    maxValue: number;
}

interface State {
    lastValue: number;
}

class CircleGraph extends Component<Props, State> {
    canvasRef = createRef<HTMLCanvasElement>()
    canvasRefMobile = createRef<HTMLCanvasElement>()

    // '그' 호 그려주는 코드.
    drawArc(element: HTMLCanvasElement, x: number, y: number, radiusCenter: number, radiusOuter: number, percent: number) {
        if(element) {
            const buffer = document.createElement('canvas')
            const bufferContext = buffer.getContext('2d')
            buffer.width = element.width;
            buffer.height = element.height;
            //box-shadow: 0px 3px 6px #496EA04D;
            if (bufferContext) {
                bufferContext.save()
                bufferContext.fillStyle = "#FFFFFF"
                bufferContext.fillRect(0, 0, buffer.width, buffer.height)
                bufferContext.restore()

                //bufferContext.fill()
                const angle = percent / 100 * 360
                const angleRadian = (angle - 90) / 180 * Math.PI

                bufferContext.beginPath()
                bufferContext.save()
                bufferContext.strokeStyle = "#F0F0F0"
                // context.shadowOffsetX = 0
                // context.shadowOffsetY = 3
                // context.shadowBlur = 6
                // context.shadowColor = "#496EA04D"
                bufferContext.arc(x, y, radiusCenter - radiusOuter, 0, 2 * Math.PI)
                bufferContext.stroke()
                bufferContext.closePath()

                bufferContext.beginPath()
                bufferContext.arc(x, y, radiusCenter + radiusOuter, 0, 2 * Math.PI)
                bufferContext.stroke()
                bufferContext.restore()
                bufferContext.closePath()

                bufferContext.beginPath()
                bufferContext.save()
                bufferContext.shadowOffsetX = 0
                bufferContext.shadowOffsetY = 3
                bufferContext.shadowBlur = 6
                bufferContext.shadowColor = "#496EA04D"
                bufferContext.fillStyle = "#73A2FC"
                bufferContext.arc(x, y - radiusCenter, radiusOuter, 0.5 * Math.PI, 1.5 * Math.PI)
                bufferContext.arc(x, y, radiusCenter + radiusOuter, 1.5 * Math.PI, 1.5 * Math.PI + angle / 180 * Math.PI)
                bufferContext.arc(x + radiusCenter * Math.cos(angleRadian), y + radiusCenter * Math.sin(angleRadian), radiusOuter, angleRadian, angleRadian + Math.PI)
                bufferContext.arc(x, y, radiusCenter - radiusOuter, 1.5 * Math.PI + angle / 180 * Math.PI, 1.5 * Math.PI, true)
                bufferContext.fill()
                bufferContext.restore()
                bufferContext.closePath()

                const context = element.getContext('2d')
                if(context) {
                    context.drawImage(buffer, 0, 0)
                } else {
                    console.log("context is null")
                }
            } else {
                console.log("buffer context is null")
            }
        }
    }

    // 컴포넌트 마운트가 끝나면 캔버스에 '그' 호를 모바일,PC 둘 다 그려준다.
    componentDidMount() {
        console.log("circlegraph " + this.props.title + " loaded")
        this.drawArc(this.canvasRef.current!, 128, 128, 75, 22, this.props.value / this.props.maxValue * 100)
        this.drawArc(this.canvasRefMobile.current!, 70, 70, 39, 11, this.props.value / this.props.maxValue * 100)
    }

    // 온도, 습도같은 원 그래프를 보여주는 컴포넌트.
    render() {
        console.log("circlegraph " + this.props.title + " updated")
        this.drawArc(this.canvasRef.current!, 128, 128, 75, 22, Math.min(this.props.value / this.props.maxValue * 100, 100))
        this.drawArc(this.canvasRefMobile.current!, 70, 70, 39, 11, Math.max(this.props.value / this.props.maxValue * 100))

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
