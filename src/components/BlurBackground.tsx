import React, {Component, CSSProperties} from 'react';
import './BlurBackground.css'

interface Props {
    width: number;
    height: number;
    content: JSX.Element
    noShadow: boolean
}

interface State {

}

class BlurBackground extends Component<Props, State> {



    render() {
        let shadow: CSSProperties
        if(this.props.noShadow) {
            shadow = {
                boxShadow: "0px 0px 0px transparent",
                width: this.props.width + "px",
                height: this.props.height + "px"
            }
        } else {
            shadow = {
                width: this.props.width + "px",
                height: this.props.height + "px"
            }
        }

        return (
            <div style={{width: this.props.width + "px", height: this.props.height + "px"}}>
                <div className="blurBackground_blur" style={{width: this.props.width + "px", height: this.props.height + "px"}}/>
                <div className="blurBackground_background" style={shadow}>
                    {this.props.content}
                </div>
            </div>
        )
    }
}
export default BlurBackground;