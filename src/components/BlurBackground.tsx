import React, {Component, CSSProperties} from 'react';
import './BlurBackground.css'

interface Props {
    content: JSX.Element
    noShadow: boolean
}

interface State {

}

// 뒤에 파랗게 빛 내주는 컴포넌트.
class BlurBackground extends Component<Props, State> {



    render() {
        let shadow: CSSProperties
        if(this.props.noShadow) {
            shadow = {
                boxShadow: "0px 0px 0px transparent",
            }
        } else {
            shadow = {

            }
        }

        return (
            <div className="blur">
                <div className="blurBackground_blur blur"/>
                <div className="blurBackground_background blur" style={shadow}>
                    {this.props.content}
                </div>
            </div>
        )
    }
}
export default BlurBackground;