import React, { Component } from 'react';


export default class Loading extends Component {

    constructor(props) {
        super(props);

        this.state = {
            show: this.props.initValue || false,
        }
    }

    show = () => {
        this.setState({ show: true });
    }

    hide = () => {
        this.setState({ show: false });
    }

    render() {
        const { show } = this.state;
        return (
            <div className={`loading ${show && 'show'}`}>
                <div className='center'>
                    <div className="object" id="object_one"></div>
                    <div className="object" id="object_two"></div>
                    <div className="object" id="object_three"></div>
                </div>
            </div>
        );
    }
}
