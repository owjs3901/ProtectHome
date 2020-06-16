import React, {Component} from 'react';
import './BlurBackground.css'

interface Props {
    width: number;
    height: number;
    content: JSX.Element
}

interface State {

}

class BlurBackground extends Component<Props, State> {
    render() {
        return (
            <div style={{width: this.props.width + "px", height: this.props.height + "px"}}>
                <div className="blurBackground_blur" style={{width: this.props.width + "px", height: this.props.height + "px"}}/>
                <div className="blurBackground_background" style={{width: this.props.width + "px", height: this.props.height + "px"}}>
                    {this.props.content}
                </div>
            </div>
        )
    }
}
export default BlurBackground;