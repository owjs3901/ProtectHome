import React, {Component, createRef} from 'react';
import './CircleGraph.css'

interface Props {
    width: number;
    height: number;
    title: string;
    unit: string;
    value: number;
    maxValue: number;
    radiusCenter: number;
    radiusOuter: number;
    fontTitle: string;
    fontValue: string;
}

interface State {

}

class CircleGraph extends Component<Props, State> {
    canvasRef = createRef<HTMLCanvasElement>()

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

    componentDidMount() {
        this.drawArc(this.canvasRef.current!, this.props.width / 2, this.props.height / 2, this.props.radiusCenter, this.props.radiusOuter, this.props.value / this.props.maxValue * 100)
    }

    render() {
        return (
          <>
              <div className="circleGraph_canvasBase" style={{width: this.props.width + "px", height: this.props.height + "px"}}>
                  <div className="circleGraph_textContainer">
                      <div className="circleGraph_textContainer_title" style={{font: this.props.fontTitle}}>{this.props.title}</div>
                      <div className="circleGraph_textContainer_value" style={{font: this.props.fontValue}}>{this.props.value}{this.props.unit}</div>
                  </div>
                  <canvas ref={this.canvasRef} className="circleGraph_canvas" width={this.props.width} height={this.props.height}/>
              </div>
          </>
        );
    }
}

export default CircleGraph;