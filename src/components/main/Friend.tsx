import React, {Component, createRef} from 'react';
import './Friend.scss'
import notSelected from '../../assets/images/img_notselected.svg'
import selected from '../../assets/images/img_selected.svg'


interface Props {
    img: string;
    name: string;
    lastJoined: string;
    onDeleteButtonClicked: (name: string, checked: boolean) => void;
}

interface State {
    clicked: boolean
}

const DEFAULT_VALUES = {
    clicked: false
}

class Friend extends Component<Props, State> {
    imgRef = createRef<HTMLImageElement>()

    constructor(props: Props) {
        super(props);

        this.state = {
            ...DEFAULT_VALUES,
        }
    }


    componentDidMount() {

    }

    handleToggleClick = () => {
        this.setState({
            clicked: !this.state.clicked
        }, () => {
            this.imgRef.current!.src = this.state.clicked ? selected : notSelected
            this.props.onDeleteButtonClicked(this.props.name, this.state.clicked)
        })
    }

    render() {
        return (<div className="friend_container">
            <img className="friend_profileImg" src={this.props.img} width={"64px"} height={"64px"}/>
            <span className="friend_name">{this.props.name}</span>
            <span className="friend_lastJoined">{this.props.lastJoined}</span>
            <button className="friend_deleteButton" onClick={this.handleToggleClick}><img ref={this.imgRef} src={notSelected} style={{width: "44px", height: "44px"}}/></button>
        </div>);
    }
}

export default Friend;