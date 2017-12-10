import React, { Component } from 'react';
import styled from 'styled-components';
import Color from 'color';

export default class Tool extends Component {

    static defaultProps = {
        back: false,
        edit: true,
        user: true,
        history: {}
    }

    constructor(props) {
        super(props);

        this.state = {
            user: {},
        }
    }

    componentWillMount() {
        if (window._login) {
            this.setState({ user: window._user });
        }
    }

    renderBack = (history) => (
        <BackButton onClick={e => history.length <= 2 ? history.replace('/') : history.goBack()}>
            <Icon type="chevron-left" />
        </BackButton>
    )

    renderUser = (history, user) => (
        <Button onClick={e => history.push(`/user/${this.state.user.loginname}`)}>
            {user.id ?
                <Avatar src={user.avatar_url} /> :
                <Icon type="circle-o-notch" />
            }
        </Button>
    )

    renderEdit = (onEdit) => (
        <Button onClick={onEdit}>
            <Icon type="pencil" />
        </Button>
    )

    onTop = e => {
        document.documentElement.scrollTop =
            document.body.scrollTop = 0
    }

    render() {
        const { back, edit, user, history, onEdit } = this.props;
        const { user: _user } = this.state;

        return (
            <Container>
                {back && this.renderBack(history)}
                <Panel>
                    {user && this.renderUser(history, _user)}
                    {edit && this.renderEdit(onEdit)}

                    <Button
                        onClick={this.onTop}
                        onTouchEnd={this.onTop}
                        >
                        <Icon type="chevron-up" className="top" />
                    </Button>
                </Panel>
            </Container>
        );
    }
}

const Container = styled.div`
    position: fixed;
    right: 30px;
    top: calc(100% - 240px);
    background-color: transparent;
    z-index: 99;

    ${p => p.theme.media`
        right: 12px;
        top: calc(100% - 190px);
    `}
`;

const Panel = styled.div`
    height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

const Avatar = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 100%;
    &:hover { opacity: .9 }
`;

const Button = styled.button`
    position: relative;
    display: block;
    border-radius: 100%;
    width: 45px;
    height: 45px;
    text-align: center;
    padding: 1px;
    transition: all .3s ease;
    box-shadow: 0 2px 3px rgba(1, 1, 1, 0.2);
    margin: 5px 0;
    background-color: ${p => p.theme.color};

    i {
        font-size: 21px;
        color: #fff;
    }

    &:hover {
        background-color: ${p => Color(p.theme.color).darken(0.1).toString()};
    }

    .top {
        position: relative;
        top: -1px;
    }
`;

const BackButton = Button.extend`
    position: fixed;
    left: 20px;
    top: 10px;
    margin: 10px 0;
    box-shadow: 0 2px 3px #ddd;

    ${p => p.theme.media(`
        display: none;
    `, 720)}

    i {
        position: relative;
        left: -1px;
        top: 1px;
    }
`;

const Icon = styled.i.attrs({
    className: p => `fa fa-${p.type}`,
}) ``;
