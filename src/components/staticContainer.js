import React, { Component } from 'react';

export default class StaticComponent extends Component {

    ok = false;

    shouldComponentUpdate(nextProps, nextState) {
        return !this.ok;
    }

    componentDidMount() {
        this.ok = true;
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }

}