import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

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
            <Container show={show}>
                <Center>
                    <DotOne />
                    <DotTwo />
                    <DotThree />
                </Center>
            </Container>
        );
    }
}

// keyframes
const keyframesList = [...Array(3)].map(i => keyframes`
    75% { transform: scale(0) }
`);

const Container = styled.div`
    background-color: rgba(1, 1, 1, 0);
    height: 0;
    width: 100%;
    display: block;
    position: absolute;
    z-index: 1;
    transition: all .2s ease-in-out;
    overflow: hidden;

    ${p => p.show && `
        transition: all .1s ease-in-out;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.35);
    `}
`;

const Center = styled.div`
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translate(-50%, 0%);
    display: inline;
    text-align: center;
`;

const Dot = styled.div`
    width: 13px;
    height: 13px;
    background-color: #333;
    float: left;
    margin-right: 20px;
    border-radius: 50% 50% 50% 50%;
    box-shadow: 1px 2px 3px #ddd;

    &:last-child {
        margin-right: 0;
    }
`;

const DotOne = Dot.extend`
    background-color: #3bf;
    animation: ${keyframesList[0]} 1.5s infinite;
`;

const DotTwo = Dot.extend`
    background-color: #f43;
    animation: ${keyframesList[1]} 1.5s infinite;
    animation-delay: .25s;
`;

const DotThree = Dot.extend`
    background-color: #3bf;
    animation: ${keyframesList[2]} 1.5s infinite;
    animation-delay: .5s;
`;
