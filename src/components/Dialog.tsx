import React, {Component} from 'react'
import './Dialog.css'

interface Props {
    question: string
    onAnswerSelected: (accepted: boolean) => void;
}

interface State {

}

class Dialog extends Component<Props, State> {
    render() {
        return (
            <div className="dialog_container">
                <div className="dialog_question">{this.props.question}</div>
                <div className="dialog_button_answer">
                    <button className="dialog_button_no" onClick={e=>this.props.onAnswerSelected(false)}>아니오</button>
                    <button className="dialog_button_yes" onClick={e=>this.props.onAnswerSelected(true)}>네</button>
                </div>
            </div>
        );
    }
}

export default Dialog;
