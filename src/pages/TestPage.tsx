//로그인 페이지
import React, {Component, createRef} from 'react';
import './TestPage.scss'
import RoomSwitch from "../components/main/RoomSwitch";

interface Props {

}

interface State {

}

const DEFAULT_VALUE = {

}

// 존나 의미없는 본인의 테스트 화면. ^^;;
class TestPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

    }

    handleEvent = (title: string, isOn: boolean) => {
        console.log(title + ", " + isOn)
    }

    componentDidMount() {

    }

    render() {
        return (
            <>
                <RoomSwitch title={"test"} handleOnStateChanged={this.handleEvent}/>
                asdf
            </>
        );
    }
}

export default TestPage;