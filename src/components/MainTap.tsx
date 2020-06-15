import React, {Component} from 'react';
import './MainTap.scss'

interface Props {
    selected: boolean,
    type: String,
    onChanged: (type: String, clicked: boolean) => void
    content: JSX.Element
}

interface State {
}

class MainTap extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        console.log(this.props.type + ", " + this.props.selected)
    }

    // onUnClicked() {
    //     this.props.onChanged(this.props.type, false)
    //     this.setState( {
    //         selected: false
    //     })
    // }

    onClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.onChanged(this.props.type, true)
    }

    render() {
        if(this.props.selected) {
            return (<button className="mainTap_pc_tap_element_selected"  onClick={this.onClicked}>
                <div>
                    {this.props.content}
                    <div style={{marginTop: "7px", marginLeft: "24px", marginRight: "24px", border: "2.5px solid #73A2FC", borderRadius: "5px"}}/>
                </div>
            </button>);
        } else {
            return (
                <div>
                    <div style={{height: "10px"}}/>
                    <button className="mainTap_pc_tap_element" onClick={this.onClicked}>
                        {this.props.content}</button>
                </div>
                );
        }
    }
}

export default MainTap