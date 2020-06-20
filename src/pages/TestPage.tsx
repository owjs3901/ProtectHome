//로그인 페이지
import React, {Component, createRef} from 'react';
import './TestPage.scss'

interface Props {

}

interface State {

}

const DEFAULT_VALUE = {

}

class TestPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

    }

    componentDidMount() {

    }

    onClick = () => {
        let x = [1,2,3]
        // y.push(4)
        console.log(x.join(", "))
    }

    render() {
        return (
            <>
                <button onClick={this.onClick}>asdf</button>
            </>
        );
    }
}

export default TestPage;